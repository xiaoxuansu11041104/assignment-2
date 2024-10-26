import { StyleSheet, TextInput, View, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { themes } from "../StyleHelper";

export default function DatePicker({ value, onChange, style }) {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [displayDate, setDisplayDate] = useState(value);  // Initialize with the passed value

  useEffect(() => {
    // Whenever `value` changes (e.g., from Firestore data), update `displayDate`
    if (value) {
      setDisplayDate(value);
    }
  }, [value]);

  const onChangeInternal = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDisplayDate(selectedDate);
      onChange(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const formatDate = (date) => {
    return date ? date.toDateString() : "";
  };

  return (
    <View>
      <TextInput
        style={[styles.DateInput, style]}
        value={formatDate(displayDate)}
        onPressIn={showDatepicker} 
        editable={false}  // Make sure the user can't manually edit the date input
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={displayDate || new Date()}
          mode={mode}
          is24Hour={true}
          display={Platform.OS === "ios" ? "inline" : "default"}  // Platform-specific display
          onChange={onChangeInternal}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  DateInput: {
    borderWidth: themes.borderwidth,
    borderRadius: themes.borderradius,
    borderColor: themes.light.primary,
    backgroundColor: themes.light.inputbackground,
    fontSize: themes.fontsize.input,
    color: themes.light.primary,
    padding: themes.paddingstyle.text,
  },
});
