import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { validateContact, type ContactPayload } from "@/lib/contact";

/**
 * Entrega dos contatos. Nenhuma credencial vai para o cliente.
 *
 * Configure UM dos provedores abaixo em .env.local / variáveis do host:
 *
 *  A) E-mail via Resend (https://resend.com)
 *     RESEND_API_KEY=...
 *     CONTACT_TO_EMAIL=comercial@seudominio.com.br
 *     CONTACT_FROM_EMAIL="Site <site@seudominio.com.br>"   (domínio verificado no Resend)
 *
 *  B) Webhook genérico (CRM, Make, Zapier, n8n, API própria)
 *     CONTACT_WEBHOOK_URL=https://...
 *     CONTACT_WEBHOOK_TOKEN=...   (opcional, enviado como Bearer)
 *
 * Sem nenhum provedor, a rota responde 503 e o formulário informa o
 * usuário. Nenhuma mensagem é descartada em silêncio.
 */

export const dynamic = "force-dynamic";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Limite best-effort por IP (memória do processo). Em hosts serverless, use também o WAF/edge do provedor. */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60_000;
const MAX_HITS = 5;
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_HITS;
}

export async function POST(req: Request) {
  if (Number(req.headers.get("content-length") ?? 0) > 20_000) {
    return NextResponse.json({ error: "too_large" }, { status: 413 });
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Partial<ContactPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: responde como sucesso para não orientar bots, sem enviar nada.
  if (body.website) return NextResponse.json({ ok: true });

  const errors = validateContact(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: "validation", fields: errors }, { status: 422 });
  }

  const lead = {
    nome: body.nome!.trim(),
    empresa: (body.empresa ?? "").trim(),
    email: body.email!.trim(),
    whatsapp: (body.whatsapp ?? "").trim(),
    tipo: body.tipo!,
    mensagem: body.mensagem!.trim(),
    consentimento: true,
    recebidoEm: new Date().toISOString(),
    origem: siteConfig.url,
  };

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, CONTACT_WEBHOOK_URL, CONTACT_WEBHOOK_TOKEN } =
    process.env;

  try {
    if (RESEND_API_KEY && CONTACT_TO_EMAIL && CONTACT_FROM_EMAIL) {
      const html = `<h2>Novo contato pelo site</h2><ul>${Object.entries(lead)
        .map(([k, v]) => `<li><strong>${esc(k)}:</strong> ${esc(String(v))}</li>`)
        .join("")}</ul>`;
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: CONTACT_FROM_EMAIL,
          to: [CONTACT_TO_EMAIL],
          reply_to: lead.email,
          subject: `Novo contato: ${lead.tipo} — ${lead.nome}`,
          html,
        }),
      });
      if (!res.ok) throw new Error(`resend ${res.status}`);
      return NextResponse.json({ ok: true });
    }

    if (CONTACT_WEBHOOK_URL) {
      const res = await fetch(CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(CONTACT_WEBHOOK_TOKEN ? { Authorization: `Bearer ${CONTACT_WEBHOOK_TOKEN}` } : {}),
        },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
      return NextResponse.json({ ok: true });
    }
  } catch (err) {
    console.error("[contato] falha na entrega:", err);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }

  console.error("[contato] nenhum provedor configurado (RESEND_* ou CONTACT_WEBHOOK_URL).");
  return NextResponse.json({ error: "not_configured" }, { status: 503 });
}
