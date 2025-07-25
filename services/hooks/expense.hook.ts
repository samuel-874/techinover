import { Category } from "@/redux/categorySlice";
import { useTransaction } from "@/redux/hooks";
import BottomSheet from "@gorhom/bottom-sheet";
import dayjs from "dayjs";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Platform } from "react-native";
import { Transaction } from "@/redux/transactionSlice";
import { generateTransactionID } from "../functions";

export const useExpense = () => {
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
    router.back();
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

  return {
    amount,
    setAmount,
    selectedCategory,
    date,
    note,
    image,
    setErrors,
    errors,
    handleOpenPress,
    setShowPicker,
    formattedDate,
    showPicker,
    onChange,
    setDate,
    pickImage,
    setNote,
    handleCategorySelect,
    bottomSheetRef,
    handleCreate,
    handleCancel,
  };
};
