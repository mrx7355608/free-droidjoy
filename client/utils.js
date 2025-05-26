import { getSocket } from "./socket";

export const handleButtonPress = (button, action) => {
  try {
    const socket = getSocket();
    socket.emit("button_press", { button, action });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
