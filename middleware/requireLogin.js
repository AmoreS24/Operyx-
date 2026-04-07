// middleware/requireLogin.js
module.exports = function requireLogin(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.status(401).json({ erro: "Não autenticado" });
};