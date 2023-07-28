import { createSlice } from "@reduxjs/toolkit";
import url from "../../config/index";

export const getAllCategories=async()=>{
    try{
      let response:any=await url.get('/genericcategories')
      return response.data;
    }catch(e){
      return e;
    }
    }
    export const CreateCategories=async(body:any)=>{
      try{
        let response:any=await url.post('/genericcategories',body)
        return response.data;
      }catch(e){
        return e;
      }
      }
    export const DeleteSingleCategory= async (id:any)=>{
      try {
          let response: any = await url.delete(`/genericcategories/${id}`);
          return response.data;
        } catch (e) {
         
        }
    }

   