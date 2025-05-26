import { View, StyleSheet, Pressable, Text } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import Joystick from "./Joystick";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ActionButton from "./ActionButton";
import DpadButton from "./DpadButton";
import { handleButtonPress } from "../utils";
import ShoulderButton from "./ShoulderButton";
import { useEffect } from "react";

const XboxController = ({ handleForceDisconnect, socket }) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected from server:", reason);
      handleForceDisconnect();
    });

    socket.on("hello", (data) => {
      console.log("Received event:", data);
    });

    socket.on("force disconnect", () => {
      console.log("Force disconnected from server");
      // handleForceDisconnect();
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("force disconnect");
      socket.disconnect();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Controller Body */}
        <View style={styles.controllerBody}>
          {/* Shoulder Buttons */}
          <View style={styles.shoulderButtonsContainer}>
            <View style={styles.shoulderSide}>
              <ShoulderButton
                btnStyles={styles.shoulderButton}
                btnInnerStyles={[styles.shoulderButtonInner]}
                button="LB"
              />
              <ShoulderButton
                btnStyles={styles.triggerButton}
                btnInnerStyles={[styles.triggerButtonInner]}
                button="LT"
              />
            </View>
            <View style={styles.shoulderMiddle} />
            <View style={styles.shoulderSide}>
              <ShoulderButton
                btnStyles={styles.shoulderButton}
                btnInnerStyles={[styles.shoulderButtonInner]}
                button="RB"
              />
              <ShoulderButton
                btnStyles={styles.triggerButton}
                btnInnerStyles={[styles.triggerButtonInner]}
                button="RT"
              />
            </View>
          </View>

          {/* Left Side */}
          <View style={styles.leftSide}>
            {/* D-Pad */}
            <View style={styles.dPadContainer}>
              <DpadButton
                dpadStyles={[styles.dPadButton, styles.dPadUp]}
                dpadButton={"dpad-up"}
              />
              <DpadButton
                dpadStyles={[styles.dPadButton, styles.dPadRight]}
                dpadButton={"dpad-right"}
              />
              <DpadButton
                dpadStyles={[styles.dPadButton, styles.dPadDown]}
                dpadButton={"dpad-down"}
              />
              <DpadButton
                dpadStyles={[styles.dPadButton, styles.dPadLeft]}
                dpadButton={"dpad-left"}
              />
            </View>

            {/* Left Analog Stick */}
            <Joystick side="left" />
          </View>

          {/* Center Section */}
          <View style={styles.centerSection}>
            {/* Xbox Button */}
            <Pressable
              style={styles.xboxButtonContainer}
              onPress={() => handleButtonPress("start")}
            >
              <View style={[styles.xboxButton]}>
                <Svg height="24" width="24" viewBox="0 0 24 24">
                  <Circle cx="12" cy="12" r="10" fill="#107C10" />
                  <Path
                    d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z"
                    fill="#FFFFFF"
                  />
                </Svg>
              </View>
            </Pressable>

            {/* Menu Buttons */}
            <View style={styles.menuButtonsContainer}>
              <Pressable
                style={styles.menuButton}
                onPress={() => handleButtonPress("back")}
              >
                <View style={[styles.menuButtonInner]}>
                  <Text style={styles.menuButtonText}>≡</Text>
                </View>
              </Pressable>

              <Pressable
                style={styles.menuButton}
                onPress={() => handleButtonPress("view")}
              >
                <View style={[styles.menuButtonInner]}>
                  <Text style={styles.menuButtonText}>⧉</Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* Right Side */}
          <View style={styles.rightSide}>
            {/* Action Buttons */}
            <View style={styles.actionButtonsContainer}>
              <ActionButton
                button="Y"
                stylesOuter={[styles.actionButton, styles.buttonY]}
                stylesInner={[styles.actionButtonInner, styles.buttonYInner]}
              />
              <ActionButton
                button="B"
                stylesOuter={[styles.actionButton, styles.buttonB]}
                stylesInner={[styles.actionButtonInner, styles.buttonBInner]}
              />
              <ActionButton
                button="A"
                stylesOuter={[styles.actionButton, styles.buttonA]}
                stylesInner={[styles.actionButtonInner, styles.buttonAInner]}
              />
              <ActionButton
                button="X"
                stylesOuter={[styles.actionButton, styles.buttonX]}
                stylesInner={[styles.actionButtonInner, styles.buttonXInner]}
              />
            </View>

            {/* Right Analog Stick */}
            <Joystick side="right" />
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#121212",
  },
  controllerBody: {
    width: "100%",
    height: "100%",
    backgroundColor: "#121212",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  triggerButton: {
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  triggerButtonInner: {
    width: 75,
    height: 35,
    backgroundColor: "#2D2D2D",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  leftSide: {
    width: "30%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
  },
  centerSection: {
    width: "30%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  rightSide: {
    width: "30%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
  },
  dPadContainer: {
    width: 120,
    height: 120,
    position: "relative",
    marginBottom: 40,
  },
  dPadButton: {
    width: 40,
    height: 40,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  dPadUp: {
    top: 0,
    left: 40,
  },
  dPadRight: {
    top: 40,
    right: 0,
  },
  dPadDown: {
    bottom: 0,
    left: 40,
  },
  dPadLeft: {
    top: 40,
    left: 0,
  },
  xboxButtonContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  xboxButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#2D2D2D",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  activeXboxButton: {
    backgroundColor: "#3D3D3D",
  },
  menuButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 120,
    marginTop: 30,
  },
  menuButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  menuButtonInner: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#2D2D2D",
    justifyContent: "center",
    alignItems: "center",
  },
  menuButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  actionButtonsContainer: {
    width: 150,
    height: 150,
    position: "relative",
  },
  actionButton: {
    width: 65,
    height: 65,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  buttonY: {
    top: 0,
    left: 42.5,
  },
  buttonYInner: {
    backgroundColor: "#FFD700", // Yellow
  },
  buttonB: {
    top: 42.5,
    right: 0,
  },
  buttonBInner: {
    backgroundColor: "#FF0000", // Red
  },
  buttonA: {
    bottom: 0,
    left: 42.5,
  },
  buttonAInner: {
    backgroundColor: "#00FF00", // Green
  },
  buttonX: {
    top: 42.5,
    left: 0,
  },
  buttonXInner: {
    backgroundColor: "#0000FF", // Blue
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  shoulderButtonsContainer: {
    flexDirection: "row",
    width: "100%",
    height: 60,
    position: "absolute",
    top: 20,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  shoulderSide: {
    width: "40%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shoulderMiddle: {
    width: "20%",
  },
  shoulderButton: {
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  shoulderButtonInner: {
    width: 75,
    height: 35,
    backgroundColor: "#2D2D2D",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  shoulderButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default XboxController;
