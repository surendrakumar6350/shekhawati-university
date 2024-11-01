import axios from "axios";
const redirectToFind = () => {
  window.location.href = "/find"
}

async function sendMessage(data: any) {
  try {
    const response = await axios.post(`${process.env.WHATSAPP_BOT_API}`, data);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

function isValidMobileNumber(value: any) {
  // Convert the value to a string in case it's a number
  const strValue = String(value);

  // Regular expression to check for a 10-digit mobile number
  const regex = /^\d{10}$/;

  // Test the value against the regex
  return regex.test(strValue);
}


function isValidOtp(otp : any) {
  const otpPattern = /^\d{4}$/;
  return otpPattern.test(otp);
}

export { redirectToFind, sendMessage, isValidMobileNumber, isValidOtp }