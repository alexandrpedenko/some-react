import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginInput, RegistrationInput } from "../../types";
import { getAuthUser, login, logout, signup } from "../../api";
import { localStorageService } from "../../services";

export const signUpThunk = createAsyncThunk(
  'auth/singUp',
  async (registrationInput: RegistrationInput) => {
    return await signup(registrationInput);
  }
)

export const signInThunk = createAsyncThunk(
  'auth/login',
  async (loginInput: LoginInput) => {
    const result = await login(loginInput);
    localStorageService.set('refreshToken', { refreshToken:  result.user.refreshToken });
    localStorageService.set('token', { token:  result.accessToken });

    return result;
  }
)

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async () => {
    const result = await logout();
  
    if (result) {
      localStorageService.deleteItem('token');
      localStorageService.deleteItem('refreshToken');
    }

    return result;
  }
)

export const logoutLocalThunk = createAsyncThunk(
  'auth/refresh',
  async () => {
    localStorageService.deleteItem('refreshToken');
    localStorageService.deleteItem('token');
  }
)

// NOTE: SideEffect for checking is user authorized
export const hydrateAuthThunk = createAsyncThunk(
  'auth/hydrate',
  async () => {
    const refreshToken = localStorageService.get<string>('refreshToken');
    
    if (refreshToken) {
      const result = await getAuthUser();
      return result;
    }
    return null;
  }
)
