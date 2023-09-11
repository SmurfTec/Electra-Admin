import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import url from '../../config/index';

export const getAllOrders = async ({
  rowsPerPage = 25,
  currentPage = 1,
  status = '',
}: any) => {
  let params =
    status.length > 0
      ? `/orders/?sort=id&limit=${rowsPerPage ? rowsPerPage : 25}&page=${
          currentPage ? currentPage : 1
        }&status=${status}`
      : `/orders/?sort=id&limit=${rowsPerPage ? rowsPerPage : 25}&page=${
          currentPage ? currentPage : 1
        }`;

  try {
    let response: any = await url.get(`${params}`);

    return response.data;
  } catch (e) {
    return e;
  }
};
export const DeleteOrders = async (id: any) => {
  try {
    let response: any = await url.delete(`/orders/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};

type payload = {};

export const OrdersCount = createAsyncThunk<
  Response,
  payload,
  { rejectValue: any }
>('orders/count', async () => {
  try {
    let response: any = await url.get('/orders/stats/all');
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
    totalOrders: 0,
  },
  reducers: {},
  extraReducers: {
    [OrdersCount.fulfilled]: (state, action) => {
      state.totalOrders = action.payload.total_orders;
    },
  },
});

export default OrderSlice.reducer;
