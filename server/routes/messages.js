// server/routes/messages.js
import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// GET /api/messages/search?room=global&query=hello
router.get("/search", async (req, res) => {
  try {
    const { room, query } = req.query;
    if (!room || !query) return res.status(400).json({ error: "Missing parameters" });

    const regex = new RegExp(query, "i"); // case-insensitive search
    const results = await Message.find({ room, content: regex })
      .sort({ timestamp: -1 })
      .limit(50);

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
