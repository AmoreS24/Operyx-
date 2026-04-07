let clientes = [];
let ultimoId = 0;

function agora() {
  return new Date();
}

function listar() {
  return clientes;
}

function buscarPorId(id) {
  return clientes.find(c => c.id === Number(id)) || null;
}

function buscarPorTelefone(telefone, empresa_id = 1) {
  if (!telefone) return null;

  return clientes.find(c =>
    c.telefone === telefone &&
    c.empresa_id === Number(empresa_id)
  ) || null;
}

function buscarPorNome(nome, empresa_id = 1) {
  if (!nome) return null;

  const nomeNormalizado = String(nome).trim().toLowerCase();

  return clientes.find(c =>
    String(c.nome || "").trim().toLowerCase() === nomeNormalizado &&
    c.empresa_id === Number(empresa_id)
  ) || null;
}

function criar(dados) {
  ultimoId += 1;

  const novo = {
    id: ultimoId,
    empresa_id: dados.empresa_id || 1,
    nome: dados.nome || "Cliente",
    telefone: dados.telefone || null,

    // dados fiscais
    nome_razao_social: dados.nome_razao_social || null,
    cpf_cnpj: dados.cpf_cnpj || null,
    endereco: dados.endereco || null,
    cidade: dados.cidade || null,
    estado: dados.estado || null,
    email_fiscal: dados.email_fiscal || null,

    created_at: agora(),
    updated_at: agora(),
  };

  clientes.push(novo);
  return novo;
}

function atualizar(id, dados) {
  const cliente = buscarPorId(id);
  if (!cliente) return null;

  Object.assign(cliente, dados, {
    updated_at: agora(),
  });

  return cliente;
}

module.exports = {
  listar,
  buscarPorId,
  buscarPorTelefone,
  buscarPorNome,
  criar,
  atualizar,
};