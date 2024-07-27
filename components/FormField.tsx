import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

type FormFieldProps = {
  title?: string;
  value?: any;
  placeholder?: string;
  handleChangeText?: any;
  otherStyles?: string;
  TextStyles?: string;
  keyboardType?: string;
  multiLine?: boolean;
  nOfLines?: number;
};
const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  TextStyles,
  keyboardType,
  multiLine,
  nOfLines,
}: FormFieldProps) => {
  const [showPassword, setshowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-gray-100 text-base font-pmedium">{title}</Text>
      <View
        className={`border-2 border-black-200 min-w-full bg-black-100
       h-16 px-4 items-center rounded-2xl focus:border-secondary-200 flex-row items ${TextStyles}`}
      >
        <TextInput
          className={`flex-1 text-white font-psemibold text-base `}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          multiline={multiLine}
          numberOfLines={nOfLines}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardType}
        />
        {title === "Password" ||
          title === "Confirm New Password" ||
          title === "New Password" ||
          (title === "Old Password" && (
            <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
              <Image
                source={!showPassword ? icons.eye : icons.eyeHide}
                className="w-7 h-7"
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

export default FormField;
