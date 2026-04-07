const express = require('express');
const router = express.Router();

router.get('/status', (req, res) => {
  res.status(200).json({
    status: 'online',
    sistema: 'ADVIR Atendimento',
    versao: '1.0.0'
  });
});

module.exports = router;
