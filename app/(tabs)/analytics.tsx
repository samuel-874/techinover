import CategoryItem from "@/components/CategoryItem";
import { Header } from "@/components/Header";
import { useCategory, useTransaction } from "@/redux/hooks";
import { useAnalytics } from "@/services/hooks/analytics.hook";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PieChart from "react-native-pie-chart";
import "react-native-svg";

const AnalyticsScreen = () => {
  const {
    totalExpense,
    selectedPeriod,
    setSelectedPeriod,
    itemizedCategory,
    selectedYear,
    periods,
  } = useAnalytics();
  const { transactions } = useTransaction();
  const { categories } = useCategory();
  const widthAndHeight = 250;
  const series = itemizedCategory.map((cat) => ({
    value: cat.totalAmount,
    color: cat.color,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <View style={styles.titleSection}>
          <Text style={styles.title}>Expense Report</Text>
          <TouchableOpacity style={styles.yearSelector}>
            <Text style={styles.yearText}>{selectedYear}</Text>
            <Ionicons name="chevron-down" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.periodTabs}>
          {periods.map((period, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.periodTab,
                selectedPeriod === period && styles.activePeriodTab,
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text
                style={[
                  styles.periodTabText,
                  selectedPeriod === period && styles.activePeriodTabText,
                ]}
              >
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.chartContainer}>
          <View style={styles.chartWrapper}>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              cover={{ radius: 0.7, color: "white" }}
              padAngle={0.001}
            />
            <View style={styles.chartCenter}>
              <Text style={styles.totalLabel}>Total Expense</Text>
              <Text style={styles.totalAmount}>
                ₦{totalExpense.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.legend}>
          {categories.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: item.color }]}
              />
              <Text style={styles.legendText}>{item.name}</Text>
            </View>
          ))}
        </View>

        {itemizedCategory.length > 0 && (
          <View style={styles.categoriesSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <TouchableOpacity>
                <View
                  style={{ borderBottomWidth: 1, borderBottomColor: "#005EE8" }}
                >
                  <Text style={styles.addText}>+ Add</Text>
                </View>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", gap: 15 }}>
                {itemizedCategory.map((category, index) => (
                  <CategoryItem
                    key={index}
                    name={category.name}
                    icon={category.icon}
                    color={category.color}
                    totalAmount={category.totalAmount}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        <View style={styles.transactionSection}>
          <Text style={styles.sectionTitle}>Transaction History</Text>

          {transactions.map((transaction, idx) => (
            <View key={idx} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View
                  style={[
                    styles.transactionDot,
                    { backgroundColor: transaction.color },
                  ]}
                />
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionName}>{transaction.note}</Text>
                  <Text style={styles.transactionCategory}>
                    {transaction.category}
                  </Text>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={styles.transactionAmount}>
                  ₦ {transaction.amount?.toLocaleString()}
                </Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.loadMoreButton}>
            <Text style={styles.loadMoreText}>Load more Transaction</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    fontFamily: "Lato_700Bold",
  },
  yearSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  yearText: {
    fontSize: 14,
    color: "#6B7280",
    marginRight: 5,
    fontFamily: "Lato_400Regular",
  },
  periodTabs: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 10,
  },
  periodTab: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 13,
    backgroundColor: "#F3F4F6",
  },
  activePeriodTab: {
    backgroundColor: "#4F46E5",
  },
  periodTabText: {
    fontSize: 14,
    color: "#6B7280",
    fontFamily: "Lato_400Regular",
  },
  activePeriodTabText: {
    color: "#FFFFFF",
    fontFamily: "Lato_400Regular",
  },
  chartContainer: {
    alignItems: "center",
    marginVertical: 40,
    fontFamily: "Lato_400Regular",
  },
  chartWrapper: {
    position: "relative",
  },
  chartCenter: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -120 }, { translateY: -30 }],
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 5,
    fontFamily: "Lato_400Regular",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Lato_400Regular",
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap", // ✅ enables wrapping
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 10,
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%", // ✅ 2 columns with some spacing
    marginBottom: 10,
  },
  legendDot: {
    width: 9,
    height: 9,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: "#6B7280",
    fontFamily: "Lato_400Regular",
  },
  categoriesSection: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    fontFamily: "Lato_400Regular",
  },
  addText: {
    color: "#005EE8",
    fontSize: 14,
    paddingBottom: 3,
    fontFamily: "Lato_400Regular",
  },
  categoriesGrid: {
    flexDirection: "row",
    gap: 15,
  },
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
  transactionSection: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 100,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1.2,
    borderBottomColor: "#EAECF0",
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  transactionDetails: {
    justifyContent: "center",
  },
  transactionName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 2,
    fontFamily: "Lato_400Regular",
  },
  transactionCategory: {
    fontSize: 14,
    color: "#6B7280",
    fontFamily: "Lato_400Regular",
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
    fontFamily: "Lato_400Regular",
  },
  transactionDate: {
    fontSize: 14,
    color: "#6B7280",
    fontFamily: "Lato_400Regular",
  },
  loadMoreButton: {
    borderWidth: 1,
    borderColor: "#4F46E5",
    borderRadius: 13,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
    fontFamily: "Lato_400Regular",
  },
  loadMoreText: {
    color: "#4F46E5",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default AnalyticsScreen;
