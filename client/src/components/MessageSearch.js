// client/src/components/MessageSearch.js
import { useState } from "react";
import axios from "axios";

export default function MessageSearch({ currentRoom, onResults }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await axios.get(`/api/messages/search?room=${currentRoom}&query=${query}`);
      onResults(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 mb-3">
      <input
        type="text"
        className="flex-1 border rounded p-2"
        placeholder="Search messages..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-3 py-2 rounded">
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
