import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { addMasjid, getMasjid, updateMasjid } from "@/lib/appwrite";
import useAppWrite from "@/lib/useAppWrite";
import { getCityId } from "@/lib/city";

const EditRunText = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();
  const { MasjidNameId } = useLocalSearchParams();
  const [form, setForm] = React.useState({
    masjid: "",
    city: "",
  });

  const { data: mosque } = useAppWrite(getMasjid);
  useEffect(() => {
    if (MasjidNameId && mosque) {
      if (MasjidNameId.length > 36) {
        Alert.alert("Error", "Invalid Masjid ID");
        return;
      }

      const fetchData = () => {
        try {
          const mosqueData = mosque.find((m) => m.$id === MasjidNameId);
          if (mosqueData) {
            setForm({
              masjid: mosqueData?.masjid,
              city: mosqueData?.city,
            });
          }
          if (mosqueData === null) {
            Alert.alert("Error", "Masjid not found");
          }
        } catch (error) {
          Alert.alert("Error", "Failed to fetch data");
        }
      };
      fetchData();
    }
  }, [MasjidNameId, mosque]);

  const submit = async () => {
    if (form.masjid === "" || form.city === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
    setUploading(true);

    try {
      if (MasjidNameId === undefined || MasjidNameId === "") {
        await addMasjid({
          ...form,
          userId: user["$id"],
        });
        Alert.alert("Success", "Mosque added successfully");
      } else {
        await updateMasjid(
          {
            ...form,
            userId: user["$id"],
          },
          MasjidNameId
        );
        Alert.alert("Success", "Mosque  successfully");
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
          {MasjidNameId ? "Edit Nama Masjid" : "Tambah Nama Masjid"}
        </Text>
      </Appbar.Header>

      <View>
        <FormField
          title="Nama Masjid"
          value={form.masjid}
          handleChangeText={(e: any) => setForm({ ...form, masjid: e })}
          otherStyles="mt-5"
          placeholder="Al-Furqan"
        />
        <FormField
          title="Kota"
          value={form.city}
          handleChangeText={(e: any) => setForm({ ...form, city: e })}
          otherStyles="mt-5"
          placeholder="Medan"
        />
        <CustomButton
          title={MasjidNameId ? "Update" : "Simpan"}
          handlePress={submit}
          containerStyles={"mt-16"}
          isLoading={uploading}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditRunText;
