function generateRandomOTP() {
    // Generate a random number between 0 and 9999
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp.toString(); // Convert to string if needed
}

function isValidMobileNumber(numberString) {
    // Check if the string is exactly 10 characters long and contains only digits
    const regex = /^\d{10}$/;
    return regex.test(numberString);
}

module.exports = {generateRandomOTP, isValidMobileNumber}