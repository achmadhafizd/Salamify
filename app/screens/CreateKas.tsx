import { Text, ScrollView, Alert } from "react-native";
import { Appbar } from "react-native-paper";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputNumber from "@/components/InputNumber";
import CustomButton from "@/components/CustomButton";
import { router} from "expo-router";
import { createKas } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { formatNumber } from "react-native-currency-input";
import { useNavigation } from "@react-navigation/native";

const CreateKas = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();
  const [form, setForm] = useState({
    saldoAwal: 0,
    pemasukan: 0,
    pengeluaran: 0,
    saldoAkhir: 0,
  });

  const submit = async () => {
    if (
      !form.saldoAwal ||
      !form.pemasukan ||
      !form.pengeluaran ||
      !form.saldoAkhir
    ) {
      return Alert.alert("Please fill the fields");
    }
    setUploading(true);
    try {
      const newKas = await createKas({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Pengaturan Kas berhasil diperbarui");
      router.push("/masjid");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        saldoAwal: 0,
        pemasukan: 0,
        pengeluaran: 0,
        saldoAkhir: 0,
      });
      setUploading(false);
    }
  };

  const handleChangeSaldoAwal = (e: string) => {
    const numberValue = parseFloat(e.replace(/[^0-9]/g, "")); // Mengambil hanya angka
    setForm({ ...form, saldoAwal: numberValue });
  };
  const handleChangePemasukan = (e: string) => {
    const numberValue = parseFloat(e.replace(/[^0-9]/g, "")); // Mengambil hanya angka
    setForm({ ...form, pemasukan: numberValue });
  };
  const handleChangePengeluaran = (e: string) => {
    const numberValue = parseFloat(e.replace(/[^0-9]/g, "")); // Mengambil hanya angka
    setForm({ ...form, pengeluaran: numberValue });
  };
  const handleChangeSaldoAkhir = (e: string) => {
    const numberValue = parseFloat(e.replace(/[^0-9]/g, "")); // Mengambil hanya angka
    setForm({ ...form, saldoAkhir: numberValue });
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
            Kas Masjid
          </Text>
        </Appbar.Header>
        <InputNumber
          title="Saldo Awal"
          value={formatNumber(form.saldoAwal, {
            prefix: "Rp ",
            delimiter: ".",
            separator: ",",
            precision: 0,
          })}
          placeholder="Rp."
          handleChangeText={handleChangeSaldoAwal}
          otherStyles="mt-10"
        />

        <InputNumber
          title="Pemasukan"
          value={formatNumber(form.pemasukan, {
            prefix: "Rp ",
            delimiter: ".",
            separator: ",",
            precision: 0,
          })}
          placeholder="Rp."
          handleChangeText={handleChangePemasukan}
          otherStyles="mt-10"
        />

        <InputNumber
          title="Pengeluaran"
          value={formatNumber(form.pengeluaran, {
            prefix: "Rp ",
            delimiter: ".",
            separator: ",",
            precision: 0,
          })}
          placeholder="Rp."
          handleChangeText={handleChangePengeluaran}
          otherStyles="mt-10"
        />

        <InputNumber
          title="Saldo Akhir"
          value={formatNumber(form.saldoAkhir, {
            prefix: "Rp ",
            delimiter: ".",
            separator: ",",
            precision: 0,
          })}
          placeholder="Rp."
          handleChangeText={handleChangeSaldoAkhir}
          otherStyles="mt-10"
        />

        <CustomButton
          title="Atur Kas"
          handlePress={submit}
          containerStyles="my-10"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateKas;
