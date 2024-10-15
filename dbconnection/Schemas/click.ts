import mongoose, { Schema, Model } from "mongoose";

const clickSchema = new Schema({
    user: Object,
    search: Object,
    ip: String,
    device: Object,
    date: { type: Date, default: Date.now }
});

export const click: Model<any, {}> = mongoose.models.click || mongoose.model("click", clickSchema);