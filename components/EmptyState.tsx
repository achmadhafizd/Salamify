import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

interface titleProps {
  title: string;
  subtitle: string;
  buttonTitle?: string;
  handlePress?: () => void;
}
const EmptyState = ({ title, subtitle, buttonTitle, handlePress }: titleProps) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-white font-psemibold text-xl text-center">
        {title}
      </Text>
      <Text className="text-gray-100 font-sm font-pmedium">{subtitle}</Text>
      <CustomButton
        title={buttonTitle}
        handlePress={handlePress}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
