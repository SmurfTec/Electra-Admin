import { createAsyncThunk } from '@reduxjs/toolkit';
import url from '../../../config/index';

type payload = {};
type Response = {
  total_users: number | null;
  total_users_this_month: number | null;
  total_users_last_month: number | null;
  total_user_this_year: number | null;
  total_user_last_year: number | null;
};

export const UsersCount = createAsyncThunk<
  Response,
  payload,
  { rejectValue: any }
>('users/count', async () => {
  try {
    let response: any = await url.get('/users/stats/all');
    console.log(response.data, 'RESPONSEE');
    return response.data;
  } catch (e) {
    return e;
  }
});
