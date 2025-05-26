import { handleButtonPress } from "../utils";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

export default function MultitouchHandler({ children, button }) {
  const tapGesture = Gesture.Tap()
    .maxDuration(1000000) // max time button can be held down
    .onBegin(() => {
      handleButtonPress(button, "press");
    })
    .onEnd(() => {
      handleButtonPress(button, "release");
    })
    .onTouchesCancelled(() => {
      handleButtonPress(button, "release");
    })
    .runOnJS(true);

  return <GestureDetector gesture={tapGesture}>{children}</GestureDetector>;
}
