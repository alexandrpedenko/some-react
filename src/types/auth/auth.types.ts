export interface UserFromAuth {
  _id: string;
  userName: string;
  email: string;
  refreshToken: string;
}

export interface AuthResponse {
  accessToken: string;
  user: UserFromAuth;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegistrationInput extends LoginInput {
  userName: string;
}

export interface RefreshTokenResponse {
  accessToken: string,
  refreshToken: string;
}
