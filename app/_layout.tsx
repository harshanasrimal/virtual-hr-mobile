// app/_layout.tsx
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";
import { SafeAreaView } from "react-native";
import { useEffect } from "react";

// Prevent auto-hide before ready
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Simulate ready (you can wait for fonts, session, etc. here)
    const timeout = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 500); // simulate delay

    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </SafeAreaView>
  );
}
