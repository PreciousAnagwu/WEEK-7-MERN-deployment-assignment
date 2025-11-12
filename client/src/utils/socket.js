// client/src/utils/socket.js
import { io } from "socket.io-client";
export const socket = io(import.meta.env.VITE_SERVER_URL || 'http://localhost:5000', { /* options */ });

// Connect using environment variable
const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

// Create socket instance
const socket = io(SERVER_URL, {
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export default socket;
