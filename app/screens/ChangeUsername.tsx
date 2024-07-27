import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import { router, useNavigation } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { account, updateName, updatePassword } from "@/lib/appwrite";

const ChangePassword = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();
  const [name, setName] = useState("");

  const handleChangeUsername = async () => {
    try {
      await updateName({
        name: name,
        id: user.$id,
      });
      Alert.alert("Username berhasil diubah");
    } catch (error) {
      Alert.alert(`Terjadi kesalahan: ${error}`);
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
          Change Username
        </Text>
      </Appbar.Header>

      <View className="mt-5">
        <FormField
          title="New Username"
          value={name}
          handleChangeText={(e: any) => setName(e)}
          otherStyles="mt-5"
        />
        <CustomButton
          title="Simpan"
          handlePress={handleChangeUsername}
          containerStyles={"mt-16"}
          isLoading={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
