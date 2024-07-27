import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { images } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";

const Index = () => {
  const { isLoading, isLogged } = useGlobalContext();
  if (!isLoading && isLogged) return <Redirect href="/masjid" />;

  return (
    <SafeAreaView className="bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className=" w-full items-center min-h-[85vh] justify-center ">
          <Image
            source={images.bigSalamify}
            className="w-[200px] h-[200px]"
            resizeMode="contain"
          />
          <Image
            source={images.cardsSalamify}
            className="w-max-[310px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-white text-4xl font-bold text-center">
            Your Mosque, Your Community, One App{" "}
              <Text className="text-secondary-200">Salamify</Text>
            </Text>
            <Image
              source={images.path}
              className="absolute top-[110px] left-[121px] w-[100px] h-[20px]"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm text-gray-100 font-pmedium mt-7 text-center">
          Where Tradition Meets Innovation: Experience the Future of Mosque Management with Salamify
          </Text>

          <CustomButton
            title="Continue With Email"
            handlePress={() => router.push("/(auth)/sign-in")}
            containerStyles="mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
};

export default Index;
