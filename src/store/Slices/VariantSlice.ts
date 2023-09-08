import url from "../../config/index"
export const getAllVariants= async ()=>{
    try {
        let response: any = await url.get(`/variants`);
        
        
        return response.data;
      } catch (e) {
        return e;
      }
}
export const getVariants= async ({rowsPerPage=25,currentPage=1})=>{
  try {
      let response: any = await url.get(`/variants/?limit=${rowsPerPage ? rowsPerPage : 25}&page=${currentPage ? currentPage : 1}`);
      
      
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