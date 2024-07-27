import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

type InputNumberProps = {
  title?: string;
  value?: any;
  placeholder?: string;
  handleChangeText?: any;
  otherStyles?: string;
  TextStyles?: string;
};
const InputNumber = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  TextStyles,
}: InputNumberProps) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-gray-100 text-base font-pmedium">{title}</Text>
      <View
        className={`border-2 border-black-200 min-w-full bg-black-100
       h-16 px-4 items-center rounded-2xl focus:border-secondary-200 flex-row ${TextStyles}`}
      >
        <TextInput
          className={`flex-1 text-white font-psemibold text-base `}
          value={value}
          keyboardType="numeric"
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          defaultValue="0"
        />
        
      </View>
    </View>
  );
};

export default InputNumber;
