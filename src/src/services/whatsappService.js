const axios = require('axios');

const TOKEN = 'EAAhjp9ko1ZB4BRB3PiwfK9ZBGcaV8oqtJJSyJ1E6Dcjd69faxQum2ZBgru1tl3McBDZBPIPIDzO5EcZCdrtss0ejF2MYBETKGpktrDXx1IiCgV1ON5uuhhebukJ8r64seXaya1fIJ3ZAZBsSW0UVoWCkgKCz0ZBovdgMs0dlWyuZBC0ZA0O5rCiQZCXdkuGVYMWlo0kykZC8vfGWts8U0BHIOLsZByma2d3eTI1gmO1MyDWY0pXpnXktdSqFptFZBuRjUxLYtfagEUu9sjHX95s9qhGlyQpN1tvez199hGGXIZD';
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