// bots/triagem.bot.js

const MENU =
  "Olá! Bem-vindo à Advir Impressos.\n\n" +
  "Para agilizar, o seu atendimento escolha uma opção:\n" +
  "1️⃣ Orçamento\n" +
  "2️⃣ Acompanhar Pedido\n" +
  "3️⃣ Financeiro\n\n" +
  "Responda com 1, 2 ou 3.";

function normalize(text) {
  return String(text || "").trim().toLowerCase();
}

function pickOption(text) {
  const t = normalize(text);

  // opções diretas
  if (t === "1" || t.includes("orçamento") || t.includes("orcamento")) return "orcamento";
  if (t === "2" || t.includes("pedido") || t.includes("acompanhar")) return "acompanhar_pedido";
  if (t === "3" || t.includes("financeiro") || t.includes("pagamento") || t.includes("boleto")) return "financeiro";

  return null;
}

function labelFromTag(tag) {
  if (tag === "orcamento") return "Orçamento";
  if (tag === "acompanhar_pedido") return "Acompanhar Pedido";
  if (tag === "financeiro") return "Financeiro";
  return "Triagem (Robô)";
}

/**
 * Recebe:
 * - atendimento (obj do store)
 * - texto da mensagem
 * Retorna:
 * - { action: 'send_menu' | 'classified' | 'no_action', replyText?, nextTag?, nextStatus? }
 */
function triage(atendimento, incomingText) {
  const tagAtual = atendimento?.tag || null;

  // Se ainda não tem tag => primeira interação / ainda em triagem
  if (!tagAtual || tagAtual === "triagem") {
    const opt = pickOption(incomingText);

    // se cliente já respondeu 1/2/3, classifica
    if (opt) {
      return {
        action: "classified",
        nextTag: opt,
        nextStatus: "nao_atendido",
        replyText: `Perfeito! Vou encaminhar para *${labelFromTag(opt)}* ✅`
      };
    }

    // senão manda menu
    return { action: "send_menu", replyText: MENU };
  }

  // Se já classificado, por enquanto não faz nada (MVP)
  return { action: "no_action" };
}

module.exports = { triage };