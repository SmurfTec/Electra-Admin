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
    export const ChangeSupportStatus=async(id:any,body:any)=>{
      try{
        let response:any=await url.patch(`/supports/${id}`,body)
        return response.data;
      }catch(e){
        return e
      }
    }
    export const DeleteSupport=async(id:any)=>{
      try{
        let response:any=await url.delete(`/supports/${id}`)
        return response.data;
      }catch(e){
        return e
      }
    }
    export const ReplySupportCenter=async(id:any,body:any)=>{
      try{
        let response:any=await url.post(`/supports/${id}/reply`,body)
        return response.data;
      }catch(e){
        return e
      }
    }
  