import { Pressable, StyleSheet, Text, TouchableHighlight } from "react-native";
import { handleButtonPress } from "../utils";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useState } from "react";

const ActionButton = ({ stylesOuter, stylesInner, button }) => {
  const [isPressed, setIsPressed] = useState(false);

  const tapGesture = Gesture.Tap()
    .maxDuration(1000000) // max time button can be held down
    .onBegin(() => {
      setIsPressed(true);
      handleButtonPress(button, "press");
    })
    .onEnd(() => {
      setIsPressed(false);
      handleButtonPress(button, "release");
    })
    .onTouchesCancelled(() => {
      setIsPressed(false);
    });

  return (
    <GestureDetector gesture={tapGesture}>
      <Pressable style={stylesOuter}>
        <View style={stylesInner}>
          <Text style={styles.buttonText}>{button}</Text>
        </View>
      </Pressable>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default ActionButton;
