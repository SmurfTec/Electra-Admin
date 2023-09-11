import { createSlice } from '@reduxjs/toolkit';
import url from '../../config/index';

export const getAllVerfications = async ({
  rowsPerPage = 25,
  currentPage = 1,
  status = '',
  order = 0,
  trakingid = '',
}: any) => {
  let params: any =
    status.length > 0
      ? `/verifications/?sort=id&limit=${rowsPerPage ? rowsPerPage : 25}&page=${
          currentPage ? currentPage : 1
        }&status=${status}`
      : `/verifications/?sort=id&limit=${rowsPerPage ? rowsPerPage : 25}&page=${
          currentPage ? currentPage : 1
        }`;
  params = order !== 0 ? params + `&order=${order}` : params;
  params = trakingid.length > 0 ? params + `&trackingid=${trakingid}` : params;

  // console.log(params,"params")
  try {
    let response: any = await url.get(`${params}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const getVerficationById = async (id: any) => {
  try {
    let response: any = await url.get(`/verifications/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const UpdateVerfication = async (id: any, body: any) => {
  try {
    let response: any = await url.patch(`/verifications/${id}`, body);
    return response.data;
  } catch (e) {
    return e;
  }
};
