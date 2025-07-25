import CategoryModal from "@/components/CategoryModal";
import { useTransaction } from "@/redux/hooks";
import { Transaction } from "@/redux/transactionSlice";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import "dayjs/locale/es"; // load on demand
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useRef, useState } from "react";
import {
  Button,
  Image,
  Modal,
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
import { Category } from "../../redux/categorySlice";
import { generateTransactionID } from "../../services/functions";

const AddExpenseScreen = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState("");
  const [image, setImage] = useState<string | undefined>(undefined);
  const [showPicker, setShowPicker] = useState(false);
  const [errors, setErrors] = useState<{
    amount?: string;
    category?: string;
    note?: string;
  }>({});

  const formattedDate = dayjs(date).format("DD/MM/YYYY");
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { addTransaction } = useTransaction();

  const onChange = (event: any, selectedDate: any) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleOpenPress = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setErrors((prev) => ({ ...prev, category: undefined }));
    bottomSheetRef.current?.close();
  };

  const clearData = () => {
    setAmount("");
    setSelectedCategory(null);
    setDate(new Date());
    setNote("");
    setImage(undefined);
    setErrors({});
  };

  const handleCancel = () => {
    clearData();
    navigation.goBack();
  };

  const handleCreate = () => {
    const validationErrors: typeof errors = {};

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      validationErrors.amount = "Please enter a valid amount";
    }

    if (!selectedCategory) {
      validationErrors.category = "Category is required";
    }

    if (!note.trim()) {
      validationErrors.note = "Note is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newTransaction: Transaction = {
      id: generateTransactionID(),
      amount: Number(amount),
      category: selectedCategory?.name,
      date: dayjs(date).format("ddd, D MMM"),
      color: selectedCategory?.color,
      icon: selectedCategory?.icon,
      note,
      imageUrl: image,
    };

    addTransaction(newTransaction);
    handleCancel();
  };

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1, width: "100%" }}>
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

            {Platform.OS === "android" && showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}

            {Platform.OS === "ios" && (
              <Modal
                animationType="slide"
                transparent={true}
                visible={showPicker}
                onRequestClose={() => setShowPicker(false)}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="spinner"
                      onChange={(event, selectedDate) => {
                        setDate(selectedDate || date);
                      }}
                    />
                    <Button title="Done" onPress={() => setShowPicker(false)} />
                  </View>
                </View>
              </Modal>
            )}

            <TouchableOpacity style={styles.uploadArea} onPress={pickImage}>
              <Ionicons name="cloud-upload-outline" size={24} color="#6B7280" />
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
