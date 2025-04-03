import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";

const AVATAR_USER = "https://randomuser.me/api/portraits/men/11.jpg";
const AVATAR_BOT = "https://randomuser.me/api/portraits/women/44.jpg";

export default function ChatScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "assistant",
      text: "Hello! How can I help you today?",
      time: "Just now",
    },
  ]);

  const scrollRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (!message.trim()) return;

    const userMsg = {
      id: Date.now(),
      from: "user",
      text: message.trim(),
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessage("");

    // You can replace this dummy reply with real API call later
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        from: "assistant",
        text: "Could you please provide me with the type of leave you would like to request (ANNUAL, CASUAL, or MEDICAL), the reason for your leave, and the end date for the leave?",
        time: "Just now",
      };
      setMessages((prev) => [...prev, reply]);
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 700);
  };

  const renderMessage = (msg: any, index: number) => {
    const isUser = msg.from === "user";
    const avatar = isUser ? AVATAR_USER : AVATAR_BOT;

    return (
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", delay: index * 100 }}
        key={msg.id}
        className={`flex-row mb-4 ${isUser ? "justify-end" : "justify-start"}`}
      >
        {!isUser && (
          <Image
            source={{ uri: avatar }}
            className="w-8 h-8 rounded-full mr-2 mt-auto"
          />
        )}
        <View
          className={`max-w-[75%] px-4 py-2 rounded-2xl ${
            isUser
              ? "bg-blue-600 rounded-br-none"
              : "bg-gray-100 rounded-bl-none"
          }`}
        >
          <Text className={isUser ? "text-white" : "text-gray-800"}>
            {msg.text}
          </Text>
          <Text
            className={`text-xs mt-1 ${
              isUser ? "text-white/70 text-right" : "text-gray-500"
            }`}
          >
            {msg.time}
          </Text>
        </View>
        {isUser && (
          <Image
            source={{ uri: avatar }}
            className="w-8 h-8 rounded-full ml-2 mt-auto"
          />
        )}
      </MotiView>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        {/* Header */}
        <View className="px-4 py-4 border-b border-gray-200 bg-white items-center">
          <Text className="text-2xl font-bold text-gray-800">HR Assistant</Text>
          <Text className="text-xs text-green-500 mt-1">Online</Text>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          className="flex-1 px-4 pt-3"
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.map((msg, index) => renderMessage(msg, index))}
        </ScrollView>

        {/* Input Area */}
        <View className="flex-row items-center px-4 py-3 border-t border-gray-200 bg-white">
          <TextInput
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 pb-4 text-base"
            style={{ textAlignVertical: 'top' }}
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
          />

          <TouchableOpacity
            onPress={handleSend}
            className="ml-2 bg-blue-600 p-3 rounded-full"
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
