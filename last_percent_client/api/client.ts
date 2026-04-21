import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { Config } from '@/constants/Config';

export const apiClient = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 10000,
  headers: {
    'ngrok-skip-browser-warning': 'true',
  },
});

apiClient.interceptors.request.use(async (config) => {
  let token = null;
  if (Platform.OS === 'web') {
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('jwt_token');
    }
  } else {
    token = await SecureStore.getItemAsync('jwt_token');
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
