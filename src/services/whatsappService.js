require("dotenv").config();

const axios = require("axios");

const TOKEN = (process.env.WHATSAPP_TOKEN || "").trim();
const PHONE_NUMBER_ID = (process.env.WHATSAPP_PHONE_NUMBER_ID || "").trim();

console.log("TOKEN carregado?", TOKEN ? "SIM" : "NÃO");
console.log("Tamanho do token:", TOKEN.length);
console.log("Phone Number ID:", PHONE_NUMBER_ID);

async function enviarMensagem(numero, mensagem) {
  try {
    const response = await axios({
      method: "POST",
      url: `https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      data: {
        messaging_product: "whatsapp",
        to: numero,
        type: "text",
        text: {
          body: mensagem,
        },
      },
    });

    console.log("Mensagem enviada:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Erro ao enviar mensagem:",
      error.response?.data || error.message
    );

    throw error;
  }
}

module.exports = { enviarMensagem };