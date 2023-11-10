import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import url from '../../config/index';
type param = {
  rowsPerPage?: number;
  currentPage?: number;
};
export const getAllListings = async (params?: param) => {
  try {
    const urlParams =
      params && params.rowsPerPage
        ? `limit=${params?.rowsPerPage ? params.rowsPerPage : 80}&page=${
            params?.currentPage ? params?.currentPage : 1
          }`
        : '';
    const response: any = await url.get(`/listings?${urlParams}`);
    return response;
  } catch (e) {
    return e;
  }
};
export const getListingById = async (id: any) => {
  try {
    const response: any = await url.get(`/listings/${id}`);
    return response;
  } catch (e) {
    return e;
  }
};

export const deleteListingById = async (id: any) => {
  try {
    const response: any = await url.delete(`/listings/${id}`);
    return response;
  } catch (e) {
    return e;
  }
};

// Review api for listing

export const flagListing = async (body: any) => {
  try {
    const response: any = await url.patch(`/listings/flaggged`, body);
    return response;
  } catch (e) {
    return e;
  }
};

type payload = {};

export const ListingsCount = createAsyncThunk('listings/count', async () => {
  try {
    const response: any = await url.get('/listings/count');
    return response.data;
  } catch (e) {
    return e;
  }
});

export const ListingsSlice = createSlice({
  name: 'listings',
  initialState: {
    listings: [],
    total_listings: 0,
  },
  reducers: {
    setListingCount: (state: any, action: any) => {
      state.total_listings = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(ListingsCount.pending, (state: any, action: any) => {
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
      state.total_listings = action.payload.count.all_listings || 0;
    });
  },
});
export const { setListingCount } = ListingsSlice.actions;
export default ListingsSlice.reducer;
