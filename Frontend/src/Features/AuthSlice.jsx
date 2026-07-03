import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./AuthService";
import { loginUser } from "./AuthService";
import { logoutUser } from "./AuthService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user || null,
  token: user?.token || null,
  isAuthenticated: user?.token ? true : false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export default authSlice.reducer;
