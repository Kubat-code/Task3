import { createSlice } from "@reduxjs/toolkit";
import {
  CreateTodo,
  deleteTodoThunk,
  getTodoThunk,
  updateTodoThunk,
} from "../thunk/todoThunk";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateTodo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(CreateTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos.push(action.payload);
      })
      .addCase(CreateTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getTodoThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTodoThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(getTodoThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteTodoThunk.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(updateTodoThunk.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      });
  },
});
