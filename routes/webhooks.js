const express = require("express");
const router = express.Router();

const atendimentosStore = require("../src/stores/atendimentos.store");
const clientesStore = require("../src/stores/clientes.store");
const mensagensStore = require("../src/stores/mensagens.store");

router.get("/in", (req, res) => {
  const { canal, cliente, mensagem } = req.query;

  if (!cliente || !mensagem) {
    return res.status(400).json({ erro: "cliente e mensagem obrigatórios" });
  }

  const empresa_id = 1;

  // 1. Buscar ou criar cliente
  let clienteExistente = clientesStore.buscarPorNome(cliente, empresa_id);

  if (!clienteExistente) {
    clienteExistente = clientesStore.criar({
      nome: cliente,
      empresa_id,
    });
  }

  // 2. Buscar atendimento em aberto
  let atendimento = atendimentosStore.buscarEmAbertoPorCliente(
    clienteExistente.id,
    empresa_id
  );

  // 3. Se não existir, criar atendimento
  if (!atendimento) {
    atendimento = atendimentosStore.criar({
      cliente_id: clienteExistente.id,
      empresa_id,
      canal: canal || "WhatsApp1",
      status: "nao_atendido",
    });
  }

  // 4. Criar mensagem
  mensagensStore.criar({
    empresa_id,
    atendimento_id: atendimento.id,
    tipo: "texto",
    conteudo: mensagem,
    origem: "cliente",
  });

  // 5. Atualizar última mensagem
  atendimentosStore.tocarMensagem(atendimento.id);

  console.log("Mensagem recebida:", cliente, mensagem);

  res.json({ ok: true });
});

module.exports = router;