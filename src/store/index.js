import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slice/authSlice";
import { todoSlice } from "./slice/todoSlice";
import { cartSlice } from "./slice/cartSlice";
import { favoritesSlice } from "./slice/favoritesSlice";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [todoSlice.name]: todoSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
    [favoritesSlice.name]: favoritesSlice.reducer,
  },
});
