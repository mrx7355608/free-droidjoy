import { io } from "socket.io-client";

let socketInstance = null;

export const createSocket = (ip) => {
  const sock = io(`http://${ip}:5000`, {
    reconnection: false,
    transports: ["websocket"],
  });

  socketInstance = sock;
  return sock;
};

export const getSocket = () => {
  if (!socketInstance) {
    throw new Error("Socket is not initialized yet!");
  }

  return socketInstance;
};
