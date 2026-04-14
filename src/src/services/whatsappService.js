const axios = require('axios');

const TOKEN = 'EAAhjp9ko1ZB4BRMTvZAa9TAUQVqJG93IUBZC7DZCtdZAmC2Blvnogtc5OZBKvhM6PqTZCudWXYvx0zM2r2ANR0tYQoqE4NxL8Qyibk7y9AjWlcByZAga5mDrMV7xukqzM2h9mUGTeqAlb6CAwjD82KDNOTCYD3UiZC9U6w9wAJSgQYEettV4nSq8yHxmLQGTreiayAcFZBlzY3nZBrZB683xrAeT7mBIrRj9ZBu7hOGUXZCUXiEUZBmZCFoPXTjxIeHRODNZAYEdzvroL4YAOYV742K0ZAh9lKsNUbuBM5s1oGsX4ZD';
const PHONE_NUMBER_ID = '1061662853703569';

async function enviarMensagem(numero, mensagem) {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: numero,
        type: "text",
        text: {
          body: mensagem
        }
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Mensagem enviada:', response.data);
  } catch (error) {
  console.error('Erro ao enviar mensagem:', error.response?.data || error.message);
  throw error;
}

module.exports = { enviarMensagem };