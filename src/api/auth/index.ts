import { AxiosResponse } from "axios";
import apiAxios from "../axios";
import { AuthResponse, LoginInput, RegistrationInput } from "../../types";

export const login = ({
  email,
  password
}: LoginInput): Promise<AxiosResponse<AuthResponse>>  => {
  return apiAxios.post<AuthResponse>('/login', { email, password });
}

export const registration = ({
  email,
  password,
  userName,
}: RegistrationInput): Promise<AxiosResponse<AuthResponse>> => {
  return apiAxios.post<AuthResponse>('/registration', { email, password, userName });
}

export const logout = (): Promise<void> => {
  return apiAxios.post('/logout');
}