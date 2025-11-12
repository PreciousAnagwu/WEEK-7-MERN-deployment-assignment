import React, { useState } from "react";
import Chat from "./components/Chat.jsx";
import "./styles.css";

export default function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username.trim()) setIsLoggedIn(true);
  };

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <div className="login-container">
          <h2>Welcome to Real-Time Chat</h2>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleLogin}>Join Chat</button>
        </div>
      ) : (
        <Chat username={username} />
      )}
    </div>
  );
}
