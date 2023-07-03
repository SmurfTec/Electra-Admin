import url from "../../config";
export const getWebsite = async () => {
  try {
    let response: any = await url.get("/websites");
    console.log(response);
    return response;
  } catch (e) {
    return e;
  }
};
export const getWebsiteById = async (id: any) => {
  try {
    let response: any = await url.get(`/websites/${id}`);
    console.log(response);
    return response;
  } catch (e) {
    return e;
  }
};

// SECTIONS
export const updateSeciton = async (id: any, body: any) => {
  try {
    console.log(body,"BODy")
    let response: any = await url.put(`/sections/${id}`, body);
    if(response){
      const getNew=await getWebsiteById(id);
      return getNew.data;
    }
   
  } catch (e) {
    return e;
  }
};
// SECTIONS
export const deleteSeciton = async (id: any, body: any) => {
  try {
    console.log(body,"BODy")
    let response: any = await url.put(`/sections/${id}`, body);
    if(response){
      const getNew=await getWebsiteById(id);
      return getNew.data;
    }
   
  } catch (e) {
    return e;
  }
};

