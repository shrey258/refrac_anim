import { Button } from "@react-navigation/elements";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { cubicBezier, Keyframe } from "react-native-reanimated";

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
  return (
    <View style={[styles.h1, inverted && { 
      transform: [{ rotate: '180deg' }, { rotateY: '180deg' }],
      opacity: 0.3,
      backdropFilter: 'blur(20px) saturate(160%)'
    }]}>
      {text.split("").map((char, i) => (
        <Animated.Text style={[styles.letter, { "--i": i } as any]} key={i}>
          {char === " " ? "\u00A0" : char}
        </Animated.Text>
      ))}
    </View>
  );
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

      <Button onPress={() => setReset(reset + 1)} style={[styles.button]}>
        Reset
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  h1: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 32,
    fontWeight: 600,
    letterSpacing: -0.05,
    overflow: "hidden",
  },

  letter: {
    transform: "translateY(100%)",
    animationDelay: "1.3s",
    animationName: fadein,
    animationDuration: "0.5s",
    animationFillMode: "forwards",
    animationTimingFunction: cubicBezier(0.19, 1, 0.22, 1) as any,
  },
  button: {
    width: 100,
    marginTop: 24,
    position: "relative",
    height: 32,
    fontSize: 14,
    paddingInline: 12,
    fontWeight: 500,
    borderRadius: 9999,
    backgroundColor: "#FFF",
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.08), 0px 2px 2px rgba(0, 0, 0, 0.04)",
  },
});
