exports.getStatus = (req, res) => {
  res.status(200).json({
    status: 'online',
    sistema: 'ADVIR Atendimento',
    versao: '1.0.0'
  });
};
