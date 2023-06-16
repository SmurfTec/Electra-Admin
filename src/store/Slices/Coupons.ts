import { createSlice } from "@reduxjs/toolkit";
import url from "../../config/index";

export const getAllCoupons=async()=>{
    try{
      let response:any=await url.get('/coupons')
      return response.data;
    }catch(e){
      return e;
    }
    }

    export const CreateCoupon=async(body:any)=>{
      try{
        let response:any=await url.post('/coupons',body)
        return response.data;
      }catch(e){
        return e;
      }
      }
      export const DeleteCoupon=async(id:any)=>{
        try{
          let response:any=await url.delete(`/coupons/${id}`)
          return response.data;
        }catch(e){
          return e;
        }
        }