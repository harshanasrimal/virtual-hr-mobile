// app/index.tsx
import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { getToken } from "../services/tokenManager";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const token = await getToken();
      const destination = token ? "/(tabs)/chat" : "/auth/login";
      router.replace(destination);
    };

    checkLogin();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" />
      <Text className="mt-2 text-gray-600">Loading...</Text>
    </View>
  );
}
