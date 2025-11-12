import React from "react";

export default function Message({ msg, currentUser }) {
  const isOwn = msg.username === currentUser;
  return (
    <div className={`message ${isOwn ? "own" : ""}`}>
      <strong>{msg.username}</strong>: {msg.text}
      <span className="timestamp">{msg.time}</span>
    </div>
  );
}
