import { Transaction } from "@/redux/transactionSlice";
import {
  differenceInCalendarDays,
  format,
  isToday,
  isYesterday,
  parse,
} from "date-fns";

export const greet = () => {
  const hour = new Date().getHours();

  if (hour >= 4 && hour < 12) {
    return "Good Morning ☀️";
  } else if (hour >= 12 && hour < 17) {
    return "Good Afternoon ☀️";
  } else {
    return "Good Evening ☾";
  }
};

export function formatSpendDate(dateStr: string): string {
  const inputDate = new Date(dateStr);
  const today = new Date();

  // Strip time from both dates
  const input = new Date(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    inputDate.getDate()
  );
  const current = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  // Calculate difference in days
  const msInDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round((current.getTime() - input.getTime()) / msInDay);

  // Get day and month strings
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = weekdays[input.getDay()];
  const date = input.getDate();
  const month = months[input.getMonth()];

  const formattedDate = `(${day}, ${date} ${month})`;

  // Format label
  let label = "";
  if (diffDays === 0) {
    label = "Today spend";
  } else if (diffDays === 1) {
    label = "Yesterday spend";
  } else {
    label = `${diffDays} days ago spend`;
  }

  return `${label} ${formattedDate}`;
}

export function getComparisonData(
  current: number,
  previous: number
): { isGreater: boolean; diff: number } {
  const isGreater = current > previous;
  const diff = isGreater
    ? ((current - previous) / current) * 100
    : ((previous - current) / previous) * 100;
  return { isGreater, diff };
}

export const groupTransactionsByDay = (transactions: Transaction[]) => {
  // Normalize and group transactions by day key
  const grouped: Record<string, number> = {};

  transactions.forEach((tx) => {
    const parsedDate = parse(tx.date || "", "EEE, dd MMM", new Date());
    const key = format(parsedDate, "yyyy-MM-dd"); // consistent key
    grouped[key] = (grouped[key] || 0) + (tx.amount ?? 0);
  });

  const result = Object.entries(grouped)
    .map(([dateStr, amount]) => {
      const date = new Date(dateStr);
      let labelPrefix = "";

      if (isToday(date)) {
        labelPrefix = "Today spend";
      } else if (isYesterday(date)) {
        labelPrefix = "Yesterday spend";
      } else {
        const diff = differenceInCalendarDays(new Date(), date);
        labelPrefix = `${diff} days ago`;
      }

      const formattedDate = format(date, "(EEE, dd MMM)");

      return {
        label: `${labelPrefix} ${formattedDate}`,
        amount,
      };
    })
    // Optional: sort by most recent first
    .sort((a, b) => {
      const dateA = parse(
        a.label.match(/\((.*)\)/)?.[1] ?? "",
        "EEE, dd MMM",
        new Date()
      );
      const dateB = parse(
        b.label.match(/\((.*)\)/)?.[1] ?? "",
        "EEE, dd MMM",
        new Date()
      );
      return dateB.getTime() - dateA.getTime();
    });

  return result;
};

export const generateTransactionID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
