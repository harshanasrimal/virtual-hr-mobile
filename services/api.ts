import axios from 'axios';
import { getToken } from './tokenManager';

const API = axios.create({
  baseURL: 'https://hr-api.harshanasrimal.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to every request if it exists
API.interceptors.request.use(
    async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

export default API;
