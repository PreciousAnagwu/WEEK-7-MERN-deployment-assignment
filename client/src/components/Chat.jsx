import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000"); // backend address

export default function Chat({ username }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for messages from server
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Cleanup listener on unmount
    return () => socket.off("receiveMessage");
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const msgData = {
      username,
      text: message,
      time: new Date().toLocaleTimeString(),
    };
    socket.emit("sendMessage", msgData);
    setMessage(""); // clear input
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {username}</h2>
      <div
        style={{
          border: "1px solid #ccc",
          height: "300px",
          overflowY: "auto",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.username}:</strong> {msg.text}{" "}
            <small>({msg.time})</small>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ padding: "8px", width: "75%" }}
        />
        <button type="submit" style={{ padding: "8px 12px" }}>
          Send
        </button>
      </form>
    </div>
  );
}
