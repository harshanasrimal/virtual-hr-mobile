import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center p-5">
      <Stack.Screen options={{ title: "Oops!" }} />
      <Text className="text-2xl font-bold mb-2.5">Page Not Found</Text>
      <Text className="text-base text-gray-600 mb-5">
        The page you're looking for doesn't exist.
      </Text>
      <Link href="/" className="mt-4 py-2.5">
        <Text className="text-base text-blue-600">Go back home</Text>
      </Link>
    </View>
  );
}
