import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { fetchAllLeaves } from "@/services/leaveService";

const statusStyles: any = {
  APPROVED: "bg-green-100 text-green-800",
  PENDING: "bg-yellow-100 text-yellow-800",
  REJECTED: "bg-red-100 text-red-800",
  CANCELLED: "bg-gray-100 text-gray-600",
};

export default function LeavesScreen() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadLeaves = async () => {
    try {
      const data = await fetchAllLeaves();
      setLeaves(data); // expects data to be an array
    } catch (error) {
      console.error("Failed to load leaves:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
        <Text className="mt-2 text-gray-600">Loading leave history...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={leaves}
        keyExtractor={(item:any) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadLeaves} />
        }
        ListHeaderComponent={
          <Text className="text-2xl font-bold text-gray-800 mb-4">
            Leave History
          </Text>
        }
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 24,
        }}
        renderItem={({ item }) => {
          const statusClass = statusStyles[item.status] || "";
          return (
            <View className="bg-white p-4 rounded-xl mb-4 border border-gray-200 shadow-sm">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold text-gray-800">
                  {item.type.toLowerCase().capitalize()} Leave
                </Text>
                <Text
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass}`}
                >
                  {item.status.toLowerCase().capitalize()}
                </Text>
              </View>

              <Text className="text-sm text-gray-500 mt-1">
                {new Date(item.fromDate).toLocaleDateString()} → {new Date(item.toDate).toLocaleDateString()}
              </Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
