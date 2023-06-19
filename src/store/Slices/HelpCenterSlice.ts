import { createSlice } from "@reduxjs/toolkit";
import url from "../../config/index";

export const getAllSupport=async()=>{
    try{
      let response:any=await url.get('/supports/?sort=id')
      return response.data;
    }catch(e){
      return e;
    }
    }
  