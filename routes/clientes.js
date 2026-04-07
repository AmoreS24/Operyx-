const express = require("express");
const router = express.Router();

const clientesStore = require("../src/stores/clientes.store");

// listar clientes
router.get("/", (req, res) => {
  res.json(clientesStore.listar());
});

// buscar cliente por id
router.get("/:id", (req, res) => {
  const cliente = clientesStore.buscarPorId(Number(req.params.id));

  if (!cliente) {
    return res.status(404).json({ erro: "Cliente não encontrado" });
  }

  res.json(cliente);
});

// atualizar dados fiscais
router.put("/:id", (req, res) => {
  const cliente = clientesStore.atualizar(Number(req.params.id), req.body);

  if (!cliente) {
    return res.status(404).json({ erro: "Cliente não encontrado" });
  }

  res.json(cliente);
});

module.exports = router;