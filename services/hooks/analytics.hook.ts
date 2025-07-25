import { useState } from "react";
import { useCategory, useTransaction } from "../../redux/hooks";

export const useAnalytics = () => {
  const { categories } = useCategory();
  const { transactions } = useTransaction();
  const [selectedPeriod, setSelectedPeriod] = useState("All");
  const selectedYear = "This year (2024)";
  const periods = ["All", "Daily", "Weekly", "Monthly"];

  const itemizedCategory = categories
    ?.map((category) => {
      const totalAmount = transactions
        .filter((t) => t.category === category.name)
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        ...category,
        totalAmount,
      };
    })
    .filter((category) => category.totalAmount > 0);

  const totalExpense = itemizedCategory.reduce(
    (sum, item) => sum + item.totalAmount,
    0
  );

  return {
    totalExpense,
    selectedPeriod,
    setSelectedPeriod,
    itemizedCategory,
    selectedYear,
    periods,
  };
};
