import { createSlice } from "@reduxjs/toolkit";
import url from "../../config/index";
import axios from "axios";
const initialState: any = {
  users: [],
  CurrentActiveUser: {},
};
type RoleBody = {
  name?: string;
  permissions: string[];
};
export const getRoles = async () => {
  try {
    let response: any = await url.get("/authorization/roles");
    return response.data;
  } catch (e) {
    return e;
  }
};

export const createRole = async (body: RoleBody) => {
  try {
    let response: any = await url.post("/authorization/role", body);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const editRole = async (body: RoleBody,name?:string,) => {
  try {
    let response: any = await url.patch(`/authorization/role-permissions/${name}`, body);
    return response.data;
  } catch (e) {
    return e;
  }
};


export const getPermission = async () => {
  try {
    let response: any = await url.get("/authorization/permissions");
    return response.data;
  } catch (e) {
    return e;
  }
};

export const getRolesByName = async (name?: String) => {
  try {
    let response: any = await url.get(`/authorization/role-permissions/${name}`);
    return response.data;
  } catch (e) {
    return e;
  }
};

// Get admin role
export const getUserByID = async (id?: String) => {
  try {
    let response: any = await url.get(`/authorization/admin/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
const RoleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
});
export default RoleSlice.reducer;
