import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const activeColor = "#2563eb"; // blue-600
const inactiveColor = "#9ca3af"; // gray-400

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 8,
        },
        tabBarIcon: ({ focused, color, size }) => {
          const iconMap: Record<string, string> = {
            chat: "chatbubbles-outline",
            documents: "document-text-outline",
            leaves: "calendar-outline",
            profile: "person-outline",
          };

          const icon = iconMap[route.name] || "ellipse-outline";

          return (
            <Ionicons
              name={(focused ? icon.replace("-outline", "") : icon) as any}
              size={24}
              color={focused ? activeColor : inactiveColor}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="chat" />
      <Tabs.Screen name="documents" />
      <Tabs.Screen name="leaves" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
