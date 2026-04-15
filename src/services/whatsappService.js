const axios = require('axios');

const TOKEN = 'EAAhjp9ko1ZB4BRF8pNZBmkb7w0RZAePELGuWcVKasT8LZAxqNDwT6LeDZCCYZCON9FAZAvL7sWg6I45ZBqscypjxwFOOzGz2eJirLOsI9NKQZCSYt75Bt4JSyPSQ6PLJqf3MCaCCZClNNzz8aJacO8FiIos8dgTwNmfyZB0bvCFBHpGO0rTGAMkT7gMLGWVSZBEJvM9t1TNAByuIo6lrLo2VIunN5UBDwKk0Ck36PpS004BvZAx9DNAmHxrQqSP0RPx8eKoJFOPQ4EDnvfrgkphKVZBQvwnnEzUXtmkPMZD';
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
  }
}

module.exports = { enviarMensagem };