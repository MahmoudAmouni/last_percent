const API_URL = 'http://localhost:5249';
// When using ngrok, replace the URL above with your ngrok URL:
// const API_URL = 'https://your-ngrok-id.ngrok-free.app';

const isNgrok = API_URL.includes('ngrok');

export const Config = {
  API_URL,
  BASE_URL: `${API_URL}/api`,
  WS_URL: `${API_URL.replace('http', 'ws')}/ws`,
};
