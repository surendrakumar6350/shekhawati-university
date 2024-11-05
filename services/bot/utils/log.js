const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../../Logs/server.log');

// Function to ensure the log file and directories exist
function ensureLogFileExists(filePath) {
    const dir = path.dirname(filePath);

    // Check if the directory exists; if not, create it
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Check if the file exists; if not, create an empty file
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '');
    }
}

// Function to log messages
function logMessage(message) {
    ensureLogFileExists(logFilePath);
    
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