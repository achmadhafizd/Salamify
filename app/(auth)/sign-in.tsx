import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);

    try {
      await signIn({ email: form.email, password: form.password });
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);
      Alert.alert("Success", "User signed in successfully");
      router.replace("/masjid");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.bigSalamify}
            resizeMode="contain"
            className="w-[200px] h-[200px]"
          />
          <Text className="text-2xl text-white text-semibold mb-5 font-psemibold">
            Log in to Salamify
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: any) => setForm({ ...form, email: e })}
            otherStyles="mt-5"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyles="mt-5"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles={"mt-9"}
            isLoading={isSubmitting}
          />

          <View className="flex-row justify-center items-center pt-5">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account? {""}
              <Link
                href={"/sign-up"}
                className="text-secondary-200 font-psemibold text-lg"
              >
                Sign Up
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
