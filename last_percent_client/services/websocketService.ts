import { Config } from '@/constants/Config';

type EventType = 'MatchFound' | 'MessageReceived' | 'PartnerLeft' | 'MessagesRead';
type EventPayload = Record<string, unknown>;
type EventHandler = (payload: EventPayload) => void;

class WebSocketService {
  private socket: WebSocket | null = null;
  private token: string | null = null;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 8;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private isManualClose = false;
  private listeners = new Map<EventType, Set<EventHandler>>();

  connect(token: string): void {
    this.token = token;
    this.isManualClose = false;
    this.reconnectAttempts = 0;
    this.openSocket();
  }

  disconnect(): void {
    this.isManualClose = true;
    this.clearReconnectTimer();
    if (this.socket) {
      this.socket.close(1000, 'Manual disconnect');
      this.socket = null;
    }
  }

  on(event: EventType, handler: EventHandler): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler);
  }

  off(event: EventType, handler: EventHandler): void {
    this.listeners.get(event)?.delete(handler);
  }

  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }

  private openSocket(): void {
    if (!this.token) return;

    const url = `${Config.WS_URL}?access_token=${this.token}`;
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      this.reconnectAttempts = 0;
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data as string) as EventPayload & { type: EventType };
        const { type, ...payload } = data;
        this.emit(type, payload);
      } catch {
      }
    };

    this.socket.onclose = (event) => {
      if (!this.isManualClose && event.code !== 1000) {
        this.scheduleReconnect();
      }
    };

    this.socket.onerror = () => {
      this.socket?.close();
    };
  }

  private emit(event: EventType, payload: EventPayload): void {
    this.listeners.get(event)?.forEach((handler) => handler(payload));
  }

  private scheduleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) return;

    const delay = Math.min(1000 * 2 ** this.reconnectAttempts, 30000);
    this.reconnectAttempts++;

    this.reconnectTimer = setTimeout(() => {
      this.openSocket();
    }, delay);
  }

  private clearReconnectTimer(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }
}

export const websocketService = new WebSocketService();
