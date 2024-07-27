import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import { useLocalSearchParams, useNavigation } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { icons } from "@/constants";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import {
  addTimer,
  createContentImage,
  updateContent,
  updateTimer,
} from "@/lib/appwrite";
import { useStore } from "zustand";
import store from "../../../../lib/store";

interface TimerIqamahProps {
  subuh?: string;
  dzuhur?: string;
  ashar?: string;
  maghrib?: string;
  isya?: string;
}

const TimerIqamah = () => {
  const { user } = useGlobalContext();
  const { TimerIqamahId } = useLocalSearchParams();
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();
  const getStore = useStore(store);

  const [form, setForm] = React.useState({
    subuh: getStore.countSubuh * 60,
    dzuhur: getStore.countDzuhur * 60,
    ashar: getStore.countAshar * 60,
    maghrib: getStore.countMaghrib * 60,
    isya: getStore.countIsya * 60,
  });

  useEffect(() => {
    setForm({
      subuh: getStore.countSubuh * 60,
      dzuhur: getStore.countDzuhur * 60,
      ashar: getStore.countAshar * 60,
      maghrib: getStore.countMaghrib * 60,
      isya: getStore.countIsya * 60,
    });
  }, [
    getStore.countSubuh,
    getStore.countDzuhur,
    getStore.countAshar,
    getStore.countMaghrib,
    getStore.countIsya,
  ]);

  const submit = async () => {
    if (
      !form.subuh ||
      !form.dzuhur ||
      !form.ashar ||
      !form.maghrib ||
      !form.isya
    ) {
      return Alert.alert("Please fill the contents");
    }
    setUploading(true);
    try {
      if (TimerIqamahId === undefined || TimerIqamahId === "") {
        await addTimer({
          ...form,
          userId: user["$id"],
        });
        Alert.alert("Success", "Set Timer successfully");
      } else {
        await updateTimer(
          {
            ...form,
            userId: user["$id"],
          },
          TimerIqamahId
        );
        Alert.alert("Success", "Set Timer update successfully");
      }
      router.push("/masjid");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <Appbar.Header className="bg-primary items-center">
        <Appbar.BackAction
          className="bg-secondary"
          onPress={() => navigation.goBack()}
        />
        <Text className="text-2xl text-white font-psemibold ml-">
          Set Timer Iqamah
        </Text>
      </Appbar.Header>

      <View>
        <View className="my-6 px-4 py-8 w-full border-2 border-secondary-100 rounded-2xl">
          <View className="flex flex-col">
            {/* Subuh */}
            <View className="flex flex-row justify-between items-center mb-2 pb-2">
              <Text className="text-xl font-psemibold text-white flex-1">
                Subuh
              </Text>
              <TouchableOpacity
                className="flex-1 items-center"
                onPress={getStore.decrementSubuh}
              >
                <Image
                  source={icons.minus}
                  resizeMode="contain"
                  tintColor={"white"}
                  className="w-8 h-8"
                />
              </TouchableOpacity>
              <Text className="text-xl font-pregular text-white flex-1 text-center ">
                {getStore.countSubuh}
              </Text>
              <TouchableOpacity
                className="flex-1 items-center"
                onPress={getStore.incrementSubuh}
              >
                <Image
                  source={icons.add}
                  resizeMode="contain"
                  tintColor={"white"}
                  className="w-8 h-8"
                />
              </TouchableOpacity>
            </View>

            {/* Dzuhur */}
            <View className="flex flex-row justify-between items-center mb-2 pb-2">
              <Text className="text-xl font-psemibold text-white flex-1">
                Dzuhur
              </Text>
              <TouchableOpacity
                className="flex-1 items-center"
                onPress={getStore.decrementDzuhur}
              >
                <Image
                  source={icons.minus}
                  resizeMode="contain"
                  tintColor={"white"}
                  className="w-8 h-8"
                />
              </TouchableOpacity>
              <Text className="text-xl font-pregular text-white flex-1 text-center">
                {getStore.countDzuhur}
              </Text>
              <TouchableOpacity
                className="flex-1 items-center"
                onPress={getStore.incrementDzuhur}
              >
                <Image
                  source={icons.add}
                  resizeMode="contain"
                  tintColor={"white"}
                  className="w-8 h-8"
                />
              </TouchableOpacity>
            </View>

            {/* Ashar */}
            <View className="flex flex-row justify-between items-center mb-2 pb-2">
              <Text className="text-xl font-psemibold text-white flex-1">
                Ashar
              </Text>
              <TouchableOpacity
                className="flex-1 items-center"
                onPress={getStore.decrementAshar}
              >
                <Image
                  source={icons.minus}
                  resizeMode="contain"
                  tintColor={"white"}
                  className="w-8 h-8"
                />
              </TouchableOpacity>
              <Text className="text-xl font-pregular text-white flex-1 text-center">
                {getStore.countAshar}
              </Text>
              <TouchableOpacity
                className="flex-1 items-center"
                onPress={getStore.incrementAshar}
              >
                <Image
                  source={icons.add}
                  resizeMode="contain"
                  tintColor={"white"}
                  className="w-8 h-8"
                />
              </TouchableOpacity>
            </View>

            {/* Maghrib */}
            <View className="flex flex-row justify-between items-center mb-2 pb-2">
              <Text className="text-xl font-psemibold text-white flex-1">
                Maghrib
              </Text>
              <TouchableOpacity
                className="flex-1 items-center"
                onPress={getStore.decrementMaghrib}
              >
                <Image
                  source={icons.minus}
                  resizeMode="contain"
                  tintColor={"white"}
                  className="w-8 h-8"
                />
              </TouchableOpacity>
              <Text className="text-xl font-pregular text-white flex-1 text-center">
                {getStore.countMaghrib}
              </Text>
              <TouchableOpacity
                className="flex-1 items-center"
                onPress={getStore.incrementMaghrib}
              >
                <Image
                  source={icons.add}
                  resizeMode="contain"
                  tintColor={"white"}
                  className="w-8 h-8"
                />
              </TouchableOpacity>
            </View>

            {/* Isya */}
            <View className="flex flex-row justify-between items-center ">
              <Text className="text-xl font-psemibold text-white flex-1">
                Isya
              </Text>
              <TouchableOpacity
                className="flex-1 items-center"
                onPress={getStore.decrementIsya}
              >
                <Image
                  source={icons.minus}
                  resizeMode="contain"
                  tintColor={"white"}
                  className="w-8 h-8"
                />
              </TouchableOpacity>
              <Text className="text-xl font-pregular text-white flex-1 text-center">
                {getStore.countIsya}
              </Text>
              <TouchableOpacity
                className="flex-1 items-center"
                onPress={getStore.incrementIsya}
              >
                <Image
                  source={icons.add}
                  resizeMode="contain"
                  tintColor={"white"}
                  className="w-8 h-8"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <CustomButton
          title="Simpan"
          handlePress={submit}
          containerStyles={"mt-16"}
          isLoading={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default TimerIqamah;
