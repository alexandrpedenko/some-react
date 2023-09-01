import { createSlice } from '@reduxjs/toolkit'
import { UserFromAuth } from '../../types';
import { hydrateAuthThunk, logoutLocalThunk, logoutThunk, signInThunk } from './auth-thunks';

export interface AuthState {
  isLoading: boolean;
  isAuth: boolean;
  user: UserFromAuth | null;
}

const initialState: AuthState = {
  isLoading: false,
  isAuth: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    logout: (state) => {
      state.isAuth = false;
    },
  },

  extraReducers: (builder) => {
    const logoutReducer = (state: AuthState) => {
      state.isAuth = false;
      state.user = null;
    }

    builder.addCase(signInThunk.fulfilled, (state, { payload }) => {
      state.isAuth = true;
      state.user = payload.user;
    });

    builder.addCase(hydrateAuthThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(hydrateAuthThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(hydrateAuthThunk.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload;
        state.isAuth = true;
        state.isLoading = false;
        return;
      }
      state.isLoading = false;
      state.isAuth = false;
    });

    builder.addCase(logoutThunk.fulfilled, logoutReducer);
    builder.addCase(logoutLocalThunk.fulfilled, logoutReducer);
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
