import { createSlice } from '@reduxjs/toolkit';
import url from '../../config/index';

export const getAllCoupons = async (params: any) => {
  try {
    let response: any = await url.get('/coupons');
    return response.data;
  } catch (e) {
    return e;
  }
};

export const CreateCoupon = async (body: any) => {
  try {
    let response: any = await url.post('/coupons', body);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const UpdateCoupon = async (id: any, body: any) => {
  try {
    let response: any = await url.put(`/coupons/${id}`, body);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const DeleteCoupons = async (id: any) => {
  try {
    let response: any = await url.delete(`/coupons/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
