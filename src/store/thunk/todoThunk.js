import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";

export const CreateTodo = createAsyncThunk(
  "todo/CreateTodo",
  async (todoData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/todos", todoData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Ошибка при создании Todo"
      );
    }
  }
);

export const getTodoThunk = createAsyncThunk(
  "todo/getTodoThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/todos");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Ошибка при получении Todo"
      );
    }
  }
);

export const deleteTodoThunk = createAsyncThunk(
  "todo/deleteTodoThunk",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/todos/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue("Ошибка при удалении Todo");
    }
  }
);

export const updateTodoThunk = createAsyncThunk(
  "todo/updateTodoThunk",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/todos/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue("Ошибка при обновлении Todo");
    }
  }
);
