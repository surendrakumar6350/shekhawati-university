const axios = require('axios');

async function fetchImageAsBase64(url) {
    try {
        // Fetch the image as a binary
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        
        // Convert the binary data to base64
        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        
        return base64Image;
    } catch (error) {
        console.error('Error fetching the image:', error);
        throw error;
    }
}

module.exports = {fetchImageAsBase64}