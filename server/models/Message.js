// server/models/Message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  room: String,
  sender: String,
  content: String,
  type: { type: String, default: "text" },
  timestamp: { type: Date, default: Date.now },
  readBy: [String],
});

export default mongoose.model("Message", messageSchema);
