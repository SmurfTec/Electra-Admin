import url from '../../config/index';

export const getAllFees = async (params?: any) => {
  try {
    const urlParams =
      params && params.rowsPerPage
        ? `limit=${params?.rowsPerPage ? params.rowsPerPage : 80}&page=${
            params?.currentPage ? params?.currentPage : 1
          }`
        : '';
    const response: any = await url.get(`/Fees?sort=-id&${urlParams}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const CreateFees = async (body: any) => {
  try {
    const response = await url.post(`/fees`, body);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const UpdateFees = async (id: any, body: any) => {
  try {
    const response = await url.put(`/fees/${id}`, body);
    return response.data;
  } catch (e) {
    return e;
  }
};

export const deleteFees = async (id: any) => {
  try {
    const response: any = await url.delete(`/fees/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
