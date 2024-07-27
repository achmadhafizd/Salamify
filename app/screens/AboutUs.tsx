import { View, Text, ScrollView, Image } from "react-native";
import * as React from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import { getPostById } from "@/lib/appwrite";
import InfoBox from "@/components/InfoBox";
import { images } from "@/constants";

const AboutUs = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className={`px-4 my-6 mt-10`}>
        <Appbar.Header className="bg-primary items-center">
          <Appbar.BackAction
            className="bg-secondary"
            onPress={() => navigation.goBack()}
          />
          <Text className="text-2xl text-white font-psemibold ml-2">
            About Us
          </Text>
        </Appbar.Header>
        <View className="my-6 pt-5 w-full border-2 border-secondary-100 rounded-2xl">
          <View className="px-5">
            <Image
              source={images.salamify}
              className="w-full h-[250px] rounded-2xl mt-2 mb-2"
              resizeMode="cover"
            />
          </View>
          <InfoBox title="Salamify" titleStyles="text-3xl" />
            <InfoBox
              containerStyles="mt-1"
              title="Salamify adalah aplikasi inovatif untuk mempermudah pengelolaan masjid. Kami menyediakan alat digital yang efisien
            dan efektifuntuk membantu pengurus masjid dan jamaah."
              titleStyles="text-justify text-base font-normal font-mono px-2"
            />
            <InfoBox
              containerStyles="mb-4"
              title="Misi Kami"
              titleStyles="text-lg text-left pl-8 "
              subtitle="Misi kami adalah menyederhanakan pengelolaan masjid dengan teknologi yang mudah digunakan, sehingga masjid dapat fokus pada pelayanan dan meningkatkan kualitas ibadah."
              subtitleStyles="text-white text-justify text-base font-normal font-mono px-2"
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUs;
