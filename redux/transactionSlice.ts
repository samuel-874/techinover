import { createSlice } from "@reduxjs/toolkit";
import { defaultTransactions } from "../services/constants";

export type Transaction = {
  id: string | number;
  // name: string;
  category: string | undefined;
  amount: number | undefined;
  date: string | undefined;
  color: string | undefined;
  icon: string | undefined;
  imageUrl?: string | undefined;
  note: string | undefined;
};

export const transactionSlice = createSlice({
  name: "transactions",
  initialState: defaultTransactions,
  reducers: {
    setTransactions: (state, action) => {
      return action.payload;
    },
  },
});

export const { setTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
