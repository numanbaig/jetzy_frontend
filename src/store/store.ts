import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth_slice";
import appApi from "./appApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [appApi.reducerPath]: appApi.reducer,
  },

middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
