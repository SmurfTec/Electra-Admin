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

type payload = {};

export const ListingsCount = createAsyncThunk<
  Response,
  payload,
  { rejectValue: any }
>('listings/count', async () => {
  try {
    let response: any = await url.get('/listings/count');
    console.log(response.data, 'RESPONSEE');
    return response.data;
  } catch (e) {
    return e;
  }
});

export const OrderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    total_listings: 0,
  },
  reducers: {},
  extraReducers: {
    [ListingsCount.fulfilled]: (state, action) => {
      state.total_listings = action.payload.count.all_listings || 0;
    },
  },
});

export default OrderSlice.reducer;
