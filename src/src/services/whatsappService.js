const axios = require("axios");

const TOKEN = process.env.WHATSAPP_TOKEN || "EAAhjp9ko1ZB4BRBG4stn9FkY4CAZC45fvMxgRMnQ0FLh8DhV6iETsabZCdwP4Kd0J1f54ZBVWlFPL5u5iJeMsoJ5byy6AGWfjzMUlFluE6viMhnyQ7JZAZBI0ly4Nyi9R0Ar5sfGKvBqVqFh3Cy0ZAyqkJo8vP3F8tTtz0szAcmcb4gNRvLFtZB4yE1vKXIGsZAvkdd9uJiAgbVjckAlJOKZCG8CSsrcV1WPPol9IN4FD6iKhWzxwbs3BJAEn6lc7Po1t6U0SEY4tj6EIaqufyQRZBbSMLD3tsDmOMZD";
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || "1061662853703569";

async function enviarMensagem(numero, mensagem) {
  const response = await axios.post(
    `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
    {
      messaging_product: "whatsapp",
      to: numero,
      type: "text",
      text: {
        body: mensagem,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log("Mensagem enviada:", response.data);
  return response.data;
}

module.exports = { enviarMensagem };