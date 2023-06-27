import { createSlice } from "@reduxjs/toolkit";
import url from "../../config/index";

export const getAllOrders=async()=>{
    try{
      let response:any=await url.get('/orders/?sort=id')
      return response.data;
    }catch(e){
      return e;
    }
    }
   

   