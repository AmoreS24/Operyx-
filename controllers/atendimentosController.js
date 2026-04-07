// "Banco" em memória (só para testes)
let atendimentos = [];
let proximoId = 1;

exports.criarAtendimento = (req, res) => {
  const { canal, cliente, mensagem } = req.body || {};

  if (!canal || !cliente || !mensagem) {
    return res.status(400).json({
      erro: 'Campos obrigatórios: canal, cliente, mensagem'
    });
  }

  const novo = {
    id: proximoId++,
    canal,
    cliente,
    mensagem,
    status: 'nao_atendido',
    criadoEm: new Date().toISOString()
  };

  atendimentos.unshift(novo);
  return res.status(201).json(novo);
};

exports.listarAtendimentos = (req, res) => {
  return res.status(200).json(atendimentos);
};

exports.atualizarStatus = (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body || {};

  const statusValidos = ['nao_atendido', 'em_atendimento', 'finalizado'];
  if (!statusValidos.includes(status)) {
    return res.status(400).json({
      erro: `Status inválido. Use: ${statusValidos.join(', ')}`
    });
  }

  const atendimento = atendimentos.find(a => a.id === id);
  if (!atendimento) {
    return res.status(404).json({ erro: 'Atendimento não encontrado' });
  }

  atendimento.status = status;
  atendimento.atualizadoEm = new Date().toISOString();

  return res.status(200).json(atendimento);
};

exports.listarFilaPorStatus = (req, res) => {
  const { status } = req.params;

  const statusValidos = ['nao_atendido', 'em_atendimento', 'finalizado'];
  if (!statusValidos.includes(status)) {
    return res.status(400).json({
      erro: `Fila inválida. Use: ${statusValidos.join(', ')}`
    });
  }

  const fila = atendimentos.filter(a => a.status === status);
  return res.status(200).json(fila);
};
