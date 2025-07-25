import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { setTransactions, Transaction } from "./transactionSlice";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useCategory = () => {
  const categories = useAppSelector((state) => state.category);

  return { categories };
};

export const useTransaction = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector((state) => state.transaction);

  const addTransaction = (transaction: Transaction) => {
    const updatedTransactions = [transaction, ...transactions];
    dispatch(setTransactions(updatedTransactions));
  };

  return {
    transactions,
    addTransaction,
  };
};
