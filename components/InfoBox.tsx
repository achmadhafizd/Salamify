import { View, Text } from "react-native";
import React from "react";

interface InfoBoxProps {
  title?: any;
  subtitle?: string;
  containerStyles?: string;
  titleStyles?: string;
  subtitleStyles?: string;
}

const InfoBox = ({
  title,
  subtitle,
  containerStyles,
  titleStyles,
  subtitleStyles,
}: InfoBoxProps) => {
  return (
    <View className={containerStyles}>
      <Text
        className={`text-white font- text-center font-psemibold ${titleStyles}`}
      >
        {title}
      </Text>
      <Text
        className={`text-sm  text-gray-100 text-center font-pregular ${subtitleStyles}`}
      >
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
