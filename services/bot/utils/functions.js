function convertString(inputString) {
    // Split the string at '@'
    const atIndex = inputString.indexOf('@');
    let prefix;

    if (atIndex !== -1) {
        // Get the part before '@'
        prefix = inputString.substring(0, atIndex);
    } else {
        // If '@' is not present, use the whole string
        prefix = inputString;
    }

    // Check if the prefix starts with "91" and remove it
    if (prefix.startsWith("91")) {
        prefix = prefix.substring(2); // Remove the first two characters
    }

    return prefix;
}

module.exports = {convertString};