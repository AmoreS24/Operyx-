let configuracoes = [
  {
    empresa_id: 1,

    valor_minimo_item: 10,
    valor_minimo_pedido: 25,

    percentual_acrescimo_nota_fiscal: 8,
    tipo_nota_padrao: "NFS-e",

    created_at: new Date(),
  }
];

module.exports = {
  buscarPorEmpresa: (empresa_id = 1) => {
    return configuracoes.find(c => c.empresa_id === empresa_id);
  },

  atualizar: (empresa_id, dados) => {
    const config = configuracoes.find(c => c.empresa_id === empresa_id);
    if (!config) return null;

    Object.assign(config, dados);
    return config;
  }
};