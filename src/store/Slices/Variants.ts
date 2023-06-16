import { createSlice } from "@reduxjs/toolkit";
import url from "../../config/index";

export const getAllVariants=async()=>{
    try{
      let response:any=await url.get('/variants')
      return response.data;
    }catch(e){
      return e;
    }
    }
