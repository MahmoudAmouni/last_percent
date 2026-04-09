import { 
  HubConnection, 
  HubConnectionBuilder, 
  LogLevel, 
  HttpTransportType 
} from '@microsoft/signalr';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { useChatStore } from '@/store/chatStore';

const HUB_URL = 'http://localhost:5249/hubs/matchmaking';

class SignalRService {
  private connection: HubConnection | null = null;

  async startConnection() {
    if (this.connection) return;

    this.connection = new HubConnectionBuilder()
      .withUrl(HUB_URL, {
        accessTokenFactory: async () => {
          if (Platform.OS === 'web') {
            return localStorage.getItem('jwt_token') || '';
          }
          return await SecureStore.getItemAsync('jwt_token') || '';
        },
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    this.setupListeners();

    try {
      await this.connection.start();
      console.log('SignalR connected successfully');
    } catch (err) {
      console.error('SignalR connection error: ', err);
    }
  }

  private setupListeners() {
    if (!this.connection) return;

    this.connection.on('MatchFound', (data: { matchId: number }) => {
      console.log('Match Found! Data:', data);
      useChatStore.getState().setMatch(data.matchId, 0); 
    });

    this.connection.on('MessageReceived', (data: any) => {
      useChatStore.getState().addMessage({
        id: data.messageId,
        matchId: data.matchId,
        senderId: data.senderId,
        content: data.content,
        sentAt: data.sentAt
      });
    });

    this.connection.onreconnecting((error) => {
      console.warn('SignalR reconnecting...', error);
    });

    this.connection.onreconnected((connectionId) => {
      console.log('SignalR reconnected. ConnectionId: ', connectionId);
    });

    this.connection.onclose((error) => {
      console.error('SignalR connection closed: ', error);
    });
  }

  async stopConnection() {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
    }
  }

  getConnection() {
    return this.connection;
  }
}

export const signalRService = new SignalRService();
