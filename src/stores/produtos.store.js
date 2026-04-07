let produtos = [];

module.exports = {
  listar: () => produtos,

  buscarPorId: (id) => produtos.find(p => p.id === id),

  criar: (produto) => {
    const novo = {
      id: produtos.length + 1,
      empresa_id: produto.empresa_id || 1,
      nome: produto.nome,
      categoria: produto.categoria || "geral",
      ativo: true,
      created_at: new Date(),
    };

    produtos.push(novo);
    return novo;
  },

  atualizar: (id, dados) => {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return null;

    Object.assign(produto, dados);
    return produto;
  }
};