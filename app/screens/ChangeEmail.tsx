import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import { router, useNavigation } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { account, updateEmail } from "@/lib/appwrite";

const ChangeEmail = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [form, setForm] = useState({
    password: "",
    newEmail: "",
    confirmNewEmail: "",
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
    if (form.newEmail === "" || form.confirmNewEmail === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
    setUploading(true);
    try {
      await account.createEmailSession(email, form.password);
      await updateEmail({
        newEmail: form.newEmail,
        password: form.password,
        id: user.$id,
      });
      Alert.alert("Success", "Update Email successfully");
      router.push("/masjid");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        password: "",
        newEmail: "",
        confirmNewEmail: "",
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
          Change Email
        </Text>
      </Appbar.Header>

      <View className="mt-5">
        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e: any) => setForm({ ...form, password: e })}
          otherStyles="mt-5"
        />
        <FormField
          title="New Email"
          value={form.newEmail}
          handleChangeText={(e: any) => setForm({ ...form, newEmail: e })}
          otherStyles="mt-5"
          keyboardType="email-address"
        />
        <FormField
          title="Confirm New Email"
          value={form.confirmNewEmail}
          handleChangeText={(e: any) =>
            setForm({ ...form, confirmNewEmail: e })
          }
          otherStyles="mt-5"
          keyboardType="email-address"
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

export default ChangeEmail;
