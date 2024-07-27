import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { updateQurban } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Appbar } from "react-native-paper";
import CustomDropdown from "@/components/CustomDropdown";
import { useNavigation } from "@react-navigation/native";
import InputNumber from "@/components/InputNumber";
import { formatNumber } from "react-native-currency-input";
import { router, useLocalSearchParams } from "expo-router";

const QurbanId = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();
  const { QurbanId } = useLocalSearchParams<{ QurbanId: string }>();

  const [form, setForm] = useState({
    fullName: "",
    nominal: 0,
    qurbanType: "",
  });

  const data = [
    { key: "1", value: "Sapi" },
    { key: "2", value: "Kambing" },
    { key: "3", value: "Domba" },
    { key: "4", value: "Kerbau" },
  ];

  const handleChangeNominal = (e: string) => {
    const numberValue = parseFloat(e.replace(/[^0-9]/g, "")); // Mengambil hanya angka
    setForm({ ...form, nominal: numberValue });
  };

  const submit = async () => {
    if (!form.fullName || !form.nominal || !form.qurbanType) {
      return Alert.alert("Please fill the fields");
    }
    setUploading(true);
    try {
      await updateQurban(
        {
          ...form,
          userId: user.$id,
        },
        QurbanId
      );
      Alert.alert("Success", "Qurban  successfully");
      router.push("/masjid");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        fullName: "",
        nominal: 0,
        qurbanType: "",
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
            Update Data Qurban
          </Text>
        </Appbar.Header>
        <FormField
          title="Full Name"
          value={form.fullName}
          placeholder="John Doe"
          handleChangeText={(e: any) => setForm({ ...form, fullName: e })}
          otherStyles="mt-10"
        />

        <InputNumber
          title="Pemasukan"
          value={formatNumber(form.nominal, {
            prefix: "Rp ",
            delimiter: ".",
            separator: ",",
            precision: 0,
          })}
          placeholder="Rp."
          handleChangeText={handleChangeNominal}
          otherStyles="mt-10"
        />

        <View className="mt-8">
          <Text className="text-gray-100 text-base font-pmedium mb-2">
            Select Qurban Type
          </Text>
          <CustomDropdown
            data={data}
            setSelectedValue={(selectedvalue: any) =>
              setForm({ ...form, qurbanType: selectedvalue })
            }
          />
        </View>

        <CustomButton
          title="Update Data Qurban"
          handlePress={submit}
          containerStyles="my-10"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default QurbanId;
