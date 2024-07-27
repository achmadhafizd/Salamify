import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import useAppWrite from "../../../lib/useAppWrite";
import { deleteQurbanId, getQurbanQuery } from "@/lib/appwrite";
import { router, useLocalSearchParams } from "expo-router";
import SearchInput from "@/components/SearchInput";
import QurbanCard from "@/components/QurbanCard";

const QurbanSearch = () => {
  const { queryQurban } = useLocalSearchParams();
  const { data: posts, refetch } = useAppWrite(() =>
    getQurbanQuery(queryQurban)
  );

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
  useEffect(() => {
    refetch();
  }, [queryQurban]);

  return (
    <SafeAreaView className="bg-primary h-full mt-4">
      <FlatList
        className="px-2"
        data={posts}
        keyExtractor={(item: any) => item.$id}
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
          <>
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {queryQurban}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput
                  initialQuery={queryQurban}
                  refetch={refetch}
                  routeFolder="qurban"
                />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Data Qurban Found"
            subtitle="Try another search"
            buttonTitle="Add Qurban"
            handlePress={() => router.push("/screens/CreateQurban")}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default QurbanSearch;
