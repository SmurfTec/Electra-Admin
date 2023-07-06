import url from "../../config/index";

export const getBrands=async()=>{
    try{
      let response:any=await url.get('/brands')
      return response.data;
    }catch(e){
      return e;
    }
    }