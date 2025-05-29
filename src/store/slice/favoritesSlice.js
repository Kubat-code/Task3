import { createSlice } from "@reduxjs/toolkit";

const savedFavorite = JSON.parse(localStorage.getItem("favorites")) || [];

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: savedFavorite,
  },
  reducers: {
    toggleFavorite(state, action) {
      if (state.items.includes(action.payload)) {
        state.items = state.items.filter((id) => id !== action.payload);
      } else {
        state.items.push(action.payload);
      }
    },
    clearFavorites(state) {
      state.items = [];
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
