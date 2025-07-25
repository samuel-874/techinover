import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Transaction } from "../redux/transactionSlice";

type Props = {
  transaction: Transaction;
  style?: any;
};

export const TransactionItem = ({ transaction, style }: Props) => {
  return (
    <View style={[styles.transactionItem, style]}>
      <View style={styles.transactionLeft}>
        <View
          style={[
            styles.transactionIcon,
            { backgroundColor: transaction.color },
          ]}
        >
          <Ionicons name={transaction.icon as any} size={20} color="white" />
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionName}>{transaction.note}</Text>
          <Text style={styles.transactionCategory}>{transaction.category}</Text>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <Text style={styles.transactionAmount}>
          ₦ {transaction.amount?.toLocaleString()}
        </Text>
        <Text style={styles.transactionDate}>{transaction.date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionItem: {
    fontFamily: "Lato_400Regular",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionDetails: {},
  transactionName: {
    fontWeight: "semibold",
    fontFamily: "Lato_400Regular",
    fontSize: 16,
  },
  transactionCategory: {
    color: "#666",
    fontSize: 12,
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontWeight: "semibold",
    fontFamily: "Lato_400Regular",
    fontSize: 16,
  },
  transactionDate: {
    color: "#999",
    fontSize: 12,
  },
});
