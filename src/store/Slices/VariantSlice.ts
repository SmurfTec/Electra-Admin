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