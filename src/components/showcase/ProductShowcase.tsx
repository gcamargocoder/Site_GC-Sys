"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Building2, Layers, ShoppingBag, type LucideIcon } from "lucide-react";
import { cn, EASE } from "@/lib/utils";
import { tones, type Tone } from "@/components/ui/tones";
import { GestaoView } from "./GestaoView";
import { PedidosView } from "./PedidosView";
import { SaasView } from "./SaasView";

type Item = {
  id: "gestao" | "pedidos" | "saas";
  label: string;
  short: string;
  icon: LucideIcon;
  tone: Tone;
  text: string;
  points: string[];
  View: () => React.JSX.Element;
};

const items: Item[] = [
  {
    id: "gestao",
    label: "Gestão Empresarial",
    short: "Gestão",
    icon: Building2,
    tone: "blue",
    text: "Receita, indicadores da operação, movimentações e clientes reunidos em um painel que a diretoria entende de relance.",
    points: ["Resumo de receita", "Indicadores operacionais", "Transações e clientes"],
    View: GestaoView,
  },
  {
    id: "pedidos",
    label: "Pedidos e Vendas",
    short: "Pedidos",
    icon: ShoppingBag,
    tone: "peach",
    text: "Cada pedido com seu status e sua etapa. A equipe vê o que está parado, o que precisa de ação e o que já foi entregue.",
    points: ["Tabela de pedidos", "Fluxo por etapa", "Resumo de vendas"],
    View: PedidosView,
  },
  {
    id: "saas",
    label: "Plataforma SaaS",
    short: "SaaS",
    icon: Layers,
    tone: "lav",
    text: "Planos, assinaturas, usuários e contas em um só lugar, com a atividade da base acompanhada dia a dia.",
    points: ["Assinaturas e planos", "Gestão de usuários", "Atividade e conta"],
    View: SaasView,
  },
];

/** Altura animada: o palco acompanha o tamanho da interface exibida, sem salto. */
function AutoHeight({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [h, setH] = useState<number | "auto">("auto");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setH(e.contentRect.height));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <motion.div animate={{ height: h }} initial={false} transition={{ duration: reduce ? 0 : 0.5, ease: EASE }} className="overflow-hidden">
      <div ref={ref}>{children}</div>
    </motion.div>
  );
}

/** Vitrine interativa: três categorias de software, cada uma com interface própria. */
export function ProductShowcase() {
  const uid = useId();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = items[active];
  const t = tones[current.tone];

  const onKey = (e: React.KeyboardEvent, idx: number) => {
    const last = items.length - 1;
    let next = idx;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = idx === last ? 0 : idx + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = idx === 0 ? last : idx - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div className="flex justify-center">
        <div
          role="tablist"
          aria-label="Categorias de software"
          className="grid w-full grid-cols-3 gap-1 rounded-[1.25rem] border border-line bg-surface/80 p-1 shadow-soft backdrop-blur sm:inline-grid sm:w-auto"
        >
          {items.map((it, idx) => {
            const on = idx === active;
            return (
              <button
                key={it.id}
                ref={(el) => {
                  refs.current[idx] = el;
                }}
                role="tab"
                type="button"
                id={`${uid}-tab-${it.id}`}
                aria-selected={on}
                aria-controls={`${uid}-panel`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(idx)}
                onKeyDown={(e) => onKey(e, idx)}
                className={cn(
                  "relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-center transition-colors duration-300 sm:min-h-12 sm:flex-row sm:gap-2.5 sm:px-6",
                  on ? "text-text" : "text-muted hover:text-text",
                )}
              >
                {on && (
                  <motion.span
                    layoutId={`${uid}-pill`}
                    aria-hidden
                    className="absolute inset-0 rounded-2xl bg-accent-soft"
                    transition={reduce ? { duration: 0 } : { duration: 0.45, ease: EASE }}
                  />
                )}
                <it.icon aria-hidden className={cn("relative size-[1.125rem] shrink-0 transition-colors", on ? "text-accent" : "text-dim")} strokeWidth={1.6} />
                <span className="font-display relative text-[0.8125rem] font-semibold leading-tight tracking-[-0.01em] sm:text-[1rem]">
                  <span className="sm:hidden">{it.short}</span>
                  <span className="hidden sm:inline">{it.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={cn(
          "relative mt-8 overflow-hidden rounded-[1.75rem] border border-line p-2 transition-[background] duration-700 sm:p-6 md:p-10",
          t.wash,
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(var(--line-strong)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom_right,black,transparent_70%)]"
        />
        <div role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${current.id}`} tabIndex={0} className="relative rounded-[1.25rem]">
          <AutoHeight>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={reduce ? false : { opacity: 0, y: 14, scale: 0.995 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.38, ease: EASE }}
                className="pb-1"
              >
                <current.View />
              </motion.div>
            </AnimatePresence>
          </AutoHeight>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start" aria-live="polite">
        <p className="t-body max-w-[60ch]">{current.text}</p>
        <ul className="flex flex-wrap gap-2">
          {current.points.map((p) => (
            <li key={p} className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[0.875rem] text-text">
              <span aria-hidden className={cn("size-1.5 rounded-full", t.dot)} />
              {p}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-[0.8125rem] text-dim">
        Interfaces conceituais com dados fictícios, criadas para ilustrar o padrão de trabalho. Não representam produtos entregues nem clientes reais.
      </p>
    </div>
  );
}
