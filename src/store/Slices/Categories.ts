import { createSlice } from "@reduxjs/toolkit";
import url from "../../config/index";

export const getCategories=async()=>{
    try{
      let response:any=await url.get(`/genericcategories`)
      return response.data;
    }catch(e){
      return e;
    } 
    }
    export const getAllCategories=async({rowsPerPage=25,currentPage=1}:any)=>{
      try{
        let response:any=await url.get(`/genericcategories/?limit=${rowsPerPage ? rowsPerPage : 25}&page=${currentPage ? currentPage : 1}`)
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

   