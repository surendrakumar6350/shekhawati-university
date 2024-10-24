/**
 * Extracts the pin code from an address.
 * If no pin code is found, returns "Rajasthan".
 *
 * @param {any} address - The address to extract the pin code from.
 * @returns {string} The extracted pin code or "Rajasthan" if not found.
 */
function formatAddress(address : any) {
    try {
      // Regular expression pattern to match Indian pin codes (6 digits)
      const pinCodePattern = /\b\d{6}\b/;
  
      // Search for the pin code pattern in the address
      const pinCodeMatch = address.match(pinCodePattern);
  
      // If a pin code is found, return it
      if (pinCodeMatch) {
        return pinCodeMatch[0];
      } else {
        // If no pin code is found, return "Rajasthan"
        return "Rajasthan";
      }
    } catch (error) {
      console.log(error);
      return "Rajasthan";
    }
  }
  
  export default formatAddress;