const axios = require('axios');

const TOKEN = 'EAAhjp9ko1ZB4BRBI0JKBfjESbJO92cT6FJnTFH8goyQQ8EeP7fvP3S3ERb9UztI3wmcZCSQ1YZAYBEGEMSUrs6yO4eLQQJl3ZBgGjbUHBDdE2p4Ic44LMixUalFCISher1FvjZAbET5TBe8OIE5zWeZCP25U2pzjeVsQ7aFWHhaorMGqomZCKjrlXC5Rbhh7l3EhB378dmPkL1WR8bjmaUIpc6qtCpo39tyw7YyZATuVB9wIhlXlZC8A9ka3xNw8IrfEhtzJ1yYgBc3ipfvYyNbB0eB7f9Ocv5VYgL5Ab';
const PHONE_NUMBER_ID = '1061662853703569';

async function enviarMensagem(numero, mensagem) {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: numero,
        type: 'text',
        text: {
          body: mensagem || 'Fala Erick 🚀 agora sim funcionando!'
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
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { enviarMensagem };