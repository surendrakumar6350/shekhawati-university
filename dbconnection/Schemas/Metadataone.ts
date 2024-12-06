import mongoose, { Schema, Model } from "mongoose";

const metadataSchema = new Schema({
    formNo: String,
    imgSrc: String,
    top: Number,
    left: Number,
    width: Number,
    height: Number,
    mergedImage: String,
});

export const Metadata: Model<any, {}> = mongoose.models.Metadataone || mongoose.model("Metadataone", metadataSchema);


