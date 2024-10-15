import mongoose, { Schema, Model } from "mongoose";

const userRequestSchema = new Schema({
  userId: String,
  requestCount: { type: Number, default: 0 },
  lastReset: { type: Date, default: Date.now() },
});

export const UserRequest: Model<any, {}> =
  mongoose.models.UserRequest || mongoose.model("UserRequest", userRequestSchema);
