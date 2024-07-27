import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import { router, useNavigation } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { account, updatePassword } from "@/lib/appwrite";

const ChangePassword = () => {
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setEmail(user.email);
      } catch (error) {
        Alert.alert(`Terjadi kesalahan: ${error}`);
      }
    };

    fetchUser();
  }, []);

  const submit = async () => {
    if (form.newPassword === "" || form.confirmNewPassword === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
    setUploading(true);
    try {
      await account.createEmailSession(email, form.oldPassword);
      await updatePassword({
        oldPassword: form.oldPassword,
        password: form.newPassword,
      });
      Alert.alert("Success", "Update Password Successfully");
      router.push("/masjid");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
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
          Change Password
        </Text>
      </Appbar.Header>

      <View className="mt-5">
        <FormField
          title="Old Password"
          value={form.oldPassword}
          handleChangeText={(e: any) => setForm({ ...form, oldPassword: e })}
          otherStyles="mt-5"
        />
        <FormField
          title="New Password"
          value={form.newPassword}
          handleChangeText={(e: any) => setForm({ ...form, newPassword: e })}
          otherStyles="mt-5"
        />
        <FormField
          title="Confirm New Password"
          value={form.confirmNewPassword}
          handleChangeText={(e: any) =>
            setForm({ ...form, confirmNewPassword: e })
          }
          otherStyles="mt-5"
        />
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

export default ChangePassword;
