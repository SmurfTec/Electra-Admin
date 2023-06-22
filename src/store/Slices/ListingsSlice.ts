import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import url from "../../config/index";
export const getAllListings = async () => {
  try {
    let response: any = await url.get("/listings");
    console.log(response)
    return response;
  } catch (e) {
    return e
  }
};
