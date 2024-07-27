import { Text, View, FlatList, RefreshControl, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import useAppWrite from "@/lib/useAppWrite";
import { deleteKasId, getLatestKas } from "@/lib/appwrite";
import { router } from "expo-router";
import { Card } from "react-native-paper";
import moment from "moment";
import SearchInput from "@/components/SearchInput";
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";
import { icons } from "../../constants";

const Kas = () => {
  const { data: kas, refetch } = useAppWrite(getLatestKas);
  const [refreshing, setRefreshing] = useState(false);
  const handleUpdate = (id: string) => {
    router.push(`/screens/IDKas/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteKasId(id);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const formatCurrency = (number: string) => {
    return number.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  const formatDate = (timestamp: string) => {
    // Ensure timestamp is valid
    if (!timestamp) {
      return "Invalid Date";
    }

    const date = moment(timestamp);
    if (!date.isValid()) {
      return "Invalid Date";
    }

    return date.format("LL"); // e.g., "July 9, 2024"
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="h-full bg-primary px-4 py-16">
      <FlatList
        data={kas}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Card className="bg-black-100 p-1 border-2  border-secondary-200 my-4">
            <Card.Content>
              <View className="flex flex-row justify-between items-center">
                <Text className="text-center text-gray-100 text-lg font-pmedium pb-2 flex-1">
                  {formatDate(item.$createdAt)}
                </Text>
                <View className="flex pb-3">
                  <Menu>
                    <MenuTrigger>
                      <Image
                        source={icons.menu}
                        style={{ width: 20, height: 20 }}
                        resizeMode="contain"
                      />
                    </MenuTrigger>
                    <MenuOptions>
                      <MenuOption onSelect={() => handleUpdate(item.$id)} text="Update" />
                      <MenuOption onSelect={() => handleDelete(item.$id)} text="Delete" />
                    </MenuOptions>
                  </Menu>
                </View>
              </View>
              <View className="flex flex-row justify-between py-1">
                <Text className="text-lg text-white font-pmedium">
                  Saldo Awal
                </Text>
                <Text className="text-lg font-pmedium text-white">
                  {formatCurrency(item.saldoAwal)}
                </Text>
              </View>
              <View className="flex flex-row justify-between py-1">
                <Text className="text-lg text-white font-pmedium">
                  Pengeluaran
                </Text>
                <Text className="text-lg font-pmedium text-white">
                  - {formatCurrency(item.pengeluaran)}
                </Text>
              </View>
              <View className="flex flex-row justify-between py-1">
                <Text className="text-lg text-white font-pmedium">
                  Pemasukan
                </Text>
                <Text className="text-lg font-pmedium text-white">
                  + {formatCurrency(item.pemasukan)}
                </Text>
              </View>
              <View className="flex flex-row justify-between py-1">
                <Text className="text-lg text-white font-pmedium">
                  Saldo Akhir
                </Text>
                <Text className="text-lg font-pmedium text-white">
                  {formatCurrency(item.saldoAkhir)}
                </Text>
              </View>
            </Card.Content>
          </Card>
        )}
        ListHeaderComponent={() => (
          <View>
            <Text className="text-2xl text-white font-psemibold ">
              Kas Masjid
            </Text>
            <View className="my-6">
              <SearchInput placeholder="Cari Kas" routeFolder="kas" initialQuery="" />
            </View>
            <CustomButton
              containerStyles="w-full my-5"
              title="Tambah Kas"
              handlePress={() => router.push("/screens/CreateKas")}
            />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Kas;
