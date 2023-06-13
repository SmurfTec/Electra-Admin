import { createSlice } from "@reduxjs/toolkit";
import url from "../../config/index";
const initialState: any = {
    users:[],
    CurrentActiveUser:{}
  };
export const getAllUsers=async()=>{
let result=url.get('/users/?sort=id')
console.log(result)
}
const UserSlice=createSlice({
    name:"users",
    initialState,
    reducers: {},
})
export default  UserSlice.reducer