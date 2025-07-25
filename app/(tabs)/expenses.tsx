import CategoryModal from "@/components/CategoryModal";
import CustomDatePicker from "@/components/CustomDatePicker";
import { useExpense } from "@/services/hooks/expense.hook";
import { Ionicons } from "@expo/vector-icons";
import "dayjs/locale/es";
import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const AddExpenseScreen = () => {
  const {
    amount,
    setAmount,
    date,
    note,
    image,
    errors,
    setErrors,
    showPicker,
    onChange,
    setDate,
    pickImage,
    setNote,
    handleCreate,
    handleCancel,
    formattedDate,
    setShowPicker,
    bottomSheetRef,
    handleOpenPress,
    selectedCategory,
    handleCategorySelect,
  } = useExpense();

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1, width: "100%" }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Text style={styles.title}>Add Expense</Text>
            </View>

            <View style={styles.amountSection}>
              <Text style={styles.amountLabel}>How much?</Text>
              <View style={styles.amountContainer}>
                <Text style={styles.currencySymbol}>₦</Text>
                <TextInput
                  style={styles.amountInput}
                  value={amount}
                  onChangeText={(text) => {
                    setAmount(text);
                    setErrors((prev) => ({ ...prev, amount: undefined }));
                  }}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor="#6B7280"
                />
              </View>
              {errors.amount && (
                <Text style={styles.errorText}>{errors.amount}</Text>
              )}
            </View>

            <View style={styles.formSection}>
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Category</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={handleOpenPress}
                >
                  <Text
                    style={[
                      styles.dropdownText,
                      !selectedCategory && styles.placeholder,
                    ]}
                  >
                    {selectedCategory?.name || "Select a category"}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#6B7280" />
                </TouchableOpacity>
                {errors.category && (
                  <Text style={styles.errorText}>{errors.category}</Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.fieldGroup}
                onPress={() => setShowPicker(true)}
              >
                <Text style={styles.fieldLabel}>Expense date</Text>
                <View style={styles.dateInput}>
                  <TextInput
                    style={styles.dateTextInput}
                    value={formattedDate}
                    editable={false}
                    placeholder="DD/MM/YYYY"
                    placeholderTextColor="#9CA3AF"
                  />
                  <Ionicons name="calendar-outline" size={20} color="#6B7280" />
                </View>
              </TouchableOpacity>

              <CustomDatePicker
                date={date}
                showPicker={showPicker}
                setShowPicker={setShowPicker}
                setDate={setDate}
                onChange={onChange}
              />

              <TouchableOpacity style={styles.uploadArea} onPress={pickImage}>
                <Ionicons
                  name="cloud-upload-outline"
                  size={24}
                  color="#6B7280"
                />
                <Text style={styles.uploadText}>
                  <Text style={styles.uploadLink}>Click to upload</Text> or drag
                  and drop
                </Text>
                <Text style={styles.uploadSubtext}>
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </Text>
              </TouchableOpacity>

              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 30, height: 40 }}
                />
              )}

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Note</Text>
                <TextInput
                  style={styles.noteInput}
                  value={note}
                  onChangeText={(text) => {
                    setNote(text);
                    setErrors((prev) => ({ ...prev, note: undefined }));
                  }}
                  placeholder="Give a description"
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
                {errors.note && (
                  <Text style={styles.errorText}>{errors.note}</Text>
                )}
              </View>
            </View>

            <View style={styles.buttonSection}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleCreate}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <CategoryModal
          onSelect={handleCategorySelect}
          bottomSheetRef={bottomSheetRef}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    fontFamily: "Lato_700Bold",
  },
  amountSection: {
    backgroundColor: "#1F2937",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
  },
  amountLabel: {
    color: "#D1D5DB",
    fontSize: 16,
    marginBottom: 15,
    fontFamily: "Lato_700Bold",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  currencySymbol: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginRight: 10,
    fontFamily: "Lato_700Bold",
  },
  amountInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Lato_700Bold",
  },
  formSection: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 8,
    fontFamily: "Lato_400Regular",
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
  },
  dropdownText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Lato_400Regular",
  },
  placeholder: {
    color: "#9CA3AF",
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
  },
  dateTextInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    fontFamily: "Lato_400Regular",
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: "#D1D5DB",
    borderStyle: "dashed",
    borderRadius: 12,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#FAFAFA",
  },
  uploadText: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
    textAlign: "center",
    fontFamily: "Lato_400Regular",
  },
  uploadLink: {
    color: "#4F46E5",
  },
  uploadSubtext: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 4,
    textAlign: "center",
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#FFFFFF",
    minHeight: 100,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
    fontFamily: "Lato_400Regular",
  },
  buttonSection: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6B7280",
    fontFamily: "Lato_400Regular",
  },
  continueButton: {
    flex: 1,
    backgroundColor: "#4F46E5",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
});

export default AddExpenseScreen;
