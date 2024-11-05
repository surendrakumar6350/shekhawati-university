// clientEvents.js
const qrcode = require("qrcode-terminal");
const { MessageMedia } = require("whatsapp-web.js");
const fs = require('fs');
const { paymentMessage, profileMessage } = require('./utils/paymentMessage');
const { blogposts } = require('./db/db');
const { convertString } = require('./utils/functions');
const { fetchImageAsBase64 } = require('./utils/fetchImg');
const logMessage = require('./utils/log');


module.exports = (client) => {
    client.once("ready", async () => {
        console.log("server is ready....");
    });

    // When the client receives QR-Code
    client.on("qr", (qr) => {
        console.log("QR RECEIVED", qr);
        qrcode.generate(qr, { small: true });
    });

    client.on("remote_session_saved", () => {
        console.log("remote_session_saved");
    });


    client.on('message', async (msg) => {

        // if (msg.body === '2') {
        //     const fileData = fs.readFileSync('./utils/upi.png', {
        //         encoding: 'base64',
        //     })
        //     media = new MessageMedia(
        //         "image/png",
        //         fileData,
        //         "upi.png",
        //     )
        //     await client.sendMessage(msg.from, media);
        //     await client.sendMessage(msg.from, paymentMessage);
        //     logMessage(`${msg.from} requested UPI QR`)
        // }

        if (msg.body === '1') {
            const profile = await blogposts.findOne({ mobile: convertString(msg.from) });
            if (profile) {
                const fileData = await fetchImageAsBase64(`https://exam.shekhauniexam.in/${profile?.imgSrc}`)
                media = new MessageMedia(
                    "image/jpg",
                    fileData,
                    Date.now(),
                )
                await client.sendMessage(msg.from, media);
                await client.sendMessage(msg.from, profileMessage(profile));
                logMessage(`Sent my profile Request By : ${msg.from}`);
            } else {
                client.sendMessage(msg.from, 'There is no profile on your number')
            }
        }

    });
};