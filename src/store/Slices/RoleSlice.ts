import { createSlice } from "@reduxjs/toolkit";
import url from "../../config/index";
import axios from "axios";
const initialState: any = {
  users: [],
  CurrentActiveUser: {},
};
type RoleBody = {
  name: string;
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
    return e
  }
};

export const getPermission=async()=>{
  try{
    let response: any = await url.get("/authorization/permissions");
    return response.data;
  }catch(e){

  }
}

const RoleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
});
export default RoleSlice.reducer;
