import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import url from "../../config/index";
const initialState: any = {
  Product: [],
};
export const GetAllProducts = async () => {
  try {
    let response: any = await url.get("/products");
    console.log(response.data.user, "RESPONSE");
    return response.data;
  } catch (e) {
    return e;
  }
};
export const getProductById = async (id:any) => {
  try {
    let response: any = await url.get(`/products/${id}`);
    console.log(response);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const AddProduct = async () => {
  try {
    let response: any = await url.post("/");
  } catch (e) {}
};
const ProductSlice = createSlice({
  name: "products",
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
});
export default ProductSlice.reducer;
