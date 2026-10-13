import type { GlyphName } from "@/config/content";

/**
 * Sistema de tons: o azul é a identidade; os demais entram como
 * assinatura de cada serviço, sempre em par superfície suave + tinta escura.
 * Classes completas (sem concatenação) para o Tailwind enxergá-las.
 */
export type Tone = "blue" | "lav" | "sage" | "peach" | "teal" | "navy";

export const tones: Record<
  Tone,
  { soft: string; ink: string; dot: string; wash: string; hoverBorder: string; groupInk: string }
> = {
  blue: {
    soft: "bg-accent-soft",
    ink: "text-accent",
    dot: "bg-accent",
    wash: "bg-[linear-gradient(155deg,var(--accent-soft),var(--surface)_72%)]",
    hoverBorder: "hover:border-accent/40",
    groupInk: "group-hover:text-accent",
  },
  lav: {
    soft: "bg-lav-soft",
    ink: "text-lav-ink",
    dot: "bg-lav",
    wash: "bg-[linear-gradient(155deg,var(--lav-soft),var(--surface)_72%)]",
    hoverBorder: "hover:border-lav",
    groupInk: "group-hover:text-lav-ink",
  },
  sage: {
    soft: "bg-sage-soft",
    ink: "text-sage-ink",
    dot: "bg-sage",
    wash: "bg-[linear-gradient(155deg,var(--sage-soft),var(--surface)_72%)]",
    hoverBorder: "hover:border-sage",
    groupInk: "group-hover:text-sage-ink",
  },
  peach: {
    soft: "bg-peach-soft",
    ink: "text-peach-ink",
    dot: "bg-peach",
    wash: "bg-[linear-gradient(155deg,var(--peach-soft),var(--surface)_72%)]",
    hoverBorder: "hover:border-peach",
    groupInk: "group-hover:text-peach-ink",
  },
  teal: {
    soft: "bg-teal-soft",
    ink: "text-teal-ink",
    dot: "bg-teal",
    wash: "bg-[linear-gradient(155deg,var(--teal-soft),var(--surface)_72%)]",
    hoverBorder: "hover:border-teal",
    groupInk: "group-hover:text-teal-ink",
  },
  navy: {
    soft: "bg-navy-soft",
    ink: "text-accent-deep",
    dot: "bg-accent-deep",
    wash: "bg-[linear-gradient(155deg,var(--navy-soft),var(--surface)_72%)]",
    hoverBorder: "hover:border-accent-deep/40",
    groupInk: "group-hover:text-accent-deep",
  },
};

export const glyphTone: Record<GlyphName, Tone> = {
  custom: "blue",
  saas: "lav",
  apps: "peach",
  management: "sage",
  automation: "teal",
  architecture: "navy",
};

export const solutionTone: Record<string, Tone> = {
  gestao: "blue",
  vendas: "peach",
  saas: "lav",
  paineis: "sage",
  automacoes: "teal",
};
