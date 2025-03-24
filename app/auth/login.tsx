import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { logo } from "@/assets";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: Connect with Auth API
router.replace('/');
    console.log("Logging in with:", email, password);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View className="flex-1 bg-white justify-center px-6">
      <View className="items-center mb-10">
        <Image
          source={logo}
          className="w-32 h-32"
          resizeMode="contain"
        />
      </View>

      <Text className="text-sm text-gray-600 mb-1">Email</Text>
      <TextInput
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text className="text-sm text-gray-600 mb-1">Password</Text>
      <TextInput
        className="border border-gray-300 rounded-xl px-4 py-3 mb-6"
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        className="bg-blue-600 py-4 rounded-xl"
        onPress={handleLogin}
      >
        <Text className="text-white text-center font-semibold">Login</Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-4">
        <Text className="text-sm text-blue-500 text-center">Forgot Password?</Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  );
}
