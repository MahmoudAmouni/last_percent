export enum MatchStatus {
  Waiting = 'waiting',
  Matched = 'matched',
  Ended = 'ended',
}

export enum SessionStatus {
  Active = 'active',
  Ended = 'ended',
}

export interface User {
  id: string;
  email: string;
  isEmailVerified: boolean;
}

export interface Message {
  id: number;
  matchId: number;
  senderId: number;
  content: string;
  sentAt: string;
}

export interface Session {
  id: number;
  userId: number;
  status: SessionStatus;
  startingBatteryLevel: number;
  startedAt: string;
}
