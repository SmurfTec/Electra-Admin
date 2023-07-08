import { createSlice } from "@reduxjs/toolkit";
import url from "../../config/index";
import axios from "axios";
const initialState: any = {
  users: [],
  CurrentActiveUser: {},
};

export const getRoles = async () => {
  try {
    let response: any = await url.get("/authorization/roles");
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
