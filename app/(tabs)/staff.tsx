import { View, FlatList, RefreshControl, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import useAppWrite from "@/lib/useAppWrite";
import { deleteStaffId, getAllStaffs } from "@/lib/appwrite";
import StaffCard from "@/components/StaffCard";
import SearchInput from "@/components/SearchInput";

const Ustadz = () => {
  const { data: staffs, refetch } = useAppWrite(getAllStaffs);
  const [refreshing, setRefreshing] = useState(false);
  const handleUpdate = (id: number) => {
    router.push(`/screens/IDUstadz/${id}`);
  };
  const handleDelete = async (id: string) => {
    try {
      const result = await deleteStaffId(id);

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
        data={staffs}
        keyExtractor={(item : any) => item.$id}
        renderItem={({ item }) => (
          <StaffCard
            fullName={item.fullName}
            photoProfile={item.photoProfile}
            phoneNumber={item.phoneNumber}
            role={item.role}
            handleDelete={() => handleDelete(item.$id)}
            handleUpdate={() => handleUpdate(item.$id)}
          />
        )}
        ListHeaderComponent={() => (
          <View>
            <Text className="text-2xl text-white font-psemibold ">
              Petugas Masjid
            </Text>
            <View className="my-6">
              <SearchInput placeholder="Cari Staff" routeFolder="staff" />
            </View>

            <CustomButton
              containerStyles="w-full my-5"
              title="Tambah Petugas"
              handlePress={() => router.push("/screens/CreatePetugas")}
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

export default Ustadz;
