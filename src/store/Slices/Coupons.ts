import { createSlice } from '@reduxjs/toolkit';
import url from '../../config/index';

export const getAllCoupons = async ({
  rowsPerPage = 10,
  currentPage = 1,
}: any) => {
  try {
    const response: any = await url.get(
      `/coupons?sort=id&limit=${rowsPerPage ? rowsPerPage : 25}&page=${
        currentPage ? currentPage : 1
      }`
    );
    return response.data;
  } catch (e) {
    return e;
  }
};

export const CreateCoupon = async (body: any) => {
  try {
    const response: any = await url.post('/coupons', body);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const UpdateCoupon = async (id: any, body: any) => {
  try {
    const response: any = await url.put(`/coupons/${id}`, body);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const DeleteCoupons = async (id: any) => {
  try {
    const response: any = await url.delete(`/coupons/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
