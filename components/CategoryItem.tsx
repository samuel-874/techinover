import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type CategoryItemProps = {
  name: string;
  icon: string;
  color: string;
  totalAmount: number;
};

const CategoryItem = ({
  name,
  icon,
  color,
  totalAmount,
}: CategoryItemProps) => {
  return (
    <View style={styles.categoryCard}>
      <Text style={styles.categoryName}>{name}</Text>
      <View style={[styles.categoryIcon, { backgroundColor: color }]}>
        <Ionicons name={icon as any} size={20} color="white" />
      </View>
      <Text style={styles.categoryAmount}>
        ₦ {totalAmount.toLocaleString()}
      </Text>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  categoryCard: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 12,
    width: 200,
    alignItems: "center",
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginBottom: 10,
    fontFamily: "Lato_400Regular",
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    fontFamily: "Lato_400Regular",
  },
});
