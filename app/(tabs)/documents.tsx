// app/(tabs)/documents.tsx
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const mockData = [
  {
    id: "1",
    type: "Service Letter",
    date: "2024-04-01",
    status: "Delivered",
  },
  {
    id: "2",
    type: "Experience Certificate",
    date: "2024-03-10",
    status: "Pending",
  },
  {
    id: "3",
    type: "Salary Slip",
    date: "2024-02-15",
    status: "Rejected",
  },
  {
    id: "4",
    type: "Job Confirmation Letter",
    date: "2024-01-18",
    status: "Canceled",
  },
];

const statusStyles: any = {
  Delivered: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Rejected: "bg-red-100 text-red-800",
  Canceled: "bg-gray-100 text-gray-600",
};

export default function DocumentsScreen() {
  return (
<SafeAreaView className="flex-1 bg-white">
  <FlatList
    data={mockData}
    keyExtractor={(item) => item.id}
    ListHeaderComponent={
      <Text className="text-2xl font-bold text-gray-800 mb-4">
        Document Requests
      </Text>
    }
    contentContainerStyle={{
      paddingHorizontal: 16, // same as Tailwind px-4
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
            Requested on {item.date}
          </Text>

          {item.status === "Delivered" && (
            <TouchableOpacity
              onPress={() => console.log("Downloading:", item.type)}
              className="mt-3 flex-row items-center"
            >
              <Ionicons name="download-outline" size={18} color="#2563eb" />
              <Text className="ml-1 text-blue-600 text-sm font-medium">
                Download
              </Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }}
  />
</SafeAreaView>
  );
}
