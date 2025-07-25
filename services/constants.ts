import { IQuickLink } from "../components/QuickLink";

export const defaultCategories = [
  {
    id: 1,
    name: "Food & Drinks",
    icon: "restaurant",
    color: "#EF4444",
  },
  {
    id: 2,
    name: "Housing",
    icon: "home",
    color: "#EAB308",
  },
  {
    id: 3,
    name: "Shopping",
    icon: "bag",
    color: "#F97316",
  },
  {
    id: 4,
    name: "Family",
    icon: "people",
    color: "#22C55E",
  },
  {
    id: 5,
    name: "Transportation",
    icon: "car",
    color: "#3B82F6",
  },
  {
    id: 6,
    name: "Travel/ Vacation",
    icon: "airplane",
    color: "#8B5CF6",
  },
  {
    id: 7,
    name: "Entertainment",
    icon: "game-controller",
    color: "#1F2937",
  },
  {
    id: 8,
    name: "Health",
    icon: "medical",
    color: "#EF4444",
  },
];

export const defaultTransactions = [
  {
    id: 1,
    note: "Cooking gas",
    category: "Housing",
    amount: 12000,
    date: "Sun, 16 Jan",
    color: "#F59E0B",
    icon: "home",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    note: "A/C Repair",
    category: "Transportation",
    amount: 36000,
    date: "Sun, 16 Jan",
    color: "#10B981",
    icon: "car",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    note: "Cooking gas",
    category: "Housing",
    amount: 12000,
    date: "Sun, 15 Jan",
    color: "#F59E0B",
    icon: "home",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    note: "A/C Repair",
    category: "Transportation",
    amount: 36000,
    date: "Sun, 15 Jan",
    color: "#10B981",
    icon: "car",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    note: "Cooking gas",
    category: "Housing",
    amount: 12000,
    date: "Sun, 14 Jan",
    color: "#F59E0B",
    icon: "home",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    note: "A/C Repair",
    category: "Transportation",
    amount: 36000,
    date: "Sun, 16 Jan",
    color: "#10B981",
    icon: "car",
    imageUrl: "https://via.placeholder.com/150",
  },
];

export const quickLinks: IQuickLink[] = [
  {
    title: "Add Expense",
    icon: require("@/assets/images/wallet-add.png"),
    linkTo: "/(tabs)/expenses",
  },
  {
    title: "Create a Category",
    icon: require("@/assets/images/category-2.png"),
    linkTo: undefined,
  },
];
