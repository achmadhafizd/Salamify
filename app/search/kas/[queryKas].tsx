import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import useAppWrite from "../../../lib/useAppWrite";
import { deleteKasId, getKasQuery } from "@/lib/appwrite";
import { router, useLocalSearchParams } from "expo-router";
import SearchInput from "@/components/SearchInput";
import { Card } from "react-native-paper";
import moment from "moment";

const KasSearch = () => {
  const { queryKas } = useLocalSearchParams();
  const { data: posts, refetch } = useAppWrite(() => getKasQuery(queryKas));

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteKasId(id);

    } catch (error: any) {
      throw new Error(error);
    }
  };

  const handleUpdate = (id: string) => {
    router.push(`/screens/IDKas/${id}`);
  };

  const formatCurrency = (number: string) => {
    return number.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  const formatDate = (timestamp: string) => {
    // Debugging log

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

  useEffect(() => {
    refetch();
  }, [queryKas]);

  return (
    <SafeAreaView className="bg-primary h-full mt-4">
      <FlatList
        className="px-2"
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => (
          <Card className="bg-black-100 p-1 border-2  border-secondary-200 my-4">
            <Card.Content>
              <Text className="text-center text-gray-100 text-lg font-pmedium pb-2">
                {formatDate(item.$createdAt)}
              </Text>
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
          <>
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {queryKas}
              </Text>
              <View className="mt-6 mb-8">
                <SearchInput
                  initialQuery={queryKas}
                  refetch={refetch}
                  routeFolder="article"
                />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Data Kas Found"
            subtitle="Try another search"
            buttonTitle="Add Kas"
            handlePress={() => router.push("/screens/CreateKas")}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default KasSearch;
