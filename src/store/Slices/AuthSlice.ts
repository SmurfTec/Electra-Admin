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

// export const AutheticateUser = createAsyncThunk(
//   'auth/getMe',
//   async (_, { rejectWithValue }) => {
//     console.log('authenticateuser');

//     const token = localStorage.getItem('token');
//     if (!token) return { status: false };
//     await url
//       .get('/users/me', {
//         headers: {
//           authentication: token,
//         },
//       })
//       .then(() => ({ status: true }))
//       .catch(er => rejectWithValue(er ? er.message : 'Something went wrong'));
//   }
// );
export const AutheticateUser = createAsyncThunk(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    console.log('authenticateuser');
    try {
      const token = localStorage.getItem('token');
      if (!token) return rejectWithValue(new Error('Invalid Token'));
      const response: any = await url.get('/users/me', {
        headers: {
          authentication: JSON.parse(token),
        },
      });
      console.log('response', response);
      return { status: true };
    } catch (er) {
      console.log('er', er);
      return rejectWithValue(er);
    }
  }
);

export const changePassword = createAsyncThunk<
  any,
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
  isAuthenticating: true,
  isLoggedIn: false,
};
export const token = (state: any) => state.auth.email;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: false,
    email: '',
    status: 'idle',
    isAuthenticating: true,
    isLoggedIn: false,
  },
  reducers: {
    logoutUser: state => {
      state.isLoggedIn = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(Login.pending, state => {
      state.status = 'loading';
    });

    builder.addCase(Login.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.status = action.error.message || 'Something went wrong';
    }),
      builder.addCase(Login.fulfilled, (state, action) => {
        // const email = action.payload.user.email;
        // state.auth = true;
        // state.email = email;
        state.status = 'Success';
        state.isLoggedIn = true;
      });

    builder
      .addCase(AutheticateUser.pending, state => {
        state.isAuthenticating = true;
      })
      .addCase(AutheticateUser.fulfilled, (state, { payload }: any) => {
        console.log('fulfilled');
        state.isAuthenticating = false;
        state.isLoggedIn = payload.status;
      })
      .addCase(AutheticateUser.rejected, state => {
        console.log('rejected');
        state.isAuthenticating = false;
        state.isLoggedIn = false;
      });

    builder.addCase(changePassword.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.status = action.error.message || 'Something went wrong';
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

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
