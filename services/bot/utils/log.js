const fs = require('fs');
const path = require('path');

// Define the log file path
const logFilePath = path.join(__dirname, '../Logs/server.log');

// Function to log messages
function logMessage(message) {
    const timestamp = new Date().toISOString(); // Get the current timestamp
    const logEntry = `${timestamp} - ${message}\n`; // Format the log entry

    // Append the log entry to the log file
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}

// Export the logMessage function for use in other files
module.exports = logMessage;