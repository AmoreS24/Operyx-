const express = require("express");
const router = express.Router();

const atendimentosStore = require("../src/stores/atendimentos.store");
const clientesStore = require("../src/stores/clientes.store");
const mensagensStore = require("../src/stores/mensagens.store");

// LISTAR TODOS OS ATENDIMENTOS
router.get("/", (req, res) => {
  try {
    const lista = atendimentosStore.listar();

    const resultado = lista.map((atendimento) => {
      const cliente = clientesStore.buscarPorId(atendimento.cliente_id);
      const mensagens = mensagensStore.listarPorAtendimento(atendimento.id);
      const ultimaMensagem = mensagens.length ? mensagens[mensagens.length - 1] : null;

      return {
        ...atendimento,
        cliente,
        ultimaMensagem,
      };
    });

    return res.json(resultado);
  } catch (error) {
    console.error("Erro ao listar atendimentos:", error);
    return res.status(500).json({
      erro: "Erro interno ao listar atendimentos",
      detalhe: error.message,
    });
  }
});

// BUSCAR UM ATENDIMENTO POR ID
router.get("/:id", (req, res) => {
  try {
    const atendimento = atendimentosStore.buscarPorId(req.params.id);

    if (!atendimento) {
      return res.status(404).json({ erro: "Atendimento não encontrado" });
    }

    const cliente = clientesStore.buscarPorId(atendimento.cliente_id);
    const mensagens = mensagensStore.listarPorAtendimento(atendimento.id);

    return res.json({
      ...atendimento,
      cliente,
      mensagens,
    });
  } catch (error) {
    console.error("Erro ao buscar atendimento:", error);
    return res.status(500).json({
      erro: "Erro interno ao buscar atendimento",
      detalhe: error.message,
    });
  }
});

// ASSUMIR ATENDIMENTO
router.post("/:id/assumir", (req, res) => {
  try {
    const { atendente_id, atendente_nome } = req.body || {};

    const atendimento = atendimentosStore.assumir(req.params.id, {
      atendente_id,
      atendente_nome,
    });

    if (!atendimento) {
      return res.status(404).json({ erro: "Atendimento não encontrado" });
    }

    return res.json(atendimento);
  } catch (error) {
    console.error("Erro ao assumir atendimento:", error);
    return res.status(500).json({
      erro: "Erro interno ao assumir atendimento",
      detalhe: error.message,
    });
  }
});

// LIBERAR ATENDIMENTO
router.post("/:id/liberar", (req, res) => {
  try {
    const atendimento = atendimentosStore.liberar(req.params.id);

    if (!atendimento) {
      return res.status(404).json({ erro: "Atendimento não encontrado" });
    }

    return res.json(atendimento);
  } catch (error) {
    console.error("Erro ao liberar atendimento:", error);
    return res.status(500).json({
      erro: "Erro interno ao liberar atendimento",
      detalhe: error.message,
    });
  }
});

// FINALIZAR ATENDIMENTO
router.post("/:id/finalizar", (req, res) => {
  try {
    const atendimento = atendimentosStore.finalizar(req.params.id);

    if (!atendimento) {
      return res.status(404).json({ erro: "Atendimento não encontrado" });
    }

    return res.json(atendimento);
  } catch (error) {
    console.error("Erro ao finalizar atendimento:", error);
    return res.status(500).json({
      erro: "Erro interno ao finalizar atendimento",
      detalhe: error.message,
    });
  }
});

module.exports = router;