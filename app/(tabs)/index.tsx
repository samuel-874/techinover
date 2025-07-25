import { Header } from "@/components/Header";
import { QuickLink } from "@/components/QuickLink";
import { SpendCard } from "@/components/SpendCard";
import { TransactionItem } from "@/components/TransactionItem";
import { useTransaction } from "@/redux/hooks";
import { quickLinks } from "@/services/constants";
import { greet, groupTransactionsByDay } from "@/services/functions";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Index = () => {
  const { transactions } = useTransaction();
  const spendData = groupTransactionsByDay(transactions);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setCurrentCardIndex(pageNum);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>{greet()}</Text>
          <Text style={styles.userName}>Adeola Adeyoyin</Text>
        </View>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {spendData.map((spendInfo, idx) => (
            <SpendCard
              key={idx}
              spendInfo={spendInfo}
              idx={idx}
              spendData={spendData}
            />
          ))}
        </ScrollView>

        {/* Page Indicator */}
        <View style={styles.pageIndicator}>
          {spendData.map((_, idx) => (
            <View
              key={idx}
              style={[styles.dot, idx === currentCardIndex && styles.activeDot]}
            />
          ))}
        </View>

        <View style={styles.quickLinksSection}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {quickLinks.map((quickLink, idx) => (
              <QuickLink
                key={idx}
                title={quickLink.title}
                icon={quickLink.icon}
                linkTo={quickLink.linkTo}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transaction</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {transactions.map((transaction, idx) => (
            <TransactionItem
              key={idx}
              transaction={transaction}
              style={styles.transactionItem} // if you want to pass external styling
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    fontFamily: "Lato_400Regular",
  },
  greetingSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  greeting: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 5,
    fontFamily: "Lato-Regular",
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    fontFamily: "Lato-Regular",
  },
  pageIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
  },
  activeDot: {
    backgroundColor: "#1F2937",
    width: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#000",
    marginBottom: 15,
    fontFamily: "Lato_400Bold",
  },
  quickLinksRow: {
    flexDirection: "row",
    gap: 40,
  },
  recentSection: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 100,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  viewAllText: {
    color: "#005EE8",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
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
  },
  transactionCategory: {
    fontSize: 14,
    color: "#6B7280",
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 14,
    color: "#6B7280",
  },
  fab: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1F2937",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  quickLinksSection: {
    marginBottom: 20,
    paddingLeft: 10,
    overflowX: "scroll",
    fontFamily: "Lato_400Regular",
  },
  quickLinksGrid: {
    flexDirection: "row",
    gap: 15,
  },
});

export default Index;
