import { useId } from "react";
import { Bell, Search, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Primitivas das interfaces da vitrine.
 * Tudo responde ao tamanho do próprio quadro (container queries), não da tela:
 * abaixo de @3xl a barra lateral vira barra inferior e tabelas viram listas.
 */

export type NavItem = { label: string; icon: LucideIcon; badge?: string };

export function AppWindow({
  path,
  brand,
  nav,
  active,
  user,
  title,
  sub,
  actions,
  children,
}: {
  path: string;
  brand: string;
  nav: NavItem[];
  active: number;
  user: { initials: string; name: string; role: string };
  title: string;
  sub: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="@container overflow-hidden rounded-[1.25rem] border border-line bg-surface text-[13px] leading-[1.45] text-muted shadow-lift">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-bg-2 px-3.5 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <span aria-hidden className="flex shrink-0 gap-1.5">
            <i className="size-2.5 rounded-full bg-peach/80" />
            <i className="size-2.5 rounded-full bg-lav/80" />
            <i className="size-2.5 rounded-full bg-sage/80" />
          </span>
          <span className="truncate font-mono text-[11px] text-dim">{path}</span>
        </div>
        <span className="shrink-0 rounded-full border border-line-strong bg-surface px-2.5 py-0.5 text-[11px] font-medium text-dim">
          Dados demonstrativos
        </span>
      </div>

      <div className="grid @3xl:grid-cols-[13.5rem_minmax(0,1fr)]">
        <aside className="hidden flex-col border-r border-line bg-bg-2 @3xl:flex">
          <div className="flex items-center gap-2.5 px-4 py-4 text-[14px] font-semibold text-text">
            <span aria-hidden className="grid size-6 place-items-center rounded-lg bg-accent">
              <i className="size-2 rounded-[3px] bg-white" />
            </span>
            {brand}
          </div>
          <ul className="flex flex-col gap-0.5 px-2.5 pb-2">
            {nav.map((n, i) => {
              const on = i === active;
              return (
                <li
                  key={n.label}
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-2.5 py-2",
                    on ? "bg-surface font-medium text-text shadow-soft" : "text-dim",
                  )}
                >
                  <n.icon aria-hidden className={cn("size-4", on && "text-accent")} strokeWidth={1.6} />
                  <span className="flex-1">{n.label}</span>
                  {n.badge && (
                    <span className="rounded-full bg-accent-soft px-1.5 text-[10px] font-medium text-accent-deep">
                      {n.badge}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-auto flex items-center gap-2.5 border-t border-line px-4 py-3">
            <Avatar name={user.initials} tone={2} />
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[12px] font-medium text-text">{user.name}</span>
              <span className="block text-[11px] text-dim">{user.role}</span>
            </span>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex items-center justify-between gap-3 border-b border-line px-3.5 py-2.5 @xl:px-5">
            <span className="flex h-8 w-full max-w-[16rem] items-center gap-2 rounded-lg border border-line bg-bg-2 px-2.5 text-dim">
              <Search aria-hidden className="size-3.5" strokeWidth={1.6} />
              Buscar
              <kbd className="ml-auto hidden font-mono text-[10px] @xl:inline">Ctrl K</kbd>
            </span>
            <span aria-hidden className="flex shrink-0 items-center gap-3 text-dim">
              <span className="relative">
                <Bell className="size-4" strokeWidth={1.6} />
                <i className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-accent ring-2 ring-surface" />
              </span>
              <Avatar name={user.initials} tone={2} className="@3xl:hidden" />
            </span>
          </div>

          <div className="p-3.5 @xl:p-5">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
              <div>
                <p className="font-display text-[18px] font-semibold tracking-[-0.02em] text-text @xl:text-[20px]">
                  {title}
                </p>
                <p className="text-[12px] text-dim">{sub}</p>
              </div>
              {actions}
            </div>
            {children}
          </div>

          {/* Navegação inferior: o equivalente mobile da barra lateral */}
          <ul className="grid border-t border-line bg-bg-2 px-1 py-1.5 @3xl:hidden" style={{ gridTemplateColumns: `repeat(${nav.slice(0, 5).length}, minmax(0, 1fr))` }}>
            {nav.slice(0, 5).map((n, i) => {
              const on = i === active;
              return (
                <li
                  key={n.label}
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "flex flex-col items-center gap-0.5 rounded-lg py-1.5 text-[10.5px]",
                    on ? "bg-surface font-medium text-accent-deep shadow-soft" : "text-dim",
                  )}
                >
                  <n.icon aria-hidden className={cn("size-4", on && "text-accent")} strokeWidth={1.6} />
                  {n.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Card({
  title,
  sub,
  right,
  className,
  children,
}: {
  title?: string;
  sub?: string;
  right?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("min-w-0 rounded-2xl border border-line bg-surface p-3.5 @xl:p-4", className)}>
      {title && (
        <header className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[14px] font-semibold tracking-[-0.01em] text-text">{title}</h3>
            {sub && <p className="text-[12px] text-dim">{sub}</p>}
          </div>
          {right}
        </header>
      )}
      {children}
    </section>
  );
}

const avatarTones = [
  "bg-accent-soft text-accent-deep",
  "bg-sage-soft text-sage-ink",
  "bg-lav-soft text-lav-ink",
  "bg-peach-soft text-peach-ink",
];

export function Avatar({ name, tone = 0, className, small }: { name: string; tone?: number; className?: string; small?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-semibold",
        small ? "size-6 text-[9.5px]" : "size-7 text-[10.5px]",
        avatarTones[tone % avatarTones.length],
        className,
      )}
    >
      {name}
    </span>
  );
}

export type BadgeTone = "ok" | "wait" | "alert" | "info" | "lav" | "idle";
const badgeTones: Record<BadgeTone, { box: string; dot: string }> = {
  ok: { box: "bg-sage-soft text-sage-ink", dot: "bg-sage" },
  wait: { box: "bg-peach-soft text-peach-ink", dot: "bg-peach" },
  alert: { box: "bg-[#fbe9e4] text-[#873623]", dot: "bg-danger" },
  info: { box: "bg-accent-soft text-accent-deep", dot: "bg-accent" },
  lav: { box: "bg-lav-soft text-lav-ink", dot: "bg-lav" },
  idle: { box: "bg-surface-2 text-muted", dot: "bg-line-strong" },
};

export function Badge({ tone = "idle", children }: { tone?: BadgeTone; children: React.ReactNode }) {
  const t = badgeTones[tone];
  return (
    <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-[11.5px] font-medium", t.box)}>
      <i aria-hidden className={cn("size-1.5 rounded-full", t.dot)} />
      {children}
    </span>
  );
}

export function Stat({
  label,
  value,
  delta,
  up = true,
  spark,
  tone = "bg-accent",
}: {
  label: string;
  value: string;
  delta: string;
  up?: boolean;
  spark?: number[];
  tone?: string;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-line bg-surface p-3.5">
      <div className="flex items-center gap-2">
        <i aria-hidden className={cn("size-2 rounded-full", tone)} />
        <p className="truncate text-[12px] text-dim">{label}</p>
      </div>
      <p className="tnum mt-1.5 font-display text-[21px] font-semibold leading-none tracking-[-0.03em] text-text @xl:text-[23px]">
        {value}
      </p>
      <div className="mt-2.5 flex items-end justify-between gap-2">
        <p className={cn("tnum text-[11.5px] font-medium", up ? "text-sage-ink" : "text-peach-ink")}>
          {up ? "▲" : "▼"} {delta}
        </p>
        {spark && <Spark data={spark} className={up ? "text-sage" : "text-peach"} />}
      </div>
    </div>
  );
}

export function Spark({ data, className }: { data: number[]; className?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * 48},${14 - ((v - min) / (max - min || 1)) * 12}`)
    .join(" ");
  return (
    <svg viewBox="0 0 48 16" aria-hidden className={cn("hidden h-4 w-12 shrink-0 @xl:block", className)}>
      <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function Meter({
  label,
  value,
  caption,
  tone = "bg-accent",
}: {
  label: string;
  value: number;
  caption: string;
  tone?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-text">{label}</span>
        <span className="tnum text-[12px] text-dim">{caption}</span>
      </div>
      <div
        role="img"
        aria-label={`${label}: ${value}%`}
        className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-2"
      >
        <i className={cn("block h-full rounded-full", tone)} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-lg bg-surface-2 p-0.5">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={o === value}
          onClick={() => onChange(o)}
          className={cn(
            "min-h-7 rounded-md px-2.5 text-[12px] font-medium transition-colors",
            o === value ? "bg-surface text-text shadow-soft" : "text-dim hover:text-text",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function GhostButton({ children, primary }: { children: React.ReactNode; primary?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-[12px] font-medium",
        primary ? "bg-accent text-white" : "border border-line-strong bg-surface text-text",
      )}
    >
      {children}
    </span>
  );
}

/** Gráfico de área com curva suave e meta tracejada. Rótulos ficam em HTML (não distorcem). */
export function AreaChart({
  data,
  goal,
  labels,
  highlight,
  format,
  color = "var(--accent)",
}: {
  data: number[];
  goal?: number[];
  labels: string[];
  highlight: number;
  format: (v: number) => string;
  color?: string;
}) {
  const uid = useId();
  const all = [...data, ...(goal ?? [])];
  const max = Math.max(...all) * 1.08;
  const min = Math.min(...all) * 0.82;
  const X = (i: number) => (i / (data.length - 1)) * 100;
  const Y = (v: number) => 100 - ((v - min) / (max - min)) * 100;
  const curve = (arr: number[]) =>
    arr
      .map((v, i) => {
        if (i === 0) return `M ${X(i)} ${Y(v)}`;
        const mx = (X(i - 1) + X(i)) / 2;
        return `C ${mx} ${Y(arr[i - 1])}, ${mx} ${Y(v)}, ${X(i)} ${Y(v)}`;
      })
      .join(" ");
  const line = curve(data);
  const tipLeft = Math.min(Math.max(X(highlight), 12), 88);
  return (
    <div className="grid grid-cols-1 gap-y-1.5">
      <div className="relative h-44 @xl:h-52" role="img" aria-label={`Gráfico de desempenho. Último ponto: ${format(data[highlight])}.`}>
        {[0, 1, 2, 3].map((g) => (
          <i key={g} aria-hidden className="absolute inset-x-0 border-t border-dashed border-line" style={{ top: `${(g / 3) * 100}%` }} />
        ))}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className="absolute inset-0 size-full overflow-visible">
          <defs>
            <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={color} stopOpacity="0.22" />
              <stop offset="1" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${line} L 100 100 L 0 100 Z`} fill={`url(#${uid}-fill)`} />
          {goal && (
            <path d={curve(goal)} fill="none" stroke="var(--line-strong)" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
          )}
          <path d={line} fill="none" stroke={color} strokeWidth="2.25" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
        <i
          aria-hidden
          className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface bg-accent shadow-soft"
          style={{ left: `${X(highlight)}%`, top: `${Y(data[highlight])}%`, background: color }}
        />
        <span
          aria-hidden
          className="tnum absolute -translate-x-1/2 -translate-y-[170%] whitespace-nowrap rounded-lg bg-accent-deep px-2 py-1 text-[11px] font-medium text-white shadow-soft"
          style={{ left: `${tipLeft}%`, top: `${Y(data[highlight])}%` }}
        >
          {format(data[highlight])}
        </span>
      </div>
      <div aria-hidden className="flex justify-between text-[11px] text-dim">
        {labels.map((l, i) => (
          <span key={`${l}-${i}`} className="flex-1 text-center first:text-left last:text-right">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

export function BarChart({
  data,
  labels,
  highlight,
  tone = "bg-lav",
  height = "h-40",
}: {
  data: number[];
  labels: string[];
  highlight: number;
  tone?: string;
  height?: string;
}) {
  const max = Math.max(...data);
  return (
    <div>
      <div className={cn("relative flex items-end gap-1 @xl:gap-1.5", height)}>
        {[0, 1, 2].map((g) => (
          <i key={g} aria-hidden className="absolute inset-x-0 border-t border-dashed border-line" style={{ top: `${(g / 3) * 100}%` }} />
        ))}
        {data.map((v, i) => (
          <i
            key={i}
            aria-hidden
            className={cn("relative z-10 flex-1 rounded-t-md", i === highlight ? tone : "bg-lav/30")}
            style={{ height: `${(v / max) * 100}%` }}
          />
        ))}
      </div>
      <div aria-hidden className="mt-1.5 flex gap-1 text-[10.5px] text-dim @xl:gap-1.5">
        {labels.map((l, i) => (
          <span key={i} className="flex-1 text-center">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
