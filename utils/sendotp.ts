import axios from "axios";

async function sendotp(data: any) {
    try {
        const response = await axios.post(`${process.env.SEND_OTP_BOT_API}`, data);
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        return null;
    }
}

export { sendotp }