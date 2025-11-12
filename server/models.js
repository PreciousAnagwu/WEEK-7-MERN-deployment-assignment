const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String, // optional for username-based flow
  socketId: String, // last known socket id
  online: { type: Boolean, default: false },
});

const MessageSchema = new mongoose.Schema({
  room: { type: String, required: true }, // 'global' or 'dm:userId1:userId2'
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  senderName: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  type: { type: String, enum: ['text','image','file'], default: 'text' },
  fileUrl: String,
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // read receipts
  reactions: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    emoji: String
  }]
});

const RoomSchema = new mongoose.Schema({
  name: String,
  slug: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = {
  User: mongoose.model('User', UserSchema),
  Message: mongoose.model('Message', MessageSchema),
  Room: mongoose.model('Room', RoomSchema)
};
