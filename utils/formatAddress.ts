function formatAddress(address : any) {
    // Split the address into parts
    const parts = address.split(' ');

    // Check if there are at least three words
    if (parts.length >= 3) {
        // Return the third word
        return parts[4].charAt(0).toUpperCase() + parts[4].slice(1).toLowerCase();
    } else {
        return "Rajasthan";
    }
}

export default formatAddress;