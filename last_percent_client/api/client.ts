import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export const apiClient = axios.create({
  baseURL: 'http://localhost:5249/api',
  timeout: 10000,
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
