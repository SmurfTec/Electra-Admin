import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import url, { setAuthToken } from '../../config/index';

type LoginData = {
  email: string;
  password: string;
  is_social_login?: boolean;
};
type passwordData = {
  email: string;
  password: string;
};
type LoginResponse = {
  user: {
    email: string;
  };
  accessTokenCookie: string;
  refreshTokenCookie: string;
};
export const Login = createAsyncThunk<
  LoginResponse,
  LoginData,
  { rejectValue: any }
>('auth/login', async (data: LoginData) => {
  try {
    data.is_social_login = false;
    const response: any = await url.post('/auth/login', data);
    const accesstoken = response.data.authentication;
    const refreshtoken = response.data.refresh;
    localStorage.setItem('token', JSON.stringify(accesstoken));
    localStorage.setItem('refresh', JSON.stringify(refreshtoken));
    // localStorage.setItem("x-refresh-token", JSON.stringify(response.data.refreshTokenCookie));
    setAuthToken(accesstoken, refreshtoken);
    return response.data;
  } catch (e) {
    return e;
  }
});

export const changePassword = createAsyncThunk<
  LoginResponse,
  passwordData,
  { rejectValue: any }
>('auth/changePass', async (data: passwordData) => {
  try {
    const response: any = await url.post('/auth/update-password', data);
    return response;
  } catch (e) {
    return e;
  }
});
const initialState: any = {
  auth: false,
  email: '',
  status: 'idle',
};
export const token = (state: any) => state.auth.email;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(Login.pending, state => {
      state.status = 'loading';
    });

    builder.addCase(Login.rejected, (state, action) => {
      state.token = '';
      state.status = action.error.message;
    }),
      builder.addCase(Login.fulfilled, (state, action) => {
        // const email = action.payload.user.email;
        // state.auth = true;
        // state.email = email;
        state.status = 'Success';
      });
    builder.addCase(changePassword.pending, state => {
      state.status = 'loading';
    });

    builder.addCase(changePassword.rejected, (state, action) => {
      state.token = '';
      state.status = action.error.message;
    }),
      builder.addCase(changePassword.fulfilled, (state, action) => {
        // const { accessTokenCookie, refreshTokenCookie } = action.payload;
        // const email = action.payload.user.email;
        // state.auth = true;
        // state.email = email;
        // state.accessTokenCookie = accessTokenCookie;
        // state.refreshTokenCookie = refreshTokenCookie;
        // state.status = "Success";
      });
  },
});
export default authSlice.reducer;
