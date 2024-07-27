import { View, Text, ScrollView, Image } from "react-native";
import * as React from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import { getPostById } from "@/lib/appwrite";
import InfoBox from "@/components/InfoBox";

const DetailsArticle = () => {
  const navigation = useNavigation();
  const { DetailsArticleId } = useLocalSearchParams<{
    DetailsArticleId: any;
  }>();
  const [articleDetails, setArticleDetails] = React.useState(null);

  React.useEffect(() => {
    if (DetailsArticleId) {
      const fetchArticleDetails = async () => {
        try {
          const data = await getPostById(DetailsArticleId);
          setArticleDetails(data);
        } catch (error) {
          console.error("Error fetching article details: ", error);
        }
      };
      fetchArticleDetails();
    }
  }, [DetailsArticleId]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className={`px-4 my-6 mt-10`}>
        <Appbar.Header className="bg-primary items-center">
          <Appbar.BackAction
            className="bg-secondary"
            onPress={() => navigation.goBack()}
          />
          <Text className="text-2xl text-white font-psemibold ml-2">
            Details Article
          </Text>
        </Appbar.Header>
        <View className="my-6 pt-5 w-full border-2 border-secondary-100 rounded-2xl">
          <InfoBox
            title={articleDetails?.title}
            titleStyles="text-3xl"
            subtitle={articleDetails?.creator.username}
          />
          <View className="px-5">
            <Image
              source={{ uri: articleDetails?.thumbnail }}
              className="w-full h-[250px] rounded-2xl mt-3"
              resizeMode="cover"
            />
          </View>
          <InfoBox
            containerStyles="mt-10"
            title={articleDetails?.body}
            titleStyles="text-justify text-base font-normal font-mono px-2"
            subtitleStyles="text-white"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsArticle;
