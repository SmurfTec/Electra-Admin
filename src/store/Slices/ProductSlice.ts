import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import url from "../../config/index";
const initialState: any = {
  Product: [],
};
/**
 * Retrieves all products.
 * @returns {Promise<any>} The response data.
 */
export const GetAllProducts = async (params?: any) => {
  try {
    let urlParams =
      params && params.rowsPerPage
        ? `limit=${params?.rowsPerPage ? params.rowsPerPage : 80}&page=${
            params?.currentPage ? params?.currentPage : 1
          }`
        : "";
    let response: any = await url.get(`/products?sort=-id&${urlParams}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
/**
 * Retrieves a product by its ID.
 * @param {any} id - The ID of the product.
 * @returns {Promise<any>} The response data.
 */

export const deleteProductById = async (id: any) => {
  try {
    let response: any = await url.delete(`/products/${id}`);
    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
};
/**
 * Retrieves a product by its ID.
 * @param {any} id - The ID of the product.
 * @returns {Promise<any>} The response data.
 */
export const getProductById = async (id: any) => {
  try {
    let response: any = await url.get(`/products/${id}`);
    console.log(response);
    return response.data;
  } catch (e) {
    return e;
  }
};
/**
 * Creates a new product.
 * @param {any} data - The data for the new product.
 * @returns {Promise<any>} The response data.
 */
export const CreateProduct = async (data: any) => {
  try {
    let response: any = await url.post("/products", data);
    return response;
  } catch (e) {
    console.log(e);

    return e;
  }
};
/**
 * Edits a  product.
 * @param {any} data - The data for the new product.
 * @returns {Promise<any>} The response data.
 */
export const EditProductAPI = async (data: any, id?: string) => {
  try {
    let response: any = await url.patch(`/products/${id}`, data);
    return response;
  } catch (e) {
    console.log(e);

    return e;
  }
};
/**
 * Retrieves all product requests.
 * @returns {Promise<any>} The response data.
 * @throws {Error} If an error occurs.
 */
export const getAllProductRequest = async (params?: any) => {
  try {
    let urlParams =
      params && params.rowsPerPage
        ? params.status && params.status
          ? `status=${params?.status ?? "pending"}&limit=${params?.rowsPerPage ? params.rowsPerPage : 80}&page=${
              params?.currentPage ? params?.currentPage : 1
            }`
          : `limit=${params?.rowsPerPage ? params.rowsPerPage : 80}&page=${
              params?.currentPage ? params?.currentPage : 1
            }`
        : "";
    let response: any = await url.get(`/productrequests?${urlParams}`);
    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const deleteProductRequestByid = async (id: any) => {
  try {
    let response: any = await url.delete(`/productrequests/${id}`);
    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

/**
 * Retrieves all Best-sellling products requests.
 * @returns {Promise<any>} The response data.
 * @throws {Error} If an error occurs.
 */
export const getAllBestSellingProduct = async (params?: any) => {
  try {
    let urlParams =
      params && params.rowsPerPage
        ? `limit=${params?.rowsPerPage ? params.rowsPerPage : 80}&page=${
            params?.currentPage ? params?.currentPage : 1
          }`
        : "";
    let response: any = await url.get(
      `/products/best-selling?sort=sold&${urlParams}`
    );
    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
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
