import { createSlice } from "@reduxjs/toolkit";
import url from "../../config/index";

export const getAllVerfications=async()=>{
    try{
      let response:any=await url.get('/verifications/?sort=id')
      return response.data;
    }catch(e){
      return e;
    }
    }