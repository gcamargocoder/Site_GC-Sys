import {
  BarChart3,
  Boxes,
  ClipboardList,
  CreditCard,
  Gauge,
  KanbanSquare,
  LayoutDashboard,
  Layers,
  Search,
  Bell,
  Settings2,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Kit de interface para os mockups conceituais.
 * Reproduz padrões reais de software B2B: navegação lateral, KPIs,
 * tabelas com colunas numéricas alinhadas à direita, chips de status
 * (sempre com texto, nunca só cor) e rodapés de paginação.
 */

export const navIcons: Record<string, LucideIcon> = {
  "Visão geral": LayoutDashboard,
  "Pedidos": ClipboardList,
  "Estoque": Boxes,
  "Clientes": Users,
  "Financeiro": CreditCard,
  "Relatórios": BarChart3,
  "Pipeline": KanbanSquare,
  "Contas": Layers,
  "Planos": CreditCard,
  "Uso": Gauge,
  "Registros": ClipboardList,
  "Configurações": Settings2,
};

export function MockFrame({
  path,
  nav,
  active,
  children,
  className,
}: {
  path: string;
  nav: string[];
  active: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "@container overflow-hidden rounded-2xl border border-line bg-surface text-[12px] leading-[1.45] text-muted shadow-lift",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-line bg-bg-2 px-3 py-2.5">
        <div className="flex items-center gap-3">
          <span aria-hidden className="flex gap-1">
            <i className="size-2 rounded-full bg-peach/80" />
            <i className="size-2 rounded-full bg-lav/80" />
            <i className="size-2 rounded-full bg-sage/80" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.02em] text-dim">{path}</span>
        </div>
        <span className="rounded-full border border-line-strong bg-surface px-2 py-0.5 font-mono text-[10px] text-dim">
          Conceitual
        </span>
      </div>
      <div className="grid @3xl:grid-cols-[10.5rem_minmax(0,1fr)]">
        <aside className="hidden flex-col border-r border-line bg-bg-2 @3xl:flex">
          <div className="flex items-center gap-2 border-b border-line px-3 py-3 text-[12px] font-semibold text-text">
            <span aria-hidden className="size-4 rounded-[5px] bg-accent" />
            Sistema
          </div>
          <ul className="flex flex-col gap-px p-2">
            {nav.map((n) => {
              const Icon = navIcons[n] ?? LayoutDashboard;
              const on = n === active;
              return (
                <li
                  key={n}
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5",
                    on ? "bg-accent-soft font-medium text-accent-deep" : "text-dim",
                  )}
                >
                  <Icon aria-hidden className={cn("size-3.5", on && "text-accent")} strokeWidth={1.5} />
                  {n}
                </li>
              );
            })}
          </ul>
          <div className="mt-auto flex items-center gap-2 border-t border-line px-3 py-2.5">
            <span aria-hidden className="grid size-5 place-items-center rounded-full bg-lav-soft font-mono text-[9px] text-lav-ink">
              AM
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[11px] text-text">Ana Martins</span>
              <span className="block text-[10px] text-dim">Administradora</span>
            </span>
          </div>
        </aside>
        <div className="min-w-0">
          <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2 @xl:px-4">
            <span className="flex h-7 w-full max-w-[14rem] items-center gap-1.5 rounded-md border border-line bg-bg-2 px-2 text-[11px] text-dim">
              <Search aria-hidden className="size-3" strokeWidth={1.5} />
              Buscar
              <kbd className="ml-auto font-mono text-[9px] text-dim">Ctrl K</kbd>
            </span>
            <span aria-hidden className="flex items-center gap-3 text-dim">
              <Bell className="size-3.5" strokeWidth={1.5} />
              <i className="size-1.5 rounded-full bg-accent" />
            </span>
          </div>
          <div className="p-3 @xl:p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function PanelTitle({
  title,
  sub,
  right,
}: {
  title: string;
  sub?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        <p className="text-[14px] font-medium tracking-[-0.01em] text-text">{title}</p>
        {sub && <p className="text-[11px] text-dim">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export function Kpi({
  label,
  value,
  delta,
  up,
}: {
  label: string;
  value: string;
  delta: string;
  up?: boolean;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-3">
      <p className="text-[11px] text-dim">{label}</p>
      <p className="tnum mt-1 text-[18px] font-medium leading-none tracking-[-0.03em] text-text @xl:text-[20px]">
        {value}
      </p>
      <div className="mt-2 flex items-end justify-between gap-2">
        <p className={cn("tnum font-mono text-[10px]", up ? "text-sage-ink" : "text-peach-ink")}>
          {up ? "▲" : "▼"} {delta}
        </p>
        <svg viewBox="0 0 40 12" className="hidden h-3 w-10 text-line-strong @xl:block" aria-hidden>
          <polyline
            points={(up ? [8, 7, 9, 5, 6, 3, 4, 1] : [2, 4, 3, 6, 5, 8, 7, 10])
              .map((y, i) => `${i * (40 / 7)},${y + 1}`)
              .join(" ")}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
}

type Tone = "ok" | "wait" | "alert" | "idle";
const toneMap: Record<Tone, { dot: string; text: string }> = {
  ok: { dot: "bg-sage", text: "bg-sage-soft text-sage-ink" },
  wait: { dot: "bg-peach", text: "bg-peach-soft text-peach-ink" },
  alert: { dot: "bg-danger", text: "bg-[#fbe9e4] text-danger" },
  idle: { dot: "bg-line-strong", text: "bg-surface-2 text-muted" },
};

export function Chip({ tone = "idle", children }: { tone?: Tone; children: React.ReactNode }) {
  const t = toneMap[tone];
  return (
    <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium", t.text)}>
      <i aria-hidden className={cn("size-1.5 rounded-full", t.dot)} />
      {children}
    </span>
  );
}

export function Bars({
  data,
  labels,
  highlight,
  height = 132,
}: {
  data: number[];
  labels: string[];
  highlight: number;
  height?: number;
}) {
  const max = Math.max(...data);
  return (
    <div className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-2">
      <div
        aria-hidden
        className="relative font-mono text-[9px] tabular-nums text-dim"
        style={{ height }}
      >
        {[max, Math.round((max * 2) / 3), Math.round(max / 3), 0].map((v, g) => (
          <span key={g} className="absolute right-0 -translate-y-1/2" style={{ top: `${(g / 3) * 100}%` }}>
            {v}
          </span>
        ))}
      </div>
      <div className="relative" style={{ height }}>
        {[0, 1, 2, 3].map((g) => (
          <i
            key={g}
            aria-hidden
            className="absolute inset-x-0 border-t border-line"
            style={{ top: `${(g / 3) * 100}%` }}
          />
        ))}
        <div className="absolute inset-0 flex items-end gap-1 @xl:gap-1.5">
          {data.map((v, i) => (
            <div
              key={i}
              className={cn(
                "relative flex-1 rounded-t-[4px]",
                i === highlight ? "bg-accent" : "bg-[#cfdcee]",
              )}
              style={{ height: `${(v / max) * 100}%` }}
            >
              {i === highlight && (
                <span className="absolute -top-5 right-0 rounded bg-accent-deep px-1 font-mono text-[9px] leading-4 text-white">
                  {v}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="col-start-2 mt-1.5 flex gap-1 @xl:gap-1.5 font-mono text-[9px] uppercase text-dim">
        {labels.map((l, i) => (
          <span key={i} className="flex-1 text-center">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

export const th = "px-2 py-2 text-left text-[11px] font-medium text-dim";
export const td = "px-2 py-2.5";
