import axios from "axios";

const botToken = process.env.BOT_TOKEN;

export const sendMessage = async (chat_id: string, text: string, options?: any) =>
  await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    chat_id,
    text,
    ...options,
  });
