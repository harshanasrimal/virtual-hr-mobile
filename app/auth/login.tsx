import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { logo } from "@/assets";
import { router } from "expo-router";
import { login } from "@/services/authService";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async() => {
    console.log("Login button pressed");
    // TODO: Connect with Auth API
    try {
      const user = await login(email, password);
      if (user) {
        router.replace('/');
      } else {
        Alert.alert("Login Failed", "Invalid email or password.");
      }   
    } catch (error) {
      Alert.alert("Login Failed", "Invalid email or password.");
    }
  };

  const handleForgotPassword = () => {
    Alert.alert("Disabled", "Please contact the administrator.");
  }

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

      <TouchableOpacity className="mt-4" onPress={handleForgotPassword}>
        <Text className="text-sm text-blue-500 text-center">Forgot Password?</Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  );
}
