// middleware/requireRole.js
module.exports = function requireRole(...allowedRoles) {
  return function (req, res, next) {
    const role = req.session && req.session.user && req.session.user.role;

    if (!role) return res.status(401).json({ erro: "Não autenticado" });

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ erro: "Sem permissão" });
    }

    return next();
  };
};