import url from '../../config/index';

export const getBrands = async () => {
  try {
    let response: any = await url.get(`/brands/?sort=id`);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const getAllBrands = async ({ rowsPerPage = 25, currentPage = 1 }) => {
  try {
    let response: any = await url.get(
      `/brands/?sort=id&limit=${rowsPerPage ? rowsPerPage : 25}&page=${
        currentPage ? currentPage : 1
      }`,
    );
    return response.data;
  } catch (e) {
    return e;
  }
};
export const GetBrandID=async(id:any)=>{
  try {
    let response: any = await url.get(`/brands/${id}`,);
    return response.data;
  } catch (e) {
    return e;
  }
}
export const CreateNewBrand = async (body: any) => {
  try {
    let response: any = await url.post('/brands', body);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const EditBrandByID = async (id:string|number,body: any) => {
  try {
    console.log(id)
    let response: any = await url.put(`/brands/${id}`, body);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const DeleteBrand = async (id: any) => {
  try {
    let response: any = await url.delete(`/brands/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
