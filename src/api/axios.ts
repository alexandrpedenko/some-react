import axios, { InternalAxiosRequestConfig } from 'axios';

export const API_URL = 'http://localhost:3000/api';

const apiAxios = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

apiAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

    return config;
  }
);

// NOTE: Intercept response
// apiAxios.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response;
//   }
// );

export default apiAxios;