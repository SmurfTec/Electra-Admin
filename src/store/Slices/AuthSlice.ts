import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import url from "../../config/index";

type LoginData = {
  email: string;
  password: string;
};
type LoginResponse = {
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;

};
export const Login = createAsyncThunk<
  LoginResponse,
  LoginData,
  { rejectValue: any }
>("auth/login", async (data: LoginData) => {
  try {
    let response = await url.post("/login", { data });
    console.log(response,"RESPONSE")
    return response.data;
  } catch (e) {
    return e;
  }
});

const initialState: any = {
  auth: false,
  name: "",
  email: "",
  accessToken: "",
  refreshToken: "",
  status:"idle"
};

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
        state.auth = true;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.status = "Success";
      });
  },
});
export default authSlice.reducer;
