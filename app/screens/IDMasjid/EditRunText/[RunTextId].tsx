import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { createMarquee, updateMarquee } from "@/lib/appwrite";

const EditRunText = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const { RunTextId } = useLocalSearchParams();
  const navigation = useNavigation();
  const [form, setForm] = React.useState({
    marquee: "",
  });

  const submit = async () => {
    if (form.marquee === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
    setUploading(true);
    try {
      if (RunTextId === undefined || RunTextId === "") {
        await createMarquee({
          ...form,
          userId: user["$id"],
        });
        Alert.alert("Success", "Marquee added successfully");
      } else {
        await updateMarquee(
          {
            ...form,
            userId: user["$id"],
          },
          RunTextId
        );
        Alert.alert("Success", "Marquee update successfully");
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
          Edit Teks Berjalan
        </Text>
      </Appbar.Header>

      <View>
        <FormField
          value={form.marquee}
          placeholder="Berikan Teks Berjalan"
          handleChangeText={(e: any) => setForm({ ...form, marquee: e })}
          otherStyles="mt-10"
          multiLine={true}
          nOfLines={5}
          TextStyles="h-48"
        />
        <CustomButton
          title="Simpan"
          handlePress={submit}
          containerStyles={"mt-16"}
          isLoading={uploading}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditRunText;
