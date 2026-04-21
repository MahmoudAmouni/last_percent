import { Platform } from 'react-native';

// const NGROK_URL = 'https://bidenticulate-unreproductive-georgette.ngrok-free.dev';
const LOCAL_API_URL = 'http://localhost:5249';

const API_URL = LOCAL_API_URL;

export const Config = {
  API_URL,
  BASE_URL: `${API_URL}/api`,
  WS_URL: `${API_URL.replace('http', 'ws').replace('https', 'wss')}/ws`,
};
