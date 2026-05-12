const express = require("express");
const router = express.Router();

router.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verificado com sucesso!");
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

router.post("/webhook", (req, res) => {
  console.log(
    "Mensagem recebida do WhatsApp:",
    JSON.stringify(req.body, null, 2)
  );

  return res.sendStatus(200);
});

module.exports = router;