// app/(tabs)/leaves.tsx
import React from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

const leaveData = [
  {
    id: "1",
    type: "Annual Leave",
    from: "2024-03-10",
    to: "2024-03-12",
    status: "Approved",
  },
  {
    id: "2",
    type: "Casual Leave",
    from: "2024-03-15",
    to: "2024-03-15",
    status: "Pending",
  },
  {
    id: "3",
    type: "Sick Leave",
    from: "2024-03-01",
    to: "2024-03-03",
    status: "Rejected",
  },
];

const statusStyles: any = {
  Approved: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Rejected: "bg-red-100 text-red-800",
  Canceled: "bg-gray-100 text-gray-600",
};

export default function LeavesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={leaveData}
        keyExtractor={(item) => item.id}
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
                  {item.type}
                </Text>
                <Text
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass}`}
                >
                  {item.status}
                </Text>
              </View>

              <Text className="text-sm text-gray-500 mt-1">
                {item.from} → {item.to}
              </Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
