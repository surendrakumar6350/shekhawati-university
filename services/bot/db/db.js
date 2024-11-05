const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.DB; // Change 'mydatabase' to your database name

const db2 = mongoose.createConnection(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('Connected to MongoDB');


const waSentSmsSchema = new mongoose.Schema({
    click: Object,
    sentTo: Number,
    rqId: String,
    date: { type: Date, default: Date.now }
});

const waSentSms = db2.model('waSentSms', waSentSmsSchema);

const formSchema = new mongoose.Schema({
    imgSrcSign: String, imgSrc: String, rollNo: String,
    formNo: String, aadharNo: String, email: String, address: String, mobile: String, dob: String,
    abcId: String, gender: String, religion: String, caste: String, course: String, college: String,
    fatherName: String, motherName: String, studentName: String, date: { type: Date, default: Date.now }
});

const blogposts = db2.model('blogposts', formSchema);


module.exports = { waSentSms, blogposts };