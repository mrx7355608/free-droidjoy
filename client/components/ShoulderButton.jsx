import { View, StyleSheet, Text, Pressable } from "react-native";
import { handleButtonPress } from "../utils";
import MultitouchHandler from "./MultitouchHandler";

const ShoulderButton = ({ btnStyles, btnInnerStyles, button }) => {
  return (
    <MultitouchHandler button={button}>
      <Pressable
        style={btnStyles}
        onPressIn={() => handleButtonPress(button, "press")}
        onPressOut={() => handleButtonPress(button, "release")}
      >
        <View style={btnInnerStyles}>
          <Text style={styles.shoulderButtonText}>{button}</Text>
        </View>
      </Pressable>
    </MultitouchHandler>
  );
};

const styles = StyleSheet.create({
  shoulderButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default ShoulderButton;
