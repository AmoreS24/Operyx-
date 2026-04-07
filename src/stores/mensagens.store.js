let mensagens = [];

module.exports = {
  listar: () => mensagens,

  listarPorAtendimento: (atendimento_id) => {
    return mensagens.filter(m => m.atendimento_id === atendimento_id);
  },

  criar: (mensagem) => {
    const nova = {
      id: mensagens.length + 1,
      empresa_id: mensagem.empresa_id || 1,
      atendimento_id: mensagem.atendimento_id,

      tipo: mensagem.tipo || "texto", // texto, imagem, audio, pdf, sistema
      conteudo: mensagem.conteudo || "",
      arquivo_url: mensagem.arquivo_url || null,

      origem: mensagem.origem || "cliente", // cliente, atendente, sistema, bot

      created_at: new Date(),
    };

    mensagens.push(nova);
    return nova;
  }
};