import { createSlice } from "@reduxjs/toolkit";
import url from "../../config/index";
import axios from "axios";
const initialState: any = {
  users: [],
  CurrentActiveUser: {},
};
type adminBody = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  mobile_no: string;
  role: string;
};
export const getAllUsers = async ({rowsPerPage=25,currentPage=1}:any) => {
  try {
    let response: any = await url.get(`/users/?sort=id&limit=${rowsPerPage?rowsPerPage: 25}&page=${currentPage?currentPage: 1}`);
    return response.data;
  } catch (e) {
    return e; 
  }
};
export const SendEmail = async () => {
  try {
    let response = await url.post("/auth/email-2fa");
    return response.data;
  } catch (e) {
    return e;
  }
};
export const VerifyUserCode = async (code: any) => {
  try {
    let response = await url.get(`/auth/email-2fa/${code}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const UpdateUser = async (body: any) => {
  try {
    let response = await url.patch(`/users/me`, body);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const ChangePassword=async(body:any)=>{
  try{
    let response = await url.patch(`/auth/update-password`, body);
    return response.data;
  }catch(e){
    return e;
  }
}
export const GetUserAsks=async(userId:any)=>{
  try{
    let response = await url.get(`/asks/?user=${userId}`);
    return response.data;
  }catch(e){
    return e;
  }
}
export const GetUserStats=async(userId:any,status="pending")=>{
  try{
    let response = await url.get(`/orders/users/${userId}?status=${status}`);
    return {...response.data};
  }catch(e){
    return e;
  }
}
export const getSingleUser = async (id: any) => {
  try {
    let response: any = await url.get(`/users/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const getSingleUserOrder=async(id:any,status:any,{rowsPerPage=25,currentPage=1})=>{
  let params=status.length>0 ? `/orders/users/${id}?status=${status}&limit=${rowsPerPage?rowsPerPage: 25}&page=${currentPage?currentPage: 1}`:`/orders/users/${id}?limit=${rowsPerPage?rowsPerPage: 25}&page=${currentPage?currentPage: 1}` //?buyer=${id}
  try {
    let response: any = await url.get(`${params}`);
    console.log(response,"response")
    return response.data;
  } catch (e) {
    return e;
  }
}
export const BanUser = async (body: any) => {
  try {
    let response: any = await url.patch(`/users/ban`, body);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const UnBanUser = async (body: any) => {
  try {
    let response: any = await url.patch(`/users/unban`, body);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const DeleteSingleUser = async (body: any) => {
  try {
    let response: any = await url.delete(`/users`, { data: body });
    return response.data;
  } catch (e) {
    return e;
  }
};
export const GetAllUserOrder = async (id: any) => {
  try {
    let response: any = await url.get(`/orders/${id}/me`);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const addAdmin = async (body: adminBody) => {
  try {
    let response: any = await url.post("/users/admin", body);
    return response;
  } catch (e) {
    return e;
  }
};
export const getNotifications=async()=>{
  try{
let response:any =await url.get('/notifications/own/all');
return response.data
  }catch(e){

  }
}


const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});
export default UserSlice.reducer;
