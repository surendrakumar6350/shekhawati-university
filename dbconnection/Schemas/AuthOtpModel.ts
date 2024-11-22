import mongoose, { Schema, Model } from "mongoose";

const formSchema = new Schema({
    otp: { type: String },
    date: { type: Date, default: Date.now }
});

export const AuthOtpModel: Model<any, {}> = mongoose.models.authotp || mongoose.model("authotp", formSchema);