import mongoose, { Schema, Model } from "mongoose";

const formSchema = new Schema({
    imgSrcSign: String, imgSrc: String, rollNo: String,
    formNo: String, aadharNo: String, email: String, address: String, mobile: String, dob: String,
    abcId: String, gender: String, religion: String, caste: String, course: String, college: String,
    fatherName: String, motherName: String, studentName: String, date: { type: Date, default: Date.now }
});

export const forms: Model<any, {}> = mongoose.models.blogposts || mongoose.model("blogposts", formSchema);