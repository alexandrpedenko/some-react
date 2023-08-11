import { createSlice } from '@reduxjs/toolkit'
import { UserFromAuth } from '../../types';
import { signInThunk } from './thunks';


export interface AuthState {
  isLoading: boolean;
  isAuth: boolean;
  user: UserFromAuth;
}

const initialState: AuthState = {
  isLoading: false,
  isAuth: false,
  user: {} as UserFromAuth,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    testLogin: (state) => {
      console.log('HERE')
      state.isAuth = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInThunk.fulfilled, (state, { payload }) => {
      console.log("Reducer Success", payload);
    });
  
    builder.addCase(signInThunk.rejected, (state, action) => {
      console.log("Reducer Error", action);
    });
  
  }
})

export const { testLogin } = authSlice.actions
export default authSlice.reducer;
