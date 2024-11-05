const express = require("express");
const { Client, RemoteAuth } = require("whatsapp-web.js");
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
const createRoutes = require('./routes');
const rateLimit = require('express-rate-limit');
const setupClientEvents = require('./clientEvents');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 30,
    message: 'Too many requests from this IP, please try again later.',
});

app.use('/', limiter);

app.use(express.json());

let client;
mongoose.connect(process.env.DB_URI).then(() => {
    const store = new MongoStore({ mongoose: mongoose });
    client = new Client({
        authStrategy: new RemoteAuth({
            clientId: process.env.CLIENT_ID,
            store: store,
            backupSyncIntervalMs: 300000
        }),
        puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-extensions'] }
    });

    setupClientEvents(client);
    // Start your client
    client.initialize();

    app.use('/api', createRoutes(client));
});



// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});