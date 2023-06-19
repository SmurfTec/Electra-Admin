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
    export const DeleteSingleCategory= async (id:any)=>{
      try {
          let response: any = await url.delete(`/genericcategories/${id}`);
          return response.data;
        } catch (e) {
          return e;
        }
    }

   