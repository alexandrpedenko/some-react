export interface UserFromAuth {
  _id: string;
  username: string;
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
  username: string;
}

export interface RefreshTokenResponse {
  accessToken: string,
  refreshToken: string;
}
