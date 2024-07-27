import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { icons } from "../constants";
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";
import { router } from "expo-router";

interface ArticleProps {
  id?: string;
  title: any;
  thumbnail: string;
  vimages: any;
  body: string;
  creator: string;
  avatar: string;
  handleUpdate?: () => void;
  handleDelete?: () => void;
  handleDetails?: () => void;
}
const ArticleCards = ({
  title,
  thumbnail,
  vimages,
  creator,
  avatar,
  handleDelete,
  handleUpdate,
  handleDetails,
  id,
}: ArticleProps) => {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (play) {
      router.push(`/screens/IDArticle/DetailsArticle/${id}`);
      setPlay(false);
    }
  }, [play]);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gapy-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text className="text-xs text-gray-100 font-pregular">
              {creator}
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
      <TouchableOpacity
        activeOpacity={0.7}
        className="w-full h-60 rounded-xl mt-3 relative justiy-center items-center"
        onPress={() => setPlay(true)}
      >
        <Image
          source={{ uri: thumbnail }}
          className="w-full h-full rounded-2xl mt-3"
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ArticleCards;
