import { createSlice } from "@reduxjs/toolkit";
import url from "../../config/index";
import axios from "axios";
const initialState: any = {
  users: [],
  CurrentActiveUser: {},
};
export const getAllUsers = async () => {
  try {
    let response: any = await url.get("/users/?sort=id");
    return response.data;
  } catch (e) {
    return e;
  }
};
export const getSingleUser = async (id: any) => {
  try {
    let response: any = await url.get(`/users/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
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
export const GetAllUserOrder= async (id: any) => {

  try {
    let response: any = await url.get(`/orders/${id}/me`,);
    return response.data;
  } catch (e) {
    return e;
  }
};
const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});
export default UserSlice.reducer;
