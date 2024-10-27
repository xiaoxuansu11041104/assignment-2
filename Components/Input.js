import { StyleSheet, TextInput, Platform } from "react-native";
import React from "react";
import { themes } from "../StyleHelper";

export default function Input({
  value,
  onChangeText,
  style,
  keyboardType = "default",
  ...props // Any other props
}) {
  return (
    <TextInput
      style={[styles.input, style]}
      autoFocus={false}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    textAlignVertical: Platform.OS === "android" ? "center" : "top", 
    marginBottom: themes.marginstyle.primary,
    borderWidth: themes.borderwidth,
    borderRadius: themes.borderradius,
    borderColor: themes.light.primary,
    backgroundColor: themes.light.inputbackground,
    fontSize: themes.fontsize.input,
    color: themes.light.primary,
    paddingHorizontal: themes.paddingstyle.text,
    paddingVertical: Platform.OS === "android" ? 8 : themes.paddingstyle.text, 
    height: 45, 
  },
});
