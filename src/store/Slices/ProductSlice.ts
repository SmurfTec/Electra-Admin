import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import url from "../../config/index";
const initialState: any = {
    users:[],
    CurrentActiveUser:{}
  };
  export const GetAllProducts = async () => {
  try {
    let response: any = await url.get("/products");
    console.log(response.data.user, "RESPONSE");
    localStorage.setItem("token", JSON.stringify(response.data.user));
    // setAuthToken(response.data.accessTokenCookie);
    return response.data;
  } catch (e) {
    return e;
  }
}

export const getAllUsers=async()=>{
let result=url.get('/users/?sort=id')
console.log(result)
}
const ProductSlice=createSlice({
    name:"products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // builder.addCase(Login.pending, (state) => {
        //   state.status = "loading";
        // });
    
        // builder.addCase(Login.rejected, (state, action) => {
        //   state.token = "";
        //   state.status = action.error.message;
        // }),
        //   builder.addCase(Login.fulfilled, (state, action) => {
        //     const email = action.payload.user.email;
        //     state.auth = true;
        //     state.email = email;
        //     state.status = "Success";
        //   });
      
      },
})
export default  ProductSlice.reducer