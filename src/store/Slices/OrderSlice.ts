import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import url from '../../config/index';

export const getAllOrders = async ({
  rowsPerPage = 25,
  currentPage = 1,
  status = '',
}: any) => {
  const params =
    status.length > 0
      ? `/orders/?sort=id&limit=${rowsPerPage ? rowsPerPage : 25}&page=${
          currentPage ? currentPage : 1
        }&status=${status}`
      : `/orders/?sort=id&limit=${rowsPerPage ? rowsPerPage : 25}&page=${
          currentPage ? currentPage : 1
        }`;

  try {
    const response: any = await url.get(`${params}`);

    return response.data;
  } catch (e) {
    return e;
  }
};
export const DeleteOrders = async (id: any) => {
  try {
    const response: any = await url.delete(`/orders/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};

export const UpdateOrderStatus = async (orderId: string, status: string) => {
  try {
    const response: any = await url.put(`/orders/${orderId}`, { status });
    return response.data;
  } catch (e) {
    return e;
  }
};

type payload = {};

export const OrdersCount = createAsyncThunk('orders/count', async () => {
  try {
    const response: any = await url.get('/orders/stats/all');
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
  reducers: {
    setOrderCount: (state: any, action: any) => {
      state.totalOrders = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(OrdersCount.pending, (state: any, action: any) => {
      state.totalOrders = action.payload.total_orders;
    });
  },
});
export const { setOrderCount } = OrderSlice.actions;

export default OrderSlice.reducer;
