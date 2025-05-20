import { View, StyleSheet, Text, Pressable } from "react-native";
import { handleButtonPress } from "../utils";

const ShoulderButton = ({ btnStyles, btnInnerStyles, button }) => {
  return (
    <Pressable
      style={btnStyles}
      onPressIn={() => handleButtonPress(button, "press")}
      onPressOut={() => handleButtonPress(button, "release")}
    >
      <View style={btnInnerStyles}>
        <Text style={styles.shoulderButtonText}>{button}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  shoulderButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default ShoulderButton;
