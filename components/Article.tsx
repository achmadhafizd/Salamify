import {
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  Text,
} from "react-native";
import * as React from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

interface ArticleProps {
  posts: any;
}
interface TrendingProps {
  activeItem: any;
  item: any;
  id?: any;
}

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item, id }: TrendingProps) => {
  return (
    <Animatable.View
      className="mx-6"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      <TouchableOpacity
        className="relative justify-center items-center"
        activeOpacity={0.7}
        onPress={() => router.push(`/screens/IDArticle/${id}`)}
      >
        <ImageBackground
          source={{ uri: item.thumbnail }}
          className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
          resizeMode="cover"
        />
        <Text className="text-white text-center font-psemibold">
          {item.title}
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};
const Article = ({ posts }: ArticleProps) => {
  const [activeItem, setActiveItem] = React.useState(posts[0]);
  const viewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length) {
      setActiveItem(viewableItems[0].key);
    }
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} id={item.$id} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
};

export default Article;
