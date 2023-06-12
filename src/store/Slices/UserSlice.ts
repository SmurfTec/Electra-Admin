import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    users:[],
    CurrentActiveUser:{}
  };
const UserSlice=createSlice({
    name:"users",
    initialState,
    reducers: {},
})
export default  UserSlice.reducer