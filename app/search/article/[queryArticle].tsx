import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import useAppWrite from "../../../lib/useAppWrite";
import { deleteArticleId, getArticleQuery } from "@/lib/appwrite";
import ArticleCards from "@/components/ArticleCards";
import { router, useLocalSearchParams } from "expo-router";
import SearchInput from "@/components/SearchInput";

const ArticleSearch = () => {
  const { queryArticle } = useLocalSearchParams();
  const { data: posts, refetch } = useAppWrite(() =>
    getArticleQuery(queryArticle)
  );

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteArticleId(id);

    } catch (error: any) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    refetch();
  }, [queryArticle]);

  return (
    <SafeAreaView className="bg-primary h-full mt-4">
      <FlatList
        className="px-2"
        data={posts}
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
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {queryArticle}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput
                  initialQuery={queryArticle}
                  refetch={refetch}
                  routeFolder="article"
                />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Article Found"
            subtitle="Be the first one to upload a article"
            buttonTitle="Upload Article"
            handlePress={() => router.push("/screens/CreateArticle")}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default ArticleSearch;
