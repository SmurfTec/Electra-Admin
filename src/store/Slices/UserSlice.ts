import { createSlice } from "@reduxjs/toolkit";
import url from "../../config/index";
const initialState: any = {
    users:[],
    CurrentActiveUser:{}
  };
export const getAllUsers=async()=>{
try{
  let response:any=await url.get('/users/?sort=id')
  return response.data;
}catch(e){
  return e;
}
}
const UserSlice=createSlice({
    name:"users",
    initialState,
    reducers: {},
})
export default  UserSlice.reducer