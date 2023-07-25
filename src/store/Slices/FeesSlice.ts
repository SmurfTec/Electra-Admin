
import url from "../../config/index";

export const getAllFees=async(params?:any)=>{
    try{
      let urlParams =
      params && params.rowsPerPage
        ? `limit=${params?.rowsPerPage ? params.rowsPerPage : 80}&page=${
            params?.currentPage ? params?.currentPage : 1
          }`
        : "";
      let response:any=await url.get(`/Fees?sort=-id&${urlParams}`)
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
   

   