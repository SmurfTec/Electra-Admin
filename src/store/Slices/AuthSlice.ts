import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import url from "../../config/index";
const initialState:any = {

    auth: false,
   
  };
  
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
    
    },
  });
  export default authSlice.reducer;