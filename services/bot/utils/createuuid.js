const { v4: uuidv4 } = require('uuid'); // Import the UUID library


// Function to create a unique ID
function createUniqueId(data) {
    // Extract the first letters of each name
    const firstLetters = `${data.fatherName.charAt(0)}${data.motherName.charAt(0)}${data.studentName.charAt(0)}`;
    
    // Generate a UUID
    const uniqueId = uuidv4(); // e.g., "123e4567-e89b-12d3-a456-426614174000"

    // Concatenate first letters with the UUID
    const finalId = `${firstLetters}-${uniqueId}`;

    return finalId;
}



module.exports = {createUniqueId}