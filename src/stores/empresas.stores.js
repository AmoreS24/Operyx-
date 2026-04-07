let empresas = [
  {
    id: 1,
    nome: "Operyx",
    created_at: new Date(),
  },
];

module.exports = {
  listar: () => empresas,

  buscarPorId: (id) => empresas.find(e => e.id === id),

  criar: (empresa) => {
    const nova = {
      id: empresas.length + 1,
      ...empresa,
      created_at: new Date(),
    };
    empresas.push(nova);
    return nova;
  }
};