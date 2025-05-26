import { Pressable, StyleSheet, Text, View } from "react-native";
import MultitouchHandler from "./MultitouchHandler";

const ActionButton = ({ stylesOuter, stylesInner, button }) => {
  return (
    <MultitouchHandler button={button}>
      <Pressable style={stylesOuter}>
        <View style={stylesInner}>
          <Text style={styles.buttonText}>{button}</Text>
        </View>
      </Pressable>
    </MultitouchHandler>
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
