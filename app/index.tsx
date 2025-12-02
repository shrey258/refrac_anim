import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { cubicBezier } from "react-native-reanimated";

const fadein = {
  0: {
    transform: [{ translateY: "100%" }],
    opacity: 0,
  },
  1: {
    transform: [{ translateY: "0%" }],
    opacity: 1,
  },
};

function text(text: string, inverted: boolean) {
  const content = (
    <View
      style={[
        styles.h1,
        inverted && {
          transform: [
            { rotate: "180deg" },
            { rotateY: "180deg" },
            { skewX: "12deg" },
          ],
          opacity: 0.3,
          backdropFilter: "blur(20px) saturate(160%)",
        },
      ]}
    >
      {text.split("").map((char, i) => (
        <Animated.Text
          style={[styles.letter, { animationDelay: `${0.03 * i}s` }]}
          key={i}
        >
          {char === " " ? "\u00A0" : char}
        </Animated.Text>
      ))}
    </View>
  );

  if (inverted) {
    return (
      <MaskedView
        maskElement={
          <LinearGradient
            colors={["black", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ width: "100%", height: "100%" }}
          />
        }
        style={{ width: "100%" }}
      >
        {content}
      </MaskedView>
    );
  }

  return content;
}

export default function Index() {
  const [reset, setReset] = useState(0);
  const animationText = "Animations";

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View key={reset}>
        {text(animationText, false)}
        {text(animationText, true)}
      </View>

      <Pressable onPress={() => setReset(reset + 1)} style={styles.button}>
        <Text style={styles.buttonText}>Replay animation</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  h1: {
    flexDirection: "row",
    flexWrap: "wrap",
    overflow: "hidden",
  },

  letter: {
    fontSize: 32,
    fontWeight: "600",
    letterSpacing: -0.05,
    transform: [{ translateY: "100%" }],
    animationName: fadein,
    animationDuration: "1.3s",
    animationFillMode: "forwards",
    animationTimingFunction: cubicBezier(0.19, 1, 0.22, 1) as any,
  },
  button: {
    width: "100%",
    maxWidth: 140, // constrained width for better look
    marginTop: 24,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
    backgroundColor: "#FFF",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "black",
  },
});
