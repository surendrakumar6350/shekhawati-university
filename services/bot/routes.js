const express = require('express');
const router = express.Router();
const { createUniqueId } = require('./utils/createuuid');
const { waSentSms } = require('./db/db.js');
const { createMessage, loggMessage } = require('./utils/paymentMessage.js');
const logMessage = require('./utils/log.js');
require('dotenv').config();
const { generateRandomOTP, isValidMobileNumber } = require('./utils/createOtp')


let client; // You will need to pass the client instance to this file


router.post('/send-message', async (req, res) => {
    const data = await req.body;
    const message = createMessage(data);
    try {
        const chatId = `91${data?.search?.mobile}@c.us`;
        const reqId = createUniqueId(data?.search);
        const newWaSentSms = new waSentSms({ click: data, sentTo: Number(data?.search?.mobile), rqId: reqId });
        const savedUser = await newWaSentSms.save();

        await client.sendMessage(chatId, message);
        await client.sendMessage(chatId, `Your unique ID for this visit is: ${reqId}`);
        await client.sendMessage(chatId, loggMessage);
        logMessage(`someone ${chatId} visited his profile,   ${reqId}`);

        res.status(200).send("Message sent");
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).send("Error sending message");
    }
});

router.post('/new-otp', async (req, res) => {
    try {

        const { SIGNUP_KEY, mobile } = await req.body;
        if (SIGNUP_KEY == process.env.SIGNUP_KEY) {

            const otp = generateRandomOTP();

            if (!isValidMobileNumber(mobile)) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Internal Server Error',
                    details: "Please Provide valid Number"
                });
            }

            const chatId = `91${mobile}@c.us`;
            await client.sendMessage(chatId, `Your OTP is: ${otp}`);
            return res.status(200).json({
                success: true,
                mobile: mobile,
                otp: otp
            });
        } else {
            return res.status(500).json({
                status: 'error',
                message: 'Please Provide valid Key'
            });
        }

    } catch (error) {
        console.log(error);
        logMessage(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
})




module.exports = (whatsappClient) => {
    client = whatsappClient; // Assign the client instance to the local variable
    return router;
};