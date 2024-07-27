import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import { router } from "expo-router";
import { useNavigation } from "expo-router";

const SettingsMenu = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className={`px-4 my-6 mt-10`}>
        <Appbar.Header className="bg-primary items-center">
          <Appbar.BackAction
            className="bg-secondary"
            onPress={() => navigation.goBack()}
          />
          <Text className="text-2xl text-white font-psemibold ml-">
            Settings
          </Text>
        </Appbar.Header>
        <View className="my-6">
          <View className="mb-4 pb-3 border-b border-secondary">
            <TouchableOpacity
              onPress={() => router.push("/screens/ChangeUsername")}
            >
              <Text className="text-xl text-white font-regular">
                Perbarui Username
              </Text>
            </TouchableOpacity>
          </View>
          <View className="mb-4 pb-3 border-b border-secondary">
            <TouchableOpacity
              onPress={() => router.push("/screens/ChangeEmail")}
            >
              <Text className="text-xl text-white font-regular">
                Perbarui Email
              </Text>
            </TouchableOpacity>
          </View>
          <View className="mb-4 pb-3 border-b border-secondary">
            <TouchableOpacity
              onPress={() => router.push("/screens/ChangePassword")}
            >
              <Text className="text-xl text-white font-regular">
                Perbarui Password
              </Text>
            </TouchableOpacity>
          </View>
          <View className="mb-4 pb-3 border-b border-secondary">
            <TouchableOpacity onPress={() => router.push("/screens/AboutUs")}>
              <Text className="text-xl text-white font-regular">About Us</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsMenu;
