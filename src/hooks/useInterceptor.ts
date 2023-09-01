import { useMemo } from "react";
import { useAppDispatch } from "./redux-hooks";
import { apiAxios } from "../api/axios";
import { refreshToken } from "../api";
import { localStorageService } from "../services";
import { AxiosError } from "axios";
import { logoutLocalThunk } from "../store/auth/auth-thunks";


export const useInterceptor = () => {
  const dispatch = useAppDispatch();

  useMemo(() => {
    apiAxios.interceptors.response.use(
      (config) => {
        return config;
      },
      async (error) => {
        const originalConfig = error.config;

        if (error.response) {
          if (error.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
    
            try {
              const result = await refreshToken();
              localStorageService.set('refreshToken', { refreshToken:  result.refreshToken });
              localStorageService.set('token', { token: result.accessToken });
    
              return apiAxios(originalConfig);
            } catch (_error) {
              const axiosError = _error as AxiosError;

              if (axiosError.response && axiosError.response.data) {
                dispatch(logoutLocalThunk())

                return Promise.reject(axiosError.response.data);
              }
    
              return Promise.reject(axiosError);
            }
          }

          if (error.response.status === 403 && error.response.data) {
            return Promise.reject(error.response.data);
          }
        }

        return Promise.reject(error);
      }
    );
  }, [dispatch])
}