import { createSlice } from '@reduxjs/toolkit';
import url from '../../../config/index';
import { UsersCount } from '../../../pages/Users/Users/extraReducers';
const initialState: any = {
  users: [],
  CurrentActiveUser: {},
  count: 0,
};
type adminBody = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  mobile_no: string;
  role: string;
};
export const getAllUsers = async ({
  rowsPerPage = 25,
  currentPage = 1,
}: any) => {
  try {
    const response: any = await url.get(
      `/users/?sort=id&limit=${rowsPerPage ? rowsPerPage : 25}&page=${
        currentPage ? currentPage : 1
      }`
    );
    return response.data;
  } catch (e) {
    return e;
  }
};
export const SendEmail = async () => {
  try {
    const response = await url.post('/auth/email-2fa');
    return response.data;
  } catch (e) {
    return e;
  }
};
export const VerifyUserCode = async (code: any) => {
  try {
    const response = await url.get(`/auth/email-2fa/${code}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const UpdateUser = async (body: any) => {
  try {
    const response = await url.patch(`/users/me`, { ...body });
    return response.data;
  } catch (e) {
    return e;
  }
};
export const ChangePassword = async (body: any) => {
  try {
    const response = await url.patch(`/auth/update-password`, body);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const ResetPassword = async (body: any, code: any) => {
  try {
    const response = await url.patch(`/auth/reset-password/${code}`, body);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const GetUserAsks = async (userId: any) => {
  try {
    const response = await url.get(`/asks/?user=${userId}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const GetUserStats = async (userId: any, status = 'pending') => {
  try {
    const response = await url.get(`/orders/users/${userId}?status=${status}`);
    return { ...response.data };
  } catch (e) {
    return e;
  }
};
export const getSingleUser = async (id: any) => {
  try {
    const response: any = await url.get(`/users/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const getSingleUserOrder = async (
  id: any,
  status: any,
  { rowsPerPage = 25, currentPage = 1, orderid = 0, name = '', date = '' }
) => {
  let params: any =
    status.length > 0
      ? `/orders/users/${id}?status=${status}&limit=${
          rowsPerPage ? rowsPerPage : 25
        }&page=${currentPage ? currentPage : 1}`
      : `/orders/users/${id}?limit=${rowsPerPage ? rowsPerPage : 25}&page=${
          currentPage ? currentPage : 1
        }`; //?buyer=${id}
  params = orderid > 0 ? params + `&id=${orderid}` : params;
  params = name.length > 0 ? params + `&title=${name}` : params;
  if (date) {
    params = params + `&created_on=${new Date(date).toDateString()}`;
  }

  try {
    const response: any = await url.get(`${params}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const BanUser = async (body: any) => {
  try {
    const response: any = await url.patch(`/users/ban`, body);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const UnBanUser = async (body: any) => {
  try {
    const response: any = await url.patch(`/users/unban`, body);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const DeleteSingleUser = async (body: any) => {
  try {
    const response: any = await url.delete(`/users`, { data: body });
    return response.data;
  } catch (e) {
    return e;
  }
};
export const GetAllUserOrder = async (id: any) => {
  try {
    const response: any = await url.get(`/orders/${id}/me`);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const addAdmin = async (body: adminBody) => {
  try {
    const response: any = await url.post('/users/admin', body);
    return response;
  } catch (e) {
    return e;
  }
};
export const getNotifications = async () => {
  try {
    const response: any = await url.get('/notifications/own/all');
    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
};
export const readMyNotifications = async () => {
  try {
    const response: any = await url.patch('/notifications');
    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
};
export const forgotPassword = async (email: string) => {
  try {
    const body = { email: email };
    const response: any = await url.post('/auth/forgot-password', body);
    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

const UserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserCount: (state: any, action: any) => {
      state.count = action.payload.total_users_registered;
    },
  },
  extraReducers: builder => {
    builder.addCase(UsersCount.fulfilled, (state: any, action: any) => {
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator

      state.count = action.payload.total_users_registered;
    });
  },
});
export const { setUserCount } = UserSlice.actions;
export default UserSlice.reducer;
