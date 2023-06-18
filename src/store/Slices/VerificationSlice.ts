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
    export const getVerficationById=async(id:any)=>{
      try{
        let response:any=await url.get(`/verifications/${id}`)
        return response.data;
      }catch(e){
        return e;
      }
      }