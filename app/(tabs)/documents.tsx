import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fetchAllDocuments } from "../../services/documentService";

const statusStyles: any = {
  DELIVERED: "bg-green-100 text-green-800",
  PENDING: "bg-yellow-100 text-yellow-800",
  PROCESSING: "bg-red-100 text-red-800",
  CANCELLED: "bg-gray-100 text-gray-600",
};

export default function DocumentsScreen() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadDocuments = async () => {
    try {
      const data = await fetchAllDocuments();
      setDocuments(data);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
        <Text className="mt-2 text-gray-600">Loading documents...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={documents}
        keyExtractor={(item:any) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadDocuments} />
        }
        ListHeaderComponent={
          <Text className="text-2xl font-bold text-gray-800 mb-4">
            Document Requests
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
                    {item.type.replace(/_/g, ' ').split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                </Text>
                <Text
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass}`}
                >
                  {item.status.toLowerCase().capitalize()}
                </Text>
              </View>

              <Text className="text-sm text-gray-500 mt-1">
                Requested on {new Date(item.requestedDate).toLocaleDateString()}
              </Text>

              {item.softCopyUrl && (
                <TouchableOpacity
                  onPress={() => Linking.openURL(`https://hr-api.harshanasrimal.com${item.softCopyUrl}`)}
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
