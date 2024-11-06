const paymentMessage = `
To proceed, please send ₹5 to this UPI QR

After that, kindly take a screenshot of the payment and share it with us

Our team will manually verify your payment and send you all the details within 10 minutes,
including the name, photo, and email of the person who searched your profile!

Thank you! 🙏`;

function formatName(name) {
    // Split the name into words, map over each word to capitalize the first letter and convert the rest to lowercase
    return name
        .split(' ') // Split the name into an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter and lowercase the rest
        .join(' '); // Join the words back into a single string
}

const createMessage = (data) => {
    return `🌟 Hey, ${formatName(data?.search?.studentName)}! 🌟
👀 Someone recently visited your profile! 
🔗 Check it out here: (https://shekhawati-kaa-data.online)
✨ Don't miss out on connecting with them! 
Have a great day!
`;
}

const profileMessage = (profile) => {
    return `
Name: ${formatName(profile.studentName)}
Mobile Number: ${profile.mobile}
Email: ${profile.email.toLowerCase()}
    `
}

const loggMessage = `
To check your profile
please send 1


If you have any questions or need assistance, please feel free to reply to this message. We’re here to help and will get back to you shortly.
    `;

module.exports = { paymentMessage, formatName, createMessage, profileMessage, loggMessage };