// client/src/pages/ChatRoom.jsx
import { useEffect, useState } from "react";
import socket from "../utils/socket";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Connect
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    // Listen for messages
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Cleanup
    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { content: input, sender: "User", timestamp: new Date() };
    socket.emit("sendMessage", newMsg);
    setInput("");
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-2">Global Chat Room</h2>
      <div className="border p-2 h-80 overflow-y-auto mb-3">
        {messages.map((msg, index) => (
          <div key={index} className="mb-1">
            <strong>{msg.sender}</strong>: {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
