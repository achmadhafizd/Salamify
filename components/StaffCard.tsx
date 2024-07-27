import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";
import { icons } from "../constants";

interface StaffCardProps {
  fullName: string;
  photoProfile: any;
  phoneNumber: string;
  role?: string;
  creator?: string;
  avatar?: string;
  handleUpdate?: () => void;
  handleDelete?: () => void;
}

const StaffCard = ({
  fullName,
  phoneNumber,
  photoProfile,
  role,
  creator,
  avatar,
  handleUpdate,
  handleDelete
}: StaffCardProps) => {
  return (
    <View className="flex flex-col justify-between w-full items-center px-4 mt-4 mb-8">
      <View className="flex flex-row gap-3 items-start ">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[50px] h-[50px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: photoProfile }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-base text-white"
              numberOfLines={1}
            >
              {fullName}
            </Text>
            <Text
              className="text-sm text-gray-100 font-pregular mb-1"
              numberOfLines={1}
            >
              Phone Number : {phoneNumber}
            </Text>
            <Text
              className="text-sm text-gray-100 font-pregular border-2 border-secondary-200 text-center rounded-full bg-black-200"
              numberOfLines={1}
            >
              {role}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Menu>
            <MenuTrigger>
              <Image
                source={icons.menu}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={handleUpdate} text="Update" />
              <MenuOption onSelect={handleDelete} text="Delete" />
            </MenuOptions>
          </Menu>
          
        </View>
      </View>
    </View>
  );
};

export default StaffCard;