import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";

export const signUpThunk = createAsyncThunk(
  "auth/signUpThunk",
  async (newUser, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/register", newUser);
      console.log(data, "daaa");
      // localStorage.setItem("auth", JSON.stringify(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInThunk = createAsyncThunk(
  "auth/signInThunk",
  async ({ userData, navigate }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth", userData);
      console.log(data);
      localStorage.setItem("auth", JSON.stringify(data));
      if (data.data.role === "USER") {
        navigate("/user");
      } else if (data.data.role === "ADMIN") {
        navigate("/admin");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Ошибка входа");
    }
  }
);
