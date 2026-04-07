let atendimentos = [];
let ultimoId = 0;
let ultimoSequencialProtocolo = 0;

function agora() {
  return new Date();
}

function pad(num, size = 4) {
  return String(num).padStart(size, "0");
}

function formatarDataProtocolo(data = new Date()) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${ano}${mes}${dia}`;
}

function prefixoCanal(canal) {
  const mapa = {
    WhatsApp1: "WA1",
    WhatsApp2: "WA2",
    Instagram: "IG",
    Email: "EML",
  };

  return mapa[canal] || "GEN";
}

function gerarProtocolo(canal) {
  ultimoSequencialProtocolo += 1;
  const data = formatarDataProtocolo(agora());
  const prefixo = prefixoCanal(canal);
  return `${prefixo}-${data}-${pad(ultimoSequencialProtocolo)}`;
}

function listar() {
  return atendimentos;
}

function buscarPorId(id) {
  return atendimentos.find(a => a.id === Number(id)) || null;
}

function listarPorCliente(cliente_id, empresa_id = 1) {
  return atendimentos.filter(
    a => a.cliente_id === Number(cliente_id) && a.empresa_id === Number(empresa_id)
  );
}

function buscarEmAbertoPorCliente(cliente_id, empresa_id = 1) {
  return atendimentos.find(a =>
    a.cliente_id === Number(cliente_id) &&
    a.empresa_id === Number(empresa_id) &&
    a.status !== "finalizado"
  ) || null;
}

function buscarPorCanalExternoId(canal_externo_id, empresa_id = 1) {
  if (!canal_externo_id) return null;

  return atendimentos.find(a =>
    a.canal_externo_id === canal_externo_id &&
    a.empresa_id === Number(empresa_id)
  ) || null;
}

function criar(dados) {
  ultimoId += 1;

  const novo = {
    id: ultimoId,
    empresa_id: dados.empresa_id || 1,
    cliente_id: dados.cliente_id,
    canal: dados.canal || "WhatsApp1",
    canal_externo_id: dados.canal_externo_id || null,
    protocolo: dados.protocolo || gerarProtocolo(dados.canal || "WhatsApp1"),

    status: dados.status || "nao_atendido",

    atendente_id: dados.atendente_id || null,
    atendente_nome: dados.atendente_nome || null,

    tag_ids: Array.isArray(dados.tag_ids) ? dados.tag_ids : [],

    orcamento_id: dados.orcamento_id || null,
    pedido_id: dados.pedido_id || null,

    created_at: agora(),
    updated_at: agora(),
    last_message_at: dados.last_message_at || agora(),
  };

  atendimentos.push(novo);
  return novo;
}

function atualizar(id, dados) {
  const atendimento = buscarPorId(id);
  if (!atendimento) return null;

  Object.assign(atendimento, dados, {
    updated_at: agora(),
  });

  return atendimento;
}

function atualizarStatus(id, status) {
  const atendimento = buscarPorId(id);
  if (!atendimento) return null;

  atendimento.status = status;
  atendimento.updated_at = agora();

  return atendimento;
}

function assumir(id, dados = {}) {
  const atendimento = buscarPorId(id);
  if (!atendimento) return null;

  atendimento.status = "em_atendimento";
  atendimento.atendente_id = dados.atendente_id || atendimento.atendente_id || null;
  atendimento.atendente_nome = dados.atendente_nome || atendimento.atendente_nome || null;
  atendimento.updated_at = agora();

  return atendimento;
}

function liberar(id) {
  const atendimento = buscarPorId(id);
  if (!atendimento) return null;

  atendimento.status = "nao_atendido";
  atendimento.atendente_id = null;
  atendimento.atendente_nome = null;
  atendimento.updated_at = agora();

  return atendimento;
}
function buscarPorNome(nome, empresa_id = 1) {
  return clientes.find(
    c =>
      c.nome.toLowerCase() === nome.toLowerCase() &&
      c.empresa_id === empresa_id
  );
}
function finalizar(id) {
  const atendimento = buscarPorId(id);
  if (!atendimento) return null;

  atendimento.status = "finalizado";
  atendimento.updated_at = agora();

  return atendimento;
}

function tocarMensagem(id, dataMensagem = new Date()) {
  const atendimento = buscarPorId(id);
  if (!atendimento) return null;

  atendimento.last_message_at = dataMensagem;
  atendimento.updated_at = agora();

  return atendimento;
}

module.exports = {
  listar,
  buscarPorId,
  listarPorCliente,
  buscarEmAbertoPorCliente,
  buscarPorCanalExternoId,
  criar,
  atualizar,
  atualizarStatus,
  assumir,
  liberar,
  finalizar,
  tocarMensagem,
};