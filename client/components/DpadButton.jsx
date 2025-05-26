import { View, StyleSheet, Pressable } from "react-native";
import { handleButtonPress } from "../utils";
import MultitouchHandler from "./MultitouchHandler";

const DpadButton = ({ dpadStyles, dpadButton }) => {
  return (
    <MultitouchHandler button={dpadButton}>
      <Pressable
        style={dpadStyles}
        onTouchStart={() => handleButtonPress(dpadButton, "press")}
        onTouchEnd={() => handleButtonPress(dpadButton, "release")}
      >
        <View style={[styles.dPadButtonInner]} />
      </Pressable>
    </MultitouchHandler>
  );
};

const styles = StyleSheet.create({
  dPadButtonInner: {
    width: 36,
    height: 36,
    backgroundColor: "#2D2D2D",
    borderRadius: 4,
  },
});

export default DpadButton;
