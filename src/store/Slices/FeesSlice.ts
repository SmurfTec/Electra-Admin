
import url from "../../config/index";

export const getAllFees=async()=>{
    try{
      let response:any=await url.get('/Fees')
      return response.data;
    }catch(e){
      return e;
    }
    }
    export const CreateFees=async(id:any,body:any)=>{
      try{
        let response:any=await url.put(`/fees/${id}`,body)
        return response.data;
      }catch(e){
        return e;
      }
      }
   

   