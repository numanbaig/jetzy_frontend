// store/slices/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  email: string | null;
  name: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  email: null,
  name: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ email: string; name: string }>) => {
      console.log(action.payload.email,action.payload.name)
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = null;
      state.name = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
