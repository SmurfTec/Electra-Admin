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
    export const getSupportById=async(id:any)=>{
      try{
        let response:any=await url.get(`/supports/${id}`)
        return response.data;
      }catch(e){
        return e;
      }
      }
  