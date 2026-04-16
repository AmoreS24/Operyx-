const { enviarMensagem } = require('./src/services/whatsappService');
const path = require("path");
const express = require("express");
const session = require("express-session");

// ROTAS
const authRoutes = require("./routes/auth");
const atendimentosRoutes = require("./routes/atendimentos");
const mensagensRoutes = require("./routes/mensagens");
const clientesRoutes = require("./routes/clientes");
const webhooksRoutes = require("./routes/webhooks");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importante para deploy atrás de proxy (Render)
app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "advir_super_sistema",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 8,
    },
  })
);

// logs de diagnóstico
console.log("authRoutes:", typeof authRoutes);
console.log("atendimentosRoutes:", typeof atendimentosRoutes);
console.log("mensagensRoutes:", typeof mensagensRoutes);
console.log("clientesRoutes:", typeof clientesRoutes);
console.log("webhooksRoutes:", typeof webhooksRoutes);

// arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// 🔐 autenticação
app.use("/api", authRoutes);

// 💬 CRM
app.use("/api/atendimentos", atendimentosRoutes);
app.use("/api/mensagens", mensagensRoutes);
app.use("/api/clientes", clientesRoutes);

// 🤖 webhooks
app.use("/webhooks", webhooksRoutes);

// teste API
app.get("/api/teste", (req, res) => {
  res.send("Servidor funcionando");
});

// teste WhatsApp
app.get("/teste-whatsapp", async (req, res) => {
  try {
    await enviarMensagem("5593991889055", "Fala Erick 🚀 integração funcionando!");
    res.send("Mensagem enviada!");
  } catch (error) {
    console.error("Erro no teste-whatsapp:", error.response?.data || error.message);
    res.status(500).send("Erro ao enviar WhatsApp");
  }
});

// fallback api
app.use("/api", (req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

// front
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Operyx rodando na porta ${PORT}`);
});