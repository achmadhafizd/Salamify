import * as React from "react";
import { View, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import { deleteArticleId, getUsersPosts, signOut } from "@/lib/appwrite";
import useAppWrite from "@/lib/useAppWrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import ArticleCards from "@/components/ArticleCards";
import { icons } from "@/constants";
import InfoBox from "@/components/InfoBox";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { Feather } from "@expo/vector-icons";
import FormField from "@/components/FormField";
import SearchInput from "@/components/SearchInput";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts, refetch } = useAppWrite(() => getUsersPosts(user.$id));
  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    router.replace("/sign-in");
  };

  const handleSettings = () => {
    router.push("/settings-menu");
  };

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

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
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
          <View className="w-full justify-center items-center my-12 px-4 ">
            <TouchableOpacity
              className="w-full flex-row justify-between mb-8"
              onPress={logout}
            >
              <TouchableOpacity onPress={handleSettings}>
                <Image source={icons.settings} className="w-7 h-7 " />
              </TouchableOpacity>
              <Image
                source={icons.logout}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />
            <View className="mt-5 flex-row items-center justify-center ml-10">
              <InfoBox
                title={posts.length || 0}
                subtitle="Articles"
                containerStyles="mr-10"
                titleStyles="text-xl"
              />
            </View>
            <View className="my-8 mb-24 justify-start w-full h-[40px]">
              <View className="w-full mb-6">
                <SearchInput
                  placeholder="Search Article"
                  routeFolder="article"
                />
              </View>
              <CustomButton
                title="Create Article"
                handlePress={() => router.push("/screens/CreateArticle")}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Article Found"
            subtitle="No Article found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
