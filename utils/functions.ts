import axios from "axios";
const redirectToFind = ()=> {
    window.location.href = "/find"
}

async function sendMessage(data : any) {
    try {
      const response = await axios.post(`${process.env.WHATSAPP_BOT_API}`, data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
  
export {redirectToFind, sendMessage}