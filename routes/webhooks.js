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
  console.log("Mensagem recebida do WhatsApp:", JSON.stringify(req.body, null, 2));

  try {
    const value = req.body.entry?.[0]?.changes?.[0]?.value;
    const message = value?.messages?.[0];
    const contact = value?.contacts?.[0];

    if (!message) {
      return res.sendStatus(200);
    }

    const numero = message.from;
    const nome = contact?.profile?.name || numero;
    const texto = message.text?.body || "";
    const agora = new Date().toISOString();

    let atendimento = atendimentos.find(
      (item) => item.numero === numero && item.status !== "finalizado"
    );

    if (!atendimento) {
      atendimento = {
        id: Date.now().toString(),
        cliente: nome,
        nome,
        numero,
        status: "nao_atendido",
        origem: "whatsapp",
        tags: ["Triagem"],
        mensagens: [],
        criadoEm: agora,
        atualizadoEm: agora
      };

      atendimentos.unshift(atendimento);
    }

    atendimento.mensagens.push({
      id: message.id || Date.now().toString(),
      origem: "cliente",
      texto,
      data: agora
    });

    atendimento.mensagem = texto;
    atendimento.ultimaMensagem = texto;
    atendimento.atualizadoEm = agora;

    console.log("Atendimento atualizado:", atendimento);
  } catch (err) {
    console.log("Erro ao processar webhook:", err);
  }

  return res.sendStatus(200);
});

router.get("/lista", (req, res) => {
  return res.json(atendimentos);
});

module.exports = router;