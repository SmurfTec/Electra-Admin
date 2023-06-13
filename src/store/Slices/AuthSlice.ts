import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import url from "../../config/index";
type LoginData = {
  email: string;
  password: string;
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
>("auth/login", async (data: LoginData) => {
  try {
    let response: any = await url.post("/auth/login", data);
    console.log(response.data.user, "RESPONSE");
    localStorage.setItem(
      "token",
      JSON.stringify(response.data.user)
    );
    // setAuthToken(response.data.accessTokenCookie);
    return response.data;
  } catch (e) {
    return e;
  }
});

export const changePassword = createAsyncThunk<
  LoginResponse,
  passwordData,
  { rejectValue: any }
>("auth/changePass", async (data: passwordData) => {
  try {
    let response: any = await url.post("/auth/update-password", data);
    console.log(response, "RESPONSE");
    return response;
  } catch (e) {
    return e;
  }
});
const initialState: any = {
  auth: false,
  email: "",
  accessTokenCookie: "",
  refreshTokenCookie: "",
  status: "idle",
};
export const token = (state:any) => state.auth.accessTokenCookie;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Login.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(Login.rejected, (state, action) => {
      state.token = "";
      state.status = action.error.message;
    }),
      builder.addCase(Login.fulfilled, (state, action) => {
        const { accessTokenCookie, refreshTokenCookie } = action.payload;
        const email = action.payload.user.email;
        state.auth = true;
        state.email = email;
        state.accessTokenCookie = accessTokenCookie;
        state.refreshTokenCookie = refreshTokenCookie;
        state.status = "Success";
      });
      builder.addCase(changePassword.pending, (state) => {
        state.status = "loading";
      });
  
      builder.addCase(changePassword.rejected, (state, action) => {
        state.token = "";
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
