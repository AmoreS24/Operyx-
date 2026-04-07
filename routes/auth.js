const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

/**
 * MVP: usuários em memória
 * role: "admin" | "atendente" | "financeiro"
 */
const users = [
  { id: 1, username: "erick",      name: "Erick",      role: "admin",      passwordHash: bcrypt.hashSync("1234", 10) },
  { id: 2, username: "rafaella",   name: "Rafaella",   role: "atendente",  passwordHash: bcrypt.hashSync("1234", 10) },
  { id: 3, username: "financeiro", name: "Financeiro", role: "financeiro", passwordHash: bcrypt.hashSync("1234", 10) },
];

function safeUser(u) {
  return {
    id: u.id,
    username: u.username,
    name: u.name,
    role: u.role
  };
}

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ erro: "Informe username e password" });
  }

  const user = users.find(
    (u) => u.username.toLowerCase() === String(username).trim().toLowerCase()
  );

  if (!user) {
    return res.status(401).json({ erro: "Usuário ou senha inválidos" });
  }

  const ok = await bcrypt.compare(String(password), user.passwordHash);

  if (!ok) {
    return res.status(401).json({ erro: "Usuário ou senha inválidos" });
  }

  req.session.user = safeUser(user);

  return res.json({
    ok: true,
    user: req.session.user
  });
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

// GET /api/auth/me
router.get("/me", (req, res) => {
  return res.json({
    user: req.session && req.session.user ? req.session.user : null
  });
});

module.exports = router;