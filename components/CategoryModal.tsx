import { Category } from "@/redux/categorySlice";
import { useCategory } from "@/redux/hooks";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CategoryModal = ({
  onSelect,
  bottomSheetRef,
}: {
  onSelect: (category: Category) => void;
  bottomSheetRef: React.RefObject<any>;
}) => {
  const { categories } = useCategory();

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1} // Start closed
      enablePanDownToClose={true}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.title}>Select a Category</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.categoriesList}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryItem}
              onPress={() => onSelect(category)}
            >
              <View style={styles.categoryLeft}>
                <View
                  style={[
                    styles.categoryIcon,
                    { backgroundColor: category.color },
                  ]}
                >
                  <Ionicons
                    name={category.icon as any}
                    size={20}
                    color="white"
                  />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },

  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    maxHeight: "80%",
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: "#D1D5DB",
    borderRadius: 2,
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "Lato_400Regular",
  },
  categoriesList: {
    flex: 1,
  },
  categoryItem: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  categoryLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    fontFamily: "Lato_400Regular",
  },
});

export default CategoryModal;
