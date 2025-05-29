import { createSlice } from "@reduxjs/toolkit";
import { signInThunk, signUpThunk } from "../thunk/authThunk";
const localAuth = JSON.parse(localStorage.getItem("auth")) || {};
const roleFromStorage = localAuth?.data?.role || "GUEST";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: {},
    isLoading: false,
    errorMessage: null,
    role: roleFromStorage,
    token: null,
  },
  reducers: {
    isAuth: (state, action) => {
      state.role = action.payload;
    },
    logout: (state) => {
      state.role = "GUEST";
      state.token = null;
      state.userData = {};
      localStorage.removeItem("auth");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpThunk.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.isLoading = true;
        state.userData = action.payload;
        state.role = action.payload?.data?.role;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.errorMessage = action.payload;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.isLoading = true;
        state.role = action.payload?.data?.role;
        state.token = action.payload?.token;
      });
  },
});

export const { isAuth, logout } = authSlice.actions;
