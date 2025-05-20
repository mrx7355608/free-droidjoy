import { View, StyleSheet, SafeAreaView } from "react-native";
import XboxController from "./components/XboxController";
import * as ScreenOrientation from "expo-screen-orientation";

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <XboxController />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
