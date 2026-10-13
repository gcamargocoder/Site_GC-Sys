/**
 * CONFIGURAÇÃO CENTRAL DA EMPRESA
 * ───────────────────────────────────────────────────────────────
 * Todo dado institucional do site vive aqui. Campos vazios ("")
 * não são exibidos no site: o componente correspondente simplesmente
 * omite o item. Nada aqui é fato verificado até que você o preencha.
 *
 * Itens marcados com [REVISAR] são provisórios e devem ser
 * confirmados antes da publicação.
 */

/** Verdadeiro enquanto o domínio real não foi definido (evita indexar o placeholder). */
export const isPlaceholderUrl = !process.env.NEXT_PUBLIC_SITE_URL;

export const siteConfig = {
  /** Nome oficial da marca. */
  name: "GC-Sys",
  /** Razão social para metadados e dados estruturados. [REVISAR] */
  legalName: "",
  /** [REVISAR] Domínio público. Também pode vir de NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com.br",
  tagline: "Engenharia de software para a operação real do seu negócio.",
  description:
    "A GC-Sys desenvolve sistemas sob medida, plataformas SaaS, aplicativos e soluções de gestão para empresas.",
  locale: "pt-BR",

  about: {
    /**
     * História institucional (opcional). Só é exibida se preenchida.
     * Não inclua anos de mercado, números ou clientes sem confirmação.
     */
    story: "",
  },

  contact: {
    /** E-mail comercial. Ex.: "contato@suaempresa.com.br" */
    email: "",
    /** Somente dígitos com DDI e DDD. Ex.: "5511999999999" */
    whatsapp: "",
    /** Texto exibido para o telefone/WhatsApp. Ex.: "+55 11 99999-9999" */
    whatsappDisplay: "",
    /** Cidade/UF exibida no rodapé, se desejado. Ex.: "São Paulo, SP" */
    location: "",
  },

  social: {
    /** URL completa do perfil/empresa no LinkedIn. */
    linkedin: "",
    github: "",
    instagram: "",
  },

  legal: {
    /** Razão social. Não preencher com dados fictícios. */
    companyName: "",
    /** CNPJ no formato 00.000.000/0000-00. */
    cnpj: "",
    /** Endereço completo, se for publicado. */
    address: "",
    /** Responsável pelo tratamento de dados (LGPD) — e-mail do encarregado. */
    dpoEmail: "",
    /** Data da última atualização dos documentos legais. [REVISAR] */
    lastUpdated: "12 de outubro de 2026",
  },

  /**
   * Tecnologias. Marque `confirmed: true` SOMENTE depois de validar
   * que a empresa de fato entrega com a tecnologia.
   * Em produção, itens não confirmados não são exibidos.
   * Em desenvolvimento, aparecem com a marca "A CONFIRMAR".
   */
  technologies: [
    { group: "Interface", name: "React", confirmed: false },
    { group: "Interface", name: "Next.js", confirmed: false },
    { group: "Interface", name: "TypeScript", confirmed: false },
    { group: "Mobile", name: "React Native", confirmed: false },
    { group: "Servidor", name: "Node.js", confirmed: false },
    { group: "Servidor", name: "REST APIs", confirmed: false },
    { group: "Dados", name: "PostgreSQL", confirmed: false },
    { group: "Infraestrutura", name: "Docker", confirmed: false },
    { group: "Infraestrutura", name: "AWS", confirmed: false },
  ] as const satisfies readonly Technology[],
} as const;

export type Technology = {
  group: string;
  name: string;
  confirmed: boolean;
};

export const nav = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "/servicos" },
  { label: "Soluções", href: "/solucoes" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
] as const;

export const legalNav = [
  { label: "Política de privacidade", href: "/privacidade" },
  { label: "Termos de uso", href: "/termos" },
] as const;

export function whatsappUrl(message?: string) {
  const { whatsapp } = siteConfig.contact;
  if (!whatsapp) return "";
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${whatsapp}${text}`;
}

export function visibleTechnologies() {
  const dev = process.env.NODE_ENV !== "production";
  return siteConfig.technologies.filter((t) => t.confirmed || dev);
}
