const express = require('express');

const router = express.Router();

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'operyx_token_123';

// Verificação do webhook pela Meta
router.get('/meta/whatsapp', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verificado com sucesso');
    return res.status(200).send(challenge);
  }

  console.log('Falha na verificação do webhook');
  return res.sendStatus(403);
});

// Recebimento de eventos da Meta
router.post('/meta/whatsapp', (req, res) => {
  console.log('Evento recebido do WhatsApp:');
  console.dir(req.body, { depth: null });

  return res.sendStatus(200);
});

module.exports = router;