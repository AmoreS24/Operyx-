const express = require("express");
const router = express.Router();

const mensagensStore = require("../src/stores/mensagens.store");
const atendimentosStore = require("../src/stores/atendimentos.store");

// listar mensagens de um atendimento
router.get("/:atendimento_id", (req, res) => {
  const mensagens = mensagensStore.listarPorAtendimento(Number(req.params.atendimento_id));
  res.json(mensagens);
});

// enviar mensagem manual (atendente)
router.post("/", (req, res) => {
  const {
    empresa_id = 1,
    atendimento_id,
    tipo = "texto",
    conteudo,
    arquivo_url = null,
    origem = "atendente"
  } = req.body;

  if (!atendimento_id) {
    return res.status(400).json({ erro: "atendimento_id é obrigatório" });
  }

  const mensagem = mensagensStore.criar({
    empresa_id,
    atendimento_id,
    tipo,
    conteudo,
    arquivo_url,
    origem,
  });

  atendimentosStore.tocarMensagem(atendimento_id, mensagem.created_at);

  res.json(mensagem);
});

module.exports = router;