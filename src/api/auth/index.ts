import { apiAxios, apiAxiosRefresh } from "../axios";
import { AuthResponse, LoginInput, RefreshTokenResponse, RegistrationInput, UserFromAuth } from "../../types";

const authPath = 'auth';

export const login = async ({
  email,
  password
}: LoginInput): Promise<AuthResponse>  => {
  const { data } = await apiAxios.post<AuthResponse>(`/${authPath}/login`, { email, password });
  return data;
}

export const signup = async ({
  email,
  password,
  username,
}: RegistrationInput): Promise<AuthResponse> => {
  const { data } = await apiAxios.post<AuthResponse>(`/${authPath}/signup`, { email, password, username });
  return data;
}

export const logout = async (): Promise<boolean> => {
  const { data } = await apiAxios.post<boolean>(`/${authPath}/logout`);
  return data;
}

export const getAuthUser = async (): Promise<UserFromAuth> => {
  const { data } = await apiAxiosRefresh.get<UserFromAuth>(`/${authPath}/user-profile`);
  return data;
}

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const { data } = await apiAxiosRefresh.get<RefreshTokenResponse>(`/${authPath}/refresh`);
  return data;
}
