import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import { useLocalSearchParams, useNavigation } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { icons } from "@/constants";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { createContentImage, updateContent } from "@/lib/appwrite";

const AddContentImage = () => {
  const { user } = useGlobalContext();
  const { ContentImageId } = useLocalSearchParams();
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();
  const [form, setForm] = React.useState({
    content: null,
  });

  const openPickerThumbnail = async ({ selectType }: any) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, content: result.assets[0] });
      }
    }
  };

  const submit = async () => {
    if (!form.content) {
      return Alert.alert("Please fill the contents");
    }
    setUploading(true);
    try {
      if (ContentImageId === undefined || ContentImageId === "") {
        await createContentImage({
          ...form,
          userId: user["$id"],
        });
        Alert.alert("Success", "Content created successfully");
      } else {
        await updateContent(
          {
            ...form,
            userId: user["$id"],
          },
          ContentImageId
        );
        Alert.alert("Success", "Content update successfully");
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
          Tambahkan Konten
        </Text>
      </Appbar.Header>

      <View>
        {/* PERLU WAKTU */}
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Image</Text>
          <TouchableOpacity onPress={() => openPickerThumbnail("image")}>
            {form.content ? (
              <Image
                source={{ uri: form.content.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View
                className="w-full h-40 px-4 bg-black-100
            border-2 border-black-200 flex-row space-x-2
            rounded-2xl justify-center items-center"
              >
                <Image source={icons.upload} className="w-12 h-12" />
                <Text className="text-sm text-gray-100 font-pmedium ml-4">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
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

export default AddContentImage;
