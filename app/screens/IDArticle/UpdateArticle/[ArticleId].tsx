import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { updateArticleId } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useNavigation } from "@react-navigation/native";

const UpdateArticle = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();
  const [form, setForm] = useState({
    title: "",
    vimages: null,
    thumbnail: null,
    body: "",
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
        setForm({ ...form, thumbnail: result.assets[0] });
      }
    }
  };
  const openPickerVimages = async ({ selectType }: any) => {
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
        setForm({ ...form, vimages: result.assets[0] });
      }
    }
  };

  const submit = async () => {
    if (!form.title || form.thumbnail || form.body) {
      return Alert.alert("Please fill the fields");
    }
    setUploading(true);
    try {
      await updateArticleId({
        ...form,
        userId: user.$id,
      });
      Alert.alert("Success", "Article update successfully");
      router.push("/masjid");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        vimages: null,
        thumbnail: null,
        body: "",
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className={`px-4 my-6 mt-10`}>
        <Appbar.Header className="bg-primary items-center">
          <Appbar.BackAction
            className="bg-secondary"
            onPress={() => navigation.goBack()}
          />
          <Text className="text-2xl text-white font-psemibold ml-">
            Upload Article
          </Text>
        </Appbar.Header>
        <FormField
          title="Article Title"
          value={form.title}
          placeholder="Give your article a title"
          handleChangeText={(e: any) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2 ">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload video or image
          </Text>
          <TouchableOpacity onPress={() => openPickerVimages("image")}>
            {form.vimages ? (
              <Image
                source={{ uri: form.vimages.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image source={icons.upload} className="w-1/2 h-1/2" />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail image
          </Text>
          <TouchableOpacity onPress={() => openPickerThumbnail("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
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
        <FormField
          title="Article Content"
          value={form.body}
          placeholder="Give your article a body"
          handleChangeText={(e: any) => setForm({ ...form, body: e })}
          otherStyles="mt-10"
          TextStyles="h-40"
        />

        <CustomButton
          title="Upload Article"
          handlePress={submit}
          containerStyles="my-10"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateArticle;
