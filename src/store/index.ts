// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import employeeReducer from "./slices/EmployeeSlice";
import { authApi } from '../api/authApi';
import { articleApi } from '../api/articleApi';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [articleApi.reducerPath]: articleApi.reducer,
    auth: authReducer,

    ui: uiReducer,
    employee: employeeReducer,
  },
  middleware: (getDefaultMiddleware) =>
getDefaultMiddleware().concat(
  authApi.middleware,articleApi.middleware,
),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
