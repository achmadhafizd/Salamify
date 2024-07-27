import { TouchableOpacity, Text } from "react-native";
import React from "react";

type CustomButtonProps = {
  title?: string;
  handlePress?: any;
  containerStyles?: any;
  textStyles?: any;
  isLoading?: boolean;
};
const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary w-full rounded-xl min-h-[62px] items-center justify-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text
        className={`${textStyles}"text-primary font-psemibold text-lg px-5`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
