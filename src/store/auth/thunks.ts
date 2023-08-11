import { createAsyncThunk } from "@reduxjs/toolkit"
import { LoginInput } from "../../types"
import { login } from "../../api"

export const signInThunk = createAsyncThunk(
  'auth/login',
  async (loginInput: LoginInput) => {
    const response = await login(loginInput);

    console.log(response)

    return response;
  }
)
