import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],
    default: [],
  },
  likes: {
    type: [String],
    default: [],
  },
  disLikes: {
    type: [String],
    default: [],
  },
  watched: {
    type: Boolean,
    default: false,
  },
  watchedAt: {
    type: Date,
    expires: 259200, // The value is in seconds (3 days)
  },
  report: {
    type: Number,
    default: 0,
  },
  reportReasons: {
    type: [String], // Array of reasons for reports
    default: [],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
  blocked: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model("VIDEO", VideoSchema);
