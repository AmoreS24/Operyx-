const express = require("express");
const router = express.Router();

const atendimentosStore = require("../src/stores/atendimentos.store");
const mensagensStore = require("../src/stores/mensagens.store");

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
    const messageId = message.id || String(Date.now());

    let atendimento = atendimentosStore.buscarPorCanalExternoId(numero);

    if (!atendimento) {
      atendimento = atendimentosStore.criar({
        empresa_id: 1,
        cliente_id: null,
        canal: "WhatsApp1",
        canal_externo_id: numero,
        status: "nao_atendido",
        tag_ids: [],
        atendente_id: null,
        atendente_nome: null,
      });

      atendimento.cliente_nome = nome;
      atendimento.cliente = nome;
      atendimento.numero = numero;
      atendimento.origem = "whatsapp";
      atendimento.tags = ["Triagem"];
    }

    const novaMensagem = mensagensStore.criar({
      atendimento_id: atendimento.id,
      direcao: "entrada",
      origem: "cliente",
      tipo: "texto",
      texto,
      conteudo: texto,
      canal: "WhatsApp1",
      canal_message_id: messageId,
      remetente_nome: nome,
      remetente_numero: numero,
      status: "recebida",
    });

    atendimentosStore.atualizar(atendimento.id, {
      cliente_nome: nome,
      cliente: nome,
      numero,
      ultima_mensagem: texto,
      ultima_Mensagem: texto,
      mensagem: texto,
      last_message_at: new Date(),
    });

    console.log("Atendimento oficial atualizado:", atendimento);
    console.log("Mensagem oficial criada:", novaMensagem);
  } catch (err) {
    console.log("Erro ao processar webhook:", err);
  }

  return res.sendStatus(200);
});

router.get("/lista", (req, res) => {
  return res.json(atendimentosStore.listar());
});

module.exports = router;