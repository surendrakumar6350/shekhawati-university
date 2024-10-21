import CryptoJS from 'crypto-js'

const secretKey = 'your-secremeramasterrkutaht-key*#%#@sjienvkamleshRahsdfjie';

const encryptData = (data : any) => {
    try {
        // Stringify the data to ensure it's in the correct format
        const stringData = JSON.stringify(data);
        
        // Encrypt the data
        const ciphertext = CryptoJS.AES.encrypt(stringData, secretKey).toString();
        return ciphertext;
    } catch (error) {
        console.error('Encryption error:', error);
        return null; // Return null or handle the error as needed
    }
};


const decryptData = (ciphertext : any) => {
    try {
        // Check if the ciphertext is valid
        if (!ciphertext) {
            throw new Error('Invalid ciphertext');
        }

        // Decrypt the data
        const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
        const originalData = bytes.toString(CryptoJS.enc.Utf8);

        // Parse back to original array
        return JSON.parse(originalData);
    } catch (error) {
        console.error('Decryption error:', error);
        return null; // Return null or handle the error as needed
    }
};

export {encryptData, decryptData}