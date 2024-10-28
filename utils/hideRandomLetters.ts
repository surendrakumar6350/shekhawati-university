function hideRandomLetters(name: any) {
    // Convert the name into an array of characters
    const nameArray = name.split('');
    
    // Create a new array to store the modified characters
    const hiddenNameArray = [];
    
    // Loop through the characters
    for (let i = 0; i < nameArray.length; i++) {
        hiddenNameArray.push(nameArray[i]); // Add the original character
        hiddenNameArray.push('**'); // Add two asterisks after each character
    }
    
    // Join the array back into a string
    return hiddenNameArray.join('');
}

export { hideRandomLetters }