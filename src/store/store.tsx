import { configureStore,combineReducers } from '@reduxjs/toolkit'
import authSlice from './Slices/AuthSlice'
import UserSlice from './Slices/UserSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// Use redux persist here
const persistConfig = {
  key: 'root',
  storage:storage,
  onError: (error:any) => {
   },
}
const rootReducer = combineReducers({
  auth: authSlice,
  user:UserSlice
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})
export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch