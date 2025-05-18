import { AxisPad } from "@fustaro/react-native-axis-pad";
import { StyleSheet } from "react-native";

export default function Joystick({ side }) {
  const onTouchEvent = (event) => {
    if (event.eventType === "pan") {
      const { ratio } = event;
      const data = {
        x: ratio.x,
        y: ratio.y,
        side: side,
      };
      try {
        fetch("http://192.168.100.6:5000/joystick", {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => console.log({ res }));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <AxisPad
      id={"pad-2"}
      size={150}
      padBackgroundStyle={styles.analogStick}
      stickStyle={styles.analogStick}
      controlStyle={styles.analogStickInner}
      ignoreTouchDownInPadArea={false}
      initialTouchType={"no-snap"}
      onTouchEvent={onTouchEvent}
    />
  );
}

const styles = StyleSheet.create({
  analogStickBase: {
    borderRadius: 99,
    backgroundColor: "#2D2D2D",
    justifyContent: "center",
    alignItems: "center",
  },
  analogStick: {
    borderRadius: 99,
    backgroundColor: "#3D3D3D",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  analogStickInner: {
    width: 35,
    height: 35,
    borderRadius: 99,
    backgroundColor: "#4D4D4D",
  },
});
