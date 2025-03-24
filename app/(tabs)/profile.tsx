// app/(tabs)/profile.tsx
import { router } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

export default function ProfileScreen() {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  // Mock user data (replace with real API data)
  const user = {
    name: "Saman Perera",
    employeeId: 1,
    email: "saman@harshanasrimal.com",
    designation: "Software Engineer",
    joined: "2022-07-15",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  };

  const handleChangePassword = () => {
    if (!current || !newPass || !confirm) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (newPass !== confirm) {
      Alert.alert("Error", "New password and confirmation do not match.");
      return;
    }

    Alert.alert("Success", "Password changed successfully.");
  };

  const handleLogout = () => {
    Alert.alert("Logged Out", "You have been logged out.");
    router.replace('/auth/login');
    // TODO: Clear session and navigate to login
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Header */}
        <View className="items-center mb-6">
          <Image
            source={{ uri: user.avatar }}
            className="w-24 h-24 rounded-full mb-3"
          />
          <Text className="text-xl font-bold text-gray-900">{user.name}</Text>
          <Text className="text-sm text-gray-500">{user.designation}</Text>
        </View>

        {/* Info Card */}
        <View className="bg-gray-50 rounded-xl border border-gray-200 p-4 mb-8">
          <Text className="text-sm text-gray-500">Employee ID</Text>
          <Text className="text-base font-semibold text-gray-800 mb-3">
            {user.employeeId}
          </Text>

          <Text className="text-sm text-gray-500">Email</Text>
          <Text className="text-base font-semibold text-gray-800 mb-3">
            {user.email}
          </Text>

          <Text className="text-sm text-gray-500">Joined Date</Text>
          <Text className="text-base font-semibold text-gray-800">
            {user.joined}
          </Text>
        </View>

        {/* Change Password Section */}
        <Text className="text-lg font-bold text-gray-800 mb-3">
          Change Password
        </Text>

        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 mb-3"
          placeholder="Current password"
          secureTextEntry
          value={current}
          onChangeText={setCurrent}
        />
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 mb-3"
          placeholder="New password"
          secureTextEntry
          value={newPass}
          onChangeText={setNewPass}
        />
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 mb-6"
          placeholder="Confirm new password"
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
        />

        <TouchableOpacity
          className="bg-blue-600 py-4 rounded-xl mb-6"
          onPress={handleChangePassword}
        >
          <Text className="text-white text-center font-semibold">
            Update Password
          </Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          className="bg-red-500 py-4 rounded-xl"
          onPress={handleLogout}
        >
          <Text className="text-white text-center font-semibold">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
