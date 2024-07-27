import { Text, View, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import useAppWrite from "@/lib/useAppWrite";
import { deleteQurbanId, getAllQurbans } from "@/lib/appwrite";
import QurbanCard from "@/components/QurbanCard";
import { router } from "expo-router";
import SearchInput from "@/components/SearchInput";

const Qurban = () => {
  const { data: qurbans, refetch } = useAppWrite(getAllQurbans);
  const [refreshing, setRefreshing] = useState(false);
  const handleUpdate = (id: string) => {
    router.push(`/screens/IDQurban/${id}`);
  };
  const handleDelete = async (id: string) => {
    try {
      const result = await deleteQurbanId(id);

    } catch (error: any) {
      throw new Error(error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="h-full bg-primary px-4 py-16">
      <FlatList
        data={qurbans}
        keyExtractor={(item : any) => item.$id}
        renderItem={({ item }) => (
          <QurbanCard
            fullName={item.fullName}
            nominal={item.nominal}
            qurbanType={item.qurbanType}
            createdAt={item.$createdAt}
            handleDelete={() => handleDelete(item.$id)}
            handleUpdate={() => handleUpdate(item.$id)}
          />
        )}
        ListHeaderComponent={() => (
          <View>
            <Text className="text-2xl text-white font-psemibold ">
              Qurban Masjid
            </Text>
            <View className="my-6">
              <SearchInput placeholder="Cari Qurban" routeFolder="qurban" />
            </View>
            <CustomButton
              containerStyles="w-full my-5"
              title="Tambah Qurban"
              handlePress={() => router.push("/screens/CreateQurban")}
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

export default Qurban;
