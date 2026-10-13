import { Check, Plug, Users } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Composição de produto do hero: um ecossistema de gestão em camadas
 * (vendas, pedidos, clientes e integrações) com padrões reais de
 * interface B2B. Tudo em `em`, escalando a partir da largura do palco
 * (36em × 37em) no desktop; no mobile vira uma pilha com tipografia real.
 *
 * Todos os dados são demonstrativos.
 */

type Pos = { x: number; y: number; w: number; h: number };
const W = 36;
const H = 37;
const pos = {
  vendas: { x: 0, y: 0, w: 24, h: 19.5 },
  clientes: { x: 25.5, y: 2, w: 10.5, h: 12.8 },
  pedidos: { x: 0, y: 21.5, w: 24, h: 13.4 },
  integr: { x: 25.5, y: 16.4, w: 10.5, h: 20.6 },
  toast: { x: 7.5, y: 33, w: 15.8, h: 3.9 },
} satisfies Record<string, Pos>;

function place(p: Pos, order: number, extra?: string) {
  return {
    className: cn(
      "fade-in rounded-[0.9em] border border-line bg-surface shadow-lift md:absolute md:left-[var(--x)] md:top-[var(--y)] md:h-[var(--h)] md:w-[var(--w)]",
      extra,
    ),
    style: {
      "--x": `${(p.x / W) * 100}%`,
      "--y": `${(p.y / H) * 100}%`,
      "--w": `${(p.w / W) * 100}%`,
      "--h": `${(p.h / H) * 100}%`,
      "--d": 450 + order * 170,
    } as React.CSSProperties,
  };
}

function Head({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2 px-[1em] pt-[0.85em]">
      <span className="text-[0.8em] font-semibold tracking-[-0.01em] text-text">{title}</span>
      {right}
    </div>
  );
}

const revenue = [34, 38, 36, 44, 42, 51, 48, 58, 55, 64, 62, 74];
const goal = [40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62];

function RevenueChart() {
  const max = 80;
  const lo = 22;
  const y = (v: number) => 40 - ((v - lo) / (max - lo)) * 40;
  const pt = (v: number, i: number) => `${(i / 11) * 100},${y(v)}`;
  const line = revenue.map(pt).join(" ");
  const last = revenue[11];
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-full w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="hero-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.22" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 13.3, 26.6, 40].map((y) => (
          <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="var(--line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
        <polyline
          points={goal.map(pt).join(" ")}
          fill="none"
          stroke="var(--dim)"
          strokeOpacity="0.55"
          strokeWidth="1"
          strokeDasharray="3 3"
          vectorEffect="non-scaling-stroke"
        />
        <polygon points={`0,40 ${line} 100,40`} fill="url(#hero-area)" className="fade-in" style={{ "--d": 1300 } as React.CSSProperties} />
        <polyline
          points={line}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
          style={{ animation: "draw 1.6s var(--ease) 0.9s forwards" }}
        />
      </svg>
      <span
        aria-hidden
        className="fade-in absolute right-0 size-[0.8em] -translate-y-1/2 translate-x-1/2 rounded-full border-2 border-surface bg-accent shadow-soft"
        style={{ top: `${(y(last) / 40) * 100}%`, "--d": 2300 } as React.CSSProperties}
      />
    </div>
  );
}

type Tone = "blue" | "sage" | "peach" | "lav";
const tint: Record<Tone, string> = {
  blue: "bg-accent-soft text-accent-deep",
  sage: "bg-sage-soft text-sage-ink",
  peach: "bg-peach-soft text-peach-ink",
  lav: "bg-lav-soft text-lav-ink",
};

function Badge({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center whitespace-nowrap rounded-full px-[0.7em] py-[0.15em] text-[0.88em] font-medium leading-[1.6]", tint[tone])}>
      {children}
    </span>
  );
}

const orders: [string, string, string, Tone, string][] = [
  ["0148", "Cliente 07", "3.240,00", "sage", "Faturado"],
  ["0147", "Cliente 22", "1.180,50", "peach", "Em separação"],
  ["0146", "Cliente 03", "9.870,00", "blue", "Entregue"],
  ["0145", "Cliente 15", "640,00", "lav", "Aguardando"],
];

const customers: [string, string, string, Tone][] = [
  ["C7", "Cliente 07", "12 pedidos", "lav"],
  ["C2", "Cliente 22", "8 pedidos", "sage"],
  ["C3", "Cliente 03", "5 pedidos", "peach"],
];

const integrations: [string, string, "ok" | "wait"][] = [
  ["Nota fiscal", "Operando", "ok"],
  ["Loja virtual", "Sincronizado", "ok"],
  ["Pagamentos", "Operando", "ok"],
  ["Estoque", "Agendado", "wait"],
];

export function HeroSystem({ className }: { className?: string }) {
  return (
    <figure className={cn("w-full", className)}>
      <div
        role="img"
        aria-label="Representação conceitual de um sistema de gestão: painel de vendas, pedidos recentes com status, carteira de clientes e integrações. Dados demonstrativos."
        className="@container mx-auto max-w-[46rem] xl:max-w-none"
      >
        <div className="relative">
          {/* Base tonal atrás da composição */}
          <div
            aria-hidden
            className="absolute -inset-[3%] hidden rounded-[2rem] bg-[linear-gradient(150deg,var(--bg-3)_0%,var(--bg-2)_55%,var(--peach-soft)_140%)] md:block"
          />
          <div className="relative flex flex-col gap-3 text-[1.0625rem] md:block md:aspect-[36/37] md:text-[length:calc(100cqw/36)]">
            {/* Vendas */}
            <div {...place(pos.vendas, 0, "flex flex-col")}>
              <Head
                title="Vendas"
                right={
                  <span className="flex rounded-full bg-surface-2 p-[0.2em] text-[0.62em] font-medium text-dim" aria-hidden>
                    <span className="px-[0.8em] py-[0.2em]">7d</span>
                    <span className="rounded-full bg-surface px-[0.8em] py-[0.2em] text-text shadow-soft">30d</span>
                    <span className="px-[0.8em] py-[0.2em]">90d</span>
                  </span>
                }
              />
              <div className="flex items-baseline gap-[0.7em] px-[1em] pt-[0.7em]">
                <span className="tnum text-[1.7em] font-semibold leading-none tracking-[-0.04em] text-text">R$ 482.600</span>
                <span className="rounded-full bg-sage-soft px-[0.6em] py-[0.15em] font-mono text-[0.6em] text-sage-ink">+8,4%</span>
              </div>
              <p className="px-[1em] pt-[0.3em] text-[0.62em] text-dim">Receita acumulada · meta mensal em tracejado</p>
              <div className="flex-1 px-[1em] pb-[0.3em] pt-[0.9em] max-md:h-[9em] md:min-h-0">
                <RevenueChart />
              </div>
              <div className="flex justify-between px-[1em] pb-[0.9em] font-mono text-[0.58em] text-dim">
                <span>Sem 1</span>
                <span>Sem 2</span>
                <span>Sem 3</span>
                <span>Sem 4</span>
              </div>
            </div>

            {/* Clientes */}
            <div {...place(pos.clientes, 2, "max-md:order-3")}>
              <Head
                title="Clientes"
                right={<Users aria-hidden className="size-[1em] text-dim" strokeWidth={1.5} />}
              />
              <p className="px-[1em] pt-[0.4em] text-[0.62em] text-dim">Mais ativos no mês</p>
              <ul className="px-[1em] pb-[0.6em] pt-[0.3em]">
                {customers.map(([ini, name, n, tone]) => (
                  <li key={ini} className="flex items-center gap-[0.6em] border-t border-line py-[0.5em] first:border-0">
                    <span className={cn("grid size-[1.9em] shrink-0 place-items-center rounded-full text-[0.6em] font-semibold", tint[tone])}>
                      {ini}
                    </span>
                    <span className="min-w-0 leading-tight">
                      <span className="block truncate text-[0.68em] font-medium text-text">{name}</span>
                      <span className="block text-[0.58em] text-dim">{n}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pedidos */}
            <div {...place(pos.pedidos, 1, "max-md:order-2")}>
              <Head
                title="Pedidos recentes"
                right={
                  <span className="flex gap-[0.4em] text-[0.6em] font-medium" aria-hidden>
                    <span className="rounded-full bg-accent-soft px-[0.8em] py-[0.2em] text-accent-deep">Todos</span>
                    <span className="rounded-full border border-line px-[0.8em] py-[0.2em] text-dim">Em aberto</span>
                  </span>
                }
              />
              <div className="px-[1em] pb-[0.8em] pt-[0.5em]">
                <div className="grid grid-cols-[3.2em_1fr_auto_6.6em] gap-x-[0.8em] pb-[0.4em] text-[0.58em] text-dim">
                  <span>Pedido</span>
                  <span>Cliente</span>
                  <span className="text-right">Total (R$)</span>
                  <span className="text-right">Status</span>
                </div>
                <ul>
                  {orders.map(([id, c, v, tone, s]) => (
                    <li
                      key={id}
                      className="grid grid-cols-[3.2em_1fr_auto_6.6em] items-center gap-x-[0.8em] border-t border-line py-[0.5em] text-[0.68em]"
                    >
                      <span className="font-mono text-dim">#{id}</span>
                      <span className="truncate text-text">{c}</span>
                      <span className="tnum text-right text-text">{v}</span>
                      <span className="text-right">
                        <Badge tone={tone}>{s}</Badge>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Integrações e fluxo */}
            <div {...place(pos.integr, 3, "max-md:order-4")}>
              <Head
                title="Integrações"
                right={<Plug aria-hidden className="size-[1em] text-dim" strokeWidth={1.5} />}
              />
              <ul className="px-[1em] pb-[0.8em] pt-[0.4em]">
                {integrations.map(([n, st, tone]) => (
                  <li key={n} className="flex items-center justify-between gap-[0.5em] border-t border-line py-[0.6em] first:border-0">
                    <span className="text-[0.68em] text-text">{n}</span>
                    <span className={cn("flex items-center gap-[0.4em] text-[0.58em]", tone === "ok" ? "text-sage-ink" : "text-peach-ink")}>
                      <i aria-hidden className={cn("size-[0.6em] rounded-full", tone === "ok" ? "bg-sage" : "bg-peach")} />
                      {st}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mx-[1em] border-t border-line pt-[0.7em]">
                <p className="text-[0.58em] text-dim">Fluxo do pedido</p>
                <ol className="mt-[0.5em] flex items-center gap-[0.3em]" aria-hidden>
                  {["bg-accent", "bg-accent", "bg-accent/40", "bg-line-strong"].map((c, i) => (
                    <li key={i} className={cn("h-[0.35em] flex-1 rounded-full", c)} />
                  ))}
                </ol>
                <p className="mt-[0.5em] text-[0.58em] text-muted">Faturamento · etapa 2 de 4</p>
              </div>
            </div>

            {/* Evento em tempo real */}
            <div {...place(pos.toast, 4, "hidden items-center gap-[0.8em] px-[0.9em] md:flex")}>
              <span className="grid size-[2em] shrink-0 place-items-center rounded-full bg-sage-soft text-sage-ink">
                <Check aria-hidden className="size-[1.1em]" strokeWidth={2.25} />
              </span>
              <span className="leading-tight">
                <span className="block text-[0.7em] font-semibold text-text">Pedido #0148 faturado</span>
                <span className="block text-[0.58em] text-dim">Nota fiscal emitida · agora</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-6 flex items-center gap-2.5 text-[0.8125rem] text-dim">
        <span aria-hidden className="size-1.5 rounded-full bg-sage" />
        Representação conceitual · dados demonstrativos
      </figcaption>
    </figure>
  );
}
