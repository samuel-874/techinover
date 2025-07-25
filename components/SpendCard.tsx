import { getComparisonData } from "@/services/functions";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions, StyleSheet, Text, View } from "react-native";

export const SpendCard = ({
  spendInfo,
  idx,
  spendData,
}: {
  spendInfo: { label: string; amount: number };
  idx: number;
  spendData: { label: string; amount: number }[];
}) => {
  let comparisonData = { isGreater: false, diff: 0 };

  if (idx + 1 < spendData.length) {
    const yesterday = spendData[idx + 1];
    comparisonData = getComparisonData(spendInfo.amount, yesterday.amount);
  }
  return (
    <View style={styles.spendCard}>
      <Text style={styles.spendLabel}>{spendInfo.label}</Text>
      <Text style={styles.spendAmount}>
        ₦{spendInfo.amount.toLocaleString()}
      </Text>
      <View style={styles.comparisonRow}>
        <Ionicons
          name={comparisonData.isGreater ? "trending-up" : "trending-down"}
          size={16}
          color="#D0D5DD"
        />
        <Text style={styles.comparisonText}>
          {` ${comparisonData.diff.toFixed(0)}% ${
            comparisonData.isGreater ? "above" : "below"
          } than yesterday`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  spendCard: {
    backgroundColor: "#1F2937",
    marginHorizontal: 10,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    fontFamily: "Lato_400Regular",
    width: Dimensions.get("window").width - 60,
    maxWidth: 400,
  },
  spendLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },
  spendAmount: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  comparisonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  comparisonText: {
    color: "#D0D5DD",
    fontSize: 14,
    marginLeft: 5,
  },
});
