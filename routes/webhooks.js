const express = require("express");
const router = express.Router();

const atendimentos = [];

router.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verificado com sucesso!");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

router.post("/webhook", (req, res) => {
  console.log(
    "Mensagem recebida:",
    JSON.stringify(req.body, null, 2)
  );

  try {
    const message =
      req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (message) {
      const numero = message.from;
      const texto = message.text?.body || "Mensagem";

      const novoAtendimento = {
        id: Date.now(),
        cliente: numero,
        mensagem: texto,
        status: "nao_atendido"
      };

      atendimentos.push(novoAtendimento);

      console.log("Novo atendimento criado:", novoAtendimento);
    }

  } catch (err) {
    console.log("Erro ao processar webhook:", err);
  }

  return res.sendStatus(200);
});

router.get("/lista", (req, res) => {
  return res.json(atendimentos);
});

module.exports = router;