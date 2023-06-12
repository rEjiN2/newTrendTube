import mongoose from "mongoose";

const LiveSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  roomId: {
    type: String,
  },
  createdAt: {
    type: Date,
    expires: 600,
    default: Date.now,
    index: { expireAfterSeconds: 600 },
  },
}, { timestamps: true });

export default mongoose.model("LIVE", LiveSchema);
