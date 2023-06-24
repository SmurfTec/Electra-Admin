import url from "../../config";
export const getWebsite = async () => {
  try {
    let response: any = await url.get("/websites");
    console.log(response)
    return response
  } catch (e) {
    return e
  }
};
export const getWebsiteById=async(id:any)=>{
  try{
    let response: any = await url.get(`/websites/${id}`);
    console.log(response)
    return response
  }catch(e){
    return e

  }
}