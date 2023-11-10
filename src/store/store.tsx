import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './Slices/AuthSlice';
import ListingsSlice from './Slices/ListingsSlice';
import OrderSlice from './Slices/OrderSlice';
import ProductSlice from './Slices/ProductSlice';
import UserSlice from './Slices/UserSlice';
// Use redux persist here
const persistConfig = {
  key: 'root',
  storage: storage,
  onError: (error: any) => {},
};
const rootReducer = combineReducers({
  auth: authSlice,
  user: UserSlice,
  orders: OrderSlice,
  listings: ListingsSlice,
  products: ProductSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
