import React, { useState, useRef, useEffect } from "react";
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
import { sendMessage } from "@/services/chatService";
import TypingDots from "@/components/TypingDots";
import dayjs from "@/utils/dayjs";
import { getUser } from "@/services/userManager";

const AVATAR_BOT = "https://randomuser.me/api/portraits/women/79.jpg";

export default function ChatScreen() {
  const [now, setNow] = useState(new Date());
  const [user, setUser] = useState<any>(null);
  const [AVATAR_USER, setUserAvatar] = useState("https://hr.harshanasrimal.com/images/user.jpg");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "assistant",
      text: "Hello! How can I assist you?",
      time: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<ScrollView>(null);

    useEffect(() => {
      const loadUser = async () => {
        const u = await getUser();
        setUser(u);
        if (u) {
          setUserAvatar(u.image);
        }
      };
  
      loadUser();
    }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);
  
    return () => clearInterval(interval);
  }, []);


  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMsg = {
      id: Date.now(),
      from: "user",
      text: message.trim(),
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const reply = await sendMessage(userMsg.text);
      const botMsg = {
        id: Date.now() + 1,
        from: "assistant",
        text: reply,
        time: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "assistant",
          text: "Oops! I couldn't process your request right now.",
          time: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
      scrollRef.current?.scrollToEnd({ animated: true });
    }
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
            {dayjs(msg.time).fromNow()}
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
          <Text className="text-xs text-green-500 mt-1">
            {loading ? "Typing..." : "Online"}
          </Text>
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
          {loading && (
            <MotiView
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", delay: messages.length * 100 }}
              className="flex-row mb-4 justify-start"
            >
              <Image
                source={{ uri: AVATAR_BOT }}
                className="w-8 h-8 rounded-full mr-2 mt-auto"
              />
              <View className="bg-gray-100 px-4 py-2 rounded-2xl rounded-bl-none">
                <TypingDots />
              </View>
            </MotiView>
          )}
          
        </ScrollView>

        {/* Input Area */}
        <View className="flex-row items-center px-4 py-3 border-t border-gray-200 bg-white">
          <TextInput
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 pb-4 text-base"
            style={{ textAlignVertical: "top" }}
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
            editable={!loading}
          />

        <TouchableOpacity
          onPress={handleSend}
          disabled={loading || !message.trim()}
          className={`ml-2 p-3 rounded-full ${
            loading || !message.trim() ? "bg-gray-300" : "bg-blue-600"
          }`}
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
