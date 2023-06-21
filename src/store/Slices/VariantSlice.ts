import url from "../../config/index"
export const getAllVariants= async ()=>{
    try {
        let response: any = await url.get("/variants");
        console.log(response.data,"RESPONSEE")
        
        return response.data;
      } catch (e) {
        return e;
      }
}
export const DeleteSingleVariant= async (id:any)=>{
  try {
      let response: any = await url.delete(`/variants/${id}`);
      return response.data;
    } catch (e) {
      return e;
    }
}
export const CreateVariantData=async(body:any)=>{
  try {
    let response: any = await url.post(`/variants`,body);
    return response.data;
  } catch (e) {
    return e;
  }
}