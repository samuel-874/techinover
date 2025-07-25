import { createSlice } from "@reduxjs/toolkit";
import { defaultCategories } from "../services/constants";

export type Category = {
  id: number;
  name: string;
  icon: string;
  color: string;
};

export const categorySlice = createSlice({
  name: "category",
  initialState: defaultCategories,
  reducers: {
    setCategory: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;
