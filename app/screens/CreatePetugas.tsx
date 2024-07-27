import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { addStaff } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Appbar } from "react-native-paper";
import CustomDropdown from "@/components/CustomDropdown";
import { useNavigation } from "@react-navigation/native";
import InputNumber from "@/components/InputNumber";

const CreatePetugas = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();
  const [form, setForm] = useState({
    fullName: "",
    photoProfile: null,
    phoneNumber: "",
    role: "",
  });

  const data = [
    { key: "1", value: "Supervisor" },
    { key: "2", value: "Ustadz" },
  ];

  const openPickerProfile = async ({ selectType }: any) => {
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
        setForm({ ...form, photoProfile: result.assets[0] });
      }
    }
  };

  const submit = async () => {
    if (!form.fullName || !form.phoneNumber) {
      return Alert.alert("Please fill the fields");
    }
    setUploading(true);
    try {
      await addStaff({
        ...form,
        userId: user.$id,
      });
      Alert.alert("Success", "Staff added successfully");
      router.push("/ustadz");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        fullName: "",
        photoProfile: null,
        phoneNumber: "",
        role: "",
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
            Add Staff
          </Text>
        </Appbar.Header>
        <FormField
          title="Full Name"
          value={form.fullName}
          placeholder="John Doe"
          handleChangeText={(e: any) => setForm({ ...form, fullName: e })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2 ">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload photo profile
          </Text>
          <TouchableOpacity onPress={() => openPickerProfile("image")}>
            {form.photoProfile ? (
              <Image
                source={{ uri: form.photoProfile.uri }}
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

        <InputNumber
          title="Phone Number"
          value={form.phoneNumber}
          placeholder="0858 9999 9999"
          handleChangeText={(e: any) => setForm({ ...form, phoneNumber: e })}
          otherStyles="mt-10"
        />

        <View className="mt-8">
          <Text className="text-gray-100 text-base font-pmedium mb-2">
            Select Role
          </Text>
          <CustomDropdown
            data={data}
            setSelectedValue={(selectedvalue: any) =>
              setForm({ ...form, role: selectedvalue })
            }
          />
        </View>

        <CustomButton
          title="Upload Staff"
          handlePress={submit}
          containerStyles="my-10"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePetugas;
