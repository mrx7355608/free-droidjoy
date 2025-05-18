import { View, StyleSheet, Pressable, Text } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import Joystick from "./Joystick";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const XboxController = () => {
  const handleButtonPress = (button) => {
    try {
      fetch("http://192.168.100.6:5000/button", {
        method: "post",
        body: JSON.stringify({ button }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleTrigger = async (triggerBtn, action) => {
    try {
      fetch("http://192.168.100.6:5000/trigger", {
        method: "post",
        body: JSON.stringify({ trigger: triggerBtn, action: action }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Controller Body */}
        <View style={styles.controllerBody}>
          {/* Shoulder Buttons */}
          <View style={styles.shoulderButtonsContainer}>
            <View style={styles.shoulderSide}>
              <Pressable
                style={styles.shoulderButton}
                onPress={() => handleButtonPress("LB")}
              >
                <View style={[styles.shoulderButtonInner]}>
                  <Text style={styles.shoulderButtonText}>LB</Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.triggerButton}
                onPressIn={() => handleTrigger("RT", "press")}
                onPressOut={() => handleTrigger("RT", "release")}
              >
                <View style={[styles.triggerButtonInner]}>
                  <Text style={styles.shoulderButtonText}>LT</Text>
                </View>
              </Pressable>
            </View>
            <View style={styles.shoulderMiddle} />
            <View style={styles.shoulderSide}>
              <Pressable
                style={styles.shoulderButton}
                onPress={() => handleButtonPress("RB")}
              >
                <View style={[styles.shoulderButtonInner]}>
                  <Text style={styles.shoulderButtonText}>RB</Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.triggerButton}
                onPressIn={() => handleTrigger("RT", "press")}
                onPressOut={() => handleTrigger("RT", "release")}
              >
                <View style={[styles.triggerButtonInner]}>
                  <Text style={styles.shoulderButtonText}>RT</Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* Left Side */}
          <View style={styles.leftSide}>
            {/* D-Pad */}
            <View style={styles.dPadContainer}>
              <Pressable
                style={[styles.dPadButton, styles.dPadUp]}
                onPress={() => handleButtonPress("dpad-up")}
              >
                <View style={[styles.dPadButtonInner]} />
              </Pressable>
              <Pressable
                style={[styles.dPadButton, styles.dPadRight]}
                onPress={() => handleButtonPress("dpad-right")}
              >
                <View style={[styles.dPadButtonInner]} />
              </Pressable>
              <Pressable
                style={[styles.dPadButton, styles.dPadDown]}
                onPress={() => handleButtonPress("dpad-down")}
              >
                <View style={[styles.dPadButtonInner]} />
              </Pressable>
              <Pressable
                style={[styles.dPadButton, styles.dPadLeft]}
                onPress={() => handleButtonPress("dpad-left")}
              >
                <View style={[styles.dPadButtonInner]} />
              </Pressable>
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
              <Pressable
                style={[styles.actionButton, styles.buttonY]}
                onPress={() => handleButtonPress("Y")}
              >
                <View style={[styles.actionButtonInner, styles.buttonYInner]}>
                  <Text style={styles.buttonText}>Y</Text>
                </View>
              </Pressable>
              <Pressable
                style={[styles.actionButton, styles.buttonB]}
                onPress={() => handleButtonPress("B")}
              >
                <View style={[styles.actionButtonInner, styles.buttonBInner]}>
                  <Text style={styles.buttonText}>B</Text>
                </View>
              </Pressable>
              <Pressable
                style={[styles.actionButton, styles.buttonA]}
                onPress={() => handleButtonPress("A")}
              >
                <View style={[styles.actionButtonInner, styles.buttonAInner]}>
                  <Text style={styles.buttonText}>A</Text>
                </View>
              </Pressable>
              <Pressable
                style={[styles.actionButton, styles.buttonX]}
                onPress={() => handleButtonPress("X")}
              >
                <View style={[styles.actionButtonInner, styles.buttonXInner]}>
                  <Text style={styles.buttonText}>X</Text>
                </View>
              </Pressable>
            </View>

            {/* Right Analog Stick */}
            <Joystick side="right" />
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
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
  dPadButtonInner: {
    width: 36,
    height: 36,
    backgroundColor: "#2D2D2D",
    borderRadius: 4,
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
  shoulderButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default XboxController;
