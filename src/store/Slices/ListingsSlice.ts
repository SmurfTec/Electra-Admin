import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import url from '../../config/index';
type param = {
  rowsPerPage?: number;
  currentPage?: number;
};
export const getAllListings = async (params?: param) => {
  try {
    let urlParams =
      params && params.rowsPerPage
        ? `limit=${params?.rowsPerPage ? params.rowsPerPage : 80}&page=${
            params?.currentPage ? params?.currentPage : 1
          }`
        : '';
    let response: any = await url.get(`/listings?${urlParams}`);
    console.log(response);
    return response;
  } catch (e) {
    return e;
  }
};
export const getListingById = async (id: any) => {
  try {
    let response: any = await url.get(`/listings/${id}`);
    console.log(response);
    return response;
  } catch (e) {
    return e;
  }
};

export const deleteListingById = async (id: any) => {
  try {
    let response: any = await url.delete(`/listings/${id}`);
    console.log(response);
    return response;
  } catch (e) {
    return e;
  }
};

// Review api for listing

export const flagListing = async (body: any) => {
  try {
    let response: any = await url.patch(`/listings/flaggged`, body);
    console.log(response);
    return response;
  } catch (e) {
    return e;
  }
};
