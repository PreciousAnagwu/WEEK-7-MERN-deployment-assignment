import React from "react";

export default function UserList({ users }) {
  return (
    <div className="user-list">
      <h3>Online Users ({users.length})</h3>
      <ul>
        {users.map((user, i) => (
          <li key={i} className="user-item">
            🟢 {user}
          </li>
        ))}
      </ul>
    </div>
  );
}
