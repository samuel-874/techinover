import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React from "react";
import { Button, Modal, Platform, StyleSheet, View } from "react-native";

interface CustomDatePickerProps {
  date: Date;
  showPicker: boolean;
  setShowPicker: (show: boolean) => void;
  setDate: (date: Date) => void;
  onChange: (event: DateTimePickerEvent, selectedDate?: Date) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  date,
  showPicker,
  setShowPicker,
  setDate,
  onChange,
}) => {
  if (Platform.OS === "android" && showPicker) {
    return (
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={onChange}
      />
    );
  }

  if (Platform.OS === "ios") {
    return (
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
    );
  }

  return null;
};

export default CustomDatePicker;

const styles = StyleSheet.create({
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
