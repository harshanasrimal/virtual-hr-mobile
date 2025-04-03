import React from "react";
import { View } from "react-native";
import { MotiView } from "moti";

export default function TypingDots() {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
      {[0, 1, 2].map((i) => (
        <MotiView
          key={i}
          from={{ opacity: 0.2, translateY: 0 }}
          animate={{ opacity: 1, translateY: -5 }}
          transition={{
            type: "timing",
            duration: 600,
            delay: i * 150,
            loop: true,
            repeatReverse: true,
          }}
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: "blue", // ← make it super visible
          }}
        />
      ))}
    </View>
  );
}
