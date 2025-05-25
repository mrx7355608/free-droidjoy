import { io } from 'socket.io-client';

export const createSocket = (ip) => {
    const socket = io(`http://${ip}:5000`, {
        reconnection: false,
        transports: ['websocket'],
    });
    return socket;
}