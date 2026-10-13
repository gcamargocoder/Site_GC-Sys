/** Validação compartilhada entre o formulário (cliente) e a rota de API (servidor). */

export const projectTypes = [
  "Sistema sob medida",
  "Plataforma SaaS",
  "Aplicativo",
  "Sistema de gestão",
  "Integração ou automação",
  "Outro projeto",
] as const;

export type ContactPayload = {
  nome: string;
  empresa: string;
  email: string;
  whatsapp: string;
  tipo: string;
  mensagem: string;
  consentimento: boolean;
  /** Honeypot: deve permanecer vazio. */
  website?: string;
};

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(v: Partial<ContactPayload>): FieldErrors {
  const e: FieldErrors = {};
  const nome = (v.nome ?? "").trim();
  const email = (v.email ?? "").trim();
  const whatsapp = (v.whatsapp ?? "").replace(/\D/g, "");
  const mensagem = (v.mensagem ?? "").trim();

  if (nome.length < 2) e.nome = "Informe seu nome.";
  if (!email) e.email = "Informe seu e-mail.";
  else if (!emailRe.test(email)) e.email = "Informe um e-mail válido. Exemplo: nome@empresa.com.br";
  if (whatsapp && (whatsapp.length < 10 || whatsapp.length > 13))
    e.whatsapp = "Informe DDD e número. Exemplo: (11) 99999-9999";
  if (!v.tipo || !(projectTypes as readonly string[]).includes(v.tipo))
    e.tipo = "Selecione o tipo de projeto.";
  if (mensagem.length < 20) e.mensagem = "Descreva a necessidade com pelo menos 20 caracteres.";
  if (mensagem.length > 4000) e.mensagem = "Use no máximo 4.000 caracteres.";
  if (!v.consentimento) e.consentimento = "É necessário concordar com o tratamento dos dados.";
  return e;
}
