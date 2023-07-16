import { createSlice } from "@reduxjs/toolkit";
import url from "../../config/index";

export const getAllOrders=async(params?:any)=>{
    try{
      let urlParams = params && params.status ? `status=${params.status}` : '';
      let response: any = await url.get(`/orders/?sort=id&${urlParams}`);
      return response.data;
    }catch(e){
      return e;
    }
    }
export const DeleteOrders=async(id:any)=>{
  try{
    let response:any=await url.delete(`/orders/${id}`)
    return response.data;
  }catch(e){
    return e;
  } 
}

   