import { Text, View, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import useAppWrite from "@/lib/useAppWrite";
import {
  deleteArticleId,
  deleteQurbanId,
  getAllPosts,
  getAllQurbans,
} from "@/lib/appwrite";
import QurbanCard from "@/components/QurbanCard";
import { router } from "expo-router";
import SearchInput from "@/components/SearchInput";
import ArticleCards from "@/components/ArticleCards";

const Article = () => {
  const { data: allPosts, refetch } = useAppWrite(getAllPosts);
  const [refreshing, setRefreshing] = useState(false);

  const handleUpdate = (id: string) => {
    router.push(`/screens/IDArticle/UpdateArticle/${id}`);
    console.error();
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteArticleId(id);

    } catch (error: any) {
      throw new Error(error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="h-full bg-primary px-4 py-16">
      <FlatList
        data={allPosts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => (
          <ArticleCards
            id={item.$id}
            title={item.title}
            thumbnail={item.thumbnail}
            vimages={item.vimages}
            creator={item.creator.username}
            avatar={item.creator.avatar}
            body={item.body}
            handleDelete={() => handleDelete(item.$id)}
            handleUpdate={() => handleUpdate(item.$id)}
          />
        )}
        ListHeaderComponent={() => (
          <View>
            <Text className="text-2xl text-white font-psemibold ">
              Artikel Masjid
            </Text>
            <View className="my-6">
              <SearchInput placeholder="Cari Artikel" routeFolder="article" />
            </View>
            <CustomButton
              containerStyles="w-full my-5"
              title="Tambah Artikel"
              handlePress={() => router.push("/screens/CreateArticle")}
            />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Article;
