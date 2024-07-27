import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import useAppWrite from "../../../lib/useAppWrite";
import { deleteStaffId, getUstadzQuery } from "@/lib/appwrite";
import { router, useLocalSearchParams } from "expo-router";
import SearchInput from "@/components/SearchInput";
import StaffCard from "@/components/StaffCard";

const StaffSearch = () => {
  const { queryStaff } = useLocalSearchParams();
  const { data: posts, refetch } = useAppWrite(() =>
    getUstadzQuery(queryStaff)
  );

  const handleUpdate = (id: string) => {
    router.push(`/screens/IDUstadz/${id}`);
  };
  const handleDelete = async (id: string) => {
    try {
      const result = await deleteStaffId(id);
    } catch (error: any) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    refetch();
  }, [queryStaff]);

  return (
    <SafeAreaView className="bg-primary h-full mt-4">
      <FlatList
        className="px-2"
        data={posts}
        keyExtractor={(item: any) => item.$id}
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
          <>
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {queryStaff}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput
                  initialQuery={queryStaff}
                  refetch={refetch}
                  routeFolder="staff"
                />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Data Staff Found"
            subtitle="Try another search"
            buttonTitle="Add Staff"
            handlePress={() => router.push("/screens/CreatePetugas")}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default StaffSearch;
