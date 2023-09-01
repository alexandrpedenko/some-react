import axios, { InternalAxiosRequestConfig } from 'axios';
import { localStorageService } from '../services';

export const API_URL = '/api';

const apiAxios = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

apiAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const data = localStorageService.get<{token: string}>('token')
    if (data) {
      config.headers.Authorization = `Bearer ${data.token}`;
    }

    return config;
  }
);

// NOTE: Axios instance for refresh request
const apiAxiosRefresh = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

apiAxiosRefresh.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const data = localStorageService.get<{refreshToken: string}>('refreshToken')
    config.headers.Authorization = `Bearer ${data.refreshToken}`;

    return config;
  }
);

export {
  apiAxios,
  apiAxiosRefresh
};