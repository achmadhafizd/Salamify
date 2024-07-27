import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import ScreenTV from "@/components/ScreenTV";
import EmptyState from "@/components/EmptyState";
import useAppWrite from "../../lib/useAppWrite";
import {
  deleteArticleId,
  getContent,
  getLatestPosts,
  getMarquee,
  getMasjid,
  getTimer,
} from "@/lib/appwrite";
import ArticleCards from "@/components/ArticleCards";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { getCityId } from "@/lib/city";

const MasjidTabs = () => {
  const { data: posts, refetch, isLoading } = useAppWrite(getLatestPosts);
  const { data: RunText } = useAppWrite(getMarquee);
  const { data: mosque } = useAppWrite(getMasjid);
  const { data: contentImage } = useAppWrite(getContent);
  const { data: timer } = useAppWrite(getTimer);
  const [refreshing, setRefreshing] = useState(false);
  const [CityId, setCityId] = useState(null);
  const masjidId = mosque[0]?.$id;
  const marqueeId = RunText[0]?.$id;
  const contentId = contentImage[0]?.$id;
  const timerId = timer[0]?.id;

  useEffect(() => {
    const fetchCityId = async () => {
      if (mosque[0]?.city) {
        try {
          const id = await getCityId(mosque[0]?.city);
          setCityId(id);
        } catch (err) {
          setCityId(null);
        }
      }
    };
    fetchCityId();
  }, [mosque[0]?.city]);

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

  const handleMasjidPress = (id: any | undefined) => {
    router.push(`/screens/IDMasjid/MasjidName/${id || ""}`);
  };
  const handleMarqueePress = (id: string | undefined) => {
    router.push(`/screens/IDMasjid/EditRunText/${id || ""}`);
  };
  const handleContentPress = (id: string | undefined) => {
    router.push(`/screens/IDMasjid/AddContentImage/${id || ""}`);
  };
  const handleTimerPress = (id: string | undefined) => {
    router.push(`/screens/IDMasjid/TimerIqamah/${id || ""}`);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
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
            handleUpdate={() => handleUpdate(item.$id)}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 mt-10 px-4 space-y-6">
            <View className="justify-between items-center flex-row mb-6">
              <View className="mt-2">
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back to
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Salamify
                </Text>
              </View>
              <View className="mt-1.5 ">
                <Image
                  source={images.salamify}
                  className="w-20 h-20"
                  resizeMode="contain"
                />
              </View>
            </View>
            <ScreenTV
              masjidName={isLoading ? "Loading..." : mosque[0]?.masjid}
              masjidCity={isLoading ? "Loading..." : mosque[0]?.city}
              textMotion={isLoading ? "Loading..." : RunText[0]?.marquee}
              vimagesContent={isLoading ? "Loading..." : images.quotes}
              idCity={CityId}
            />

            {/* <View className="w-full flex-1 pt-5 pb-5">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Article
              </Text>
              <Article posts={posts ?? []} />
            </View> */}
          </View>
        )}
        ListFooterComponent={() => (
          <View className="w-full">
            <View className="mb-5">
              <CustomButton
                containerStyles="w-full items-center justify-center"
                title="Edit Nama Masjid"
                handlePress={() => handleMasjidPress(masjidId)}
              />
            </View>
            <View className="flex-row justify-between">
              <CustomButton
                containerStyles="w-[135px] items-center justify-center"
                title="Edit Teks Berjalan"
                handlePress={() => handleMarqueePress(marqueeId)}
              />
              <CustomButton
                containerStyles="w-[135px] items-center justify-center"
                title="Tambah konten"
                handlePress={() => handleContentPress(contentId)}
              />
              <CustomButton
                containerStyles="w-[135px] items-center justify-center"
                title="Set Timer Iqamah"
                handlePress={() => handleTimerPress(timerId)}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Article Found"
            subtitle="Be the first one to upload a article"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default MasjidTabs;
