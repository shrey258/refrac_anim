import { Text, View } from "react-native";
import { useState } from "react";
import { Button } from "@react-navigation/elements";

function text(text: string) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {text.split("").map((char, i) => (
        <Text key={i}>{char === " " ? "\u00A0" : char}</Text>
      ))}
    </View>
  );
}

export default function Index() {
  const [reset, setReset] = useState(0);
  const animationText = "Animations";

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View key={reset}>
        {text(animationText)}
        {text(animationText)}
      </View>

      <Button onPress={() => setReset(reset + 1)}>Reset</Button>
    </View>
  );
}
