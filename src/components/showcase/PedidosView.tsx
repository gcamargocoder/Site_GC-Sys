"use client";

import { useState } from "react";
import { Check, ClipboardList, LayoutDashboard, ShoppingBag, Truck, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppWindow, Avatar, Badge, Card, GhostButton, Stat, type BadgeTone, type NavItem } from "./ui";

const nav: NavItem[] = [
  { label: "Resumo", icon: LayoutDashboard },
  { label: "Pedidos", icon: ClipboardList, badge: "48" },
  { label: "Produtos", icon: ShoppingBag },
  { label: "Entregas", icon: Truck },
  { label: "Clientes", icon: Users },
];

const stages = ["Recebido", "Pagamento", "Separação", "Envio", "Entregue"] as const;
const stageCounts = [12, 9, 14, 8, 5];

type Order = {
  id: string;
  customer: string;
  ini: string;
  items: string;
  total: string;
  date: string;
  stage: number;
  issue?: boolean;
};

const orders: Order[] = [
  { id: "#0148", customer: "Marina Tavares", ini: "MT", items: "3 itens", total: "3.240,00", date: "12/10", stage: 3 },
  { id: "#0147", customer: "Rafael Duarte", ini: "RD", items: "1 item", total: "1.180,50", date: "12/10", stage: 2 },
  { id: "#0146", customer: "Beatriz Lemos", ini: "BL", items: "8 itens", total: "9.870,00", date: "11/10", stage: 4 },
  { id: "#0145", customer: "Otávio Ramos", ini: "OR", items: "2 itens", total: "640,00", date: "11/10", stage: 1, issue: true },
  { id: "#0144", customer: "Júlia Campos", ini: "JC", items: "5 itens", total: "2.415,90", date: "11/10", stage: 0 },
];

function status(o: Order): { tone: BadgeTone; label: string } {
  if (o.issue) return { tone: "alert", label: "Pagamento recusado" };
  return [
    { tone: "info" as const, label: "Novo" },
    { tone: "wait" as const, label: "Aguardando pagamento" },
    { tone: "lav" as const, label: "Em separação" },
    { tone: "info" as const, label: "Em transporte" },
    { tone: "ok" as const, label: "Entregue" },
  ][o.stage];
}

const channels: [string, number, string][] = [
  ["Loja virtual", 46, "bg-accent"],
  ["Representantes", 31, "bg-peach"],
  ["Balcão", 23, "bg-sage"],
];

/** Sistema de pedidos: resumo, fluxo, tabela (lista no mobile) e detalhe do pedido selecionado. */
export function PedidosView() {
  const [selected, setSelected] = useState(orders[0].id);
  const current = orders.find((o) => o.id === selected)!;
  const st = status(current);

  return (
    <AppWindow
      path="app.empresa.exemplo / pedidos"
      brand="Vendas"
      nav={nav}
      active={1}
      user={{ initials: "CF", name: "Camila Freitas", role: "Comercial" }}
      title="Pedidos"
      sub="48 pedidos em andamento"
      actions={
        <span className="hidden gap-2 @lg:flex">
          <GhostButton>Filtros</GhostButton>
          <GhostButton primary>Novo pedido</GhostButton>
        </span>
      }
    >
      <div className="grid grid-cols-2 gap-2.5 @3xl:grid-cols-4">
        <Stat label="Vendas de hoje" value="R$ 28,4 mil" delta="14% vs. ontem" spark={[8, 12, 10, 15, 14, 19, 22]} tone="bg-peach" />
        <Stat label="Pedidos novos" value="37" delta="6 a mais" spark={[20, 24, 22, 28, 26, 31, 37]} />
        <Stat label="Ticket médio" value="R$ 768" delta="2,1%" spark={[7, 7, 8, 7, 8, 8, 8]} tone="bg-sage" />
        <Stat label="Pendentes" value="9" delta="3 a mais" up={false} spark={[4, 5, 5, 6, 6, 7, 9]} tone="bg-lav" />
      </div>

      <Card title="Fluxo dos pedidos" sub="Onde cada pedido está agora" className="mt-2.5">
        <ol className="grid grid-cols-5 gap-1">
          {stages.map((s, i) => {
            const on = i === current.stage;
            return (
              <li key={s} className="min-w-0">
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-colors duration-500",
                    i <= current.stage ? (current.issue && i === current.stage ? "bg-danger" : "bg-accent") : "bg-surface-2",
                  )}
                />
                <span className={cn("mt-2 block text-[10.5px] @md:text-[11.5px] @xl:text-[12px]", on ? "font-medium text-text" : "text-dim")}>
                  {s}
                </span>
                <span className="tnum font-display text-[16px] font-semibold text-text @xl:text-[18px]">{stageCounts[i]}</span>
              </li>
            );
          })}
        </ol>
      </Card>

      <div className="mt-2.5 grid gap-2.5 @5xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <Card title="Pedidos recentes" sub="Toque em um pedido para ver o detalhe">
          {/* Mobile: lista de cartões */}
          <ul className="flex flex-col gap-2 @2xl:hidden">
            {orders.map((o) => {
              const s = status(o);
              const on = o.id === selected;
              return (
                <li key={o.id}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setSelected(o.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors",
                      on ? "border-accent/40 bg-accent-soft/60" : "border-line bg-surface hover:bg-bg-2",
                    )}
                  >
                    <Avatar name={o.ini} tone={Number(o.id.slice(-1))} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="truncate font-medium text-text">{o.customer}</span>
                        <span className="tnum shrink-0 font-medium text-text">R$ {o.total}</span>
                      </span>
                      <span className="mt-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                        <span className="whitespace-nowrap text-[12px] text-dim">{o.id} · {o.items}</span>
                        <Badge tone={s.tone}>{s.label}</Badge>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Telas largas: tabela */}
          <div tabIndex={0} role="region" aria-label="Pedidos recentes (tabela)" className="-mx-3.5 hidden overflow-x-auto @2xl:block @xl:-mx-4">
            <table className="w-full border-collapse">
              <caption className="sr-only">Pedidos recentes (dados demonstrativos)</caption>
              <thead>
                <tr className="border-y border-line bg-bg-2 text-left text-[12px] text-dim">
                  <th className="px-4 py-2 font-medium">Pedido</th>
                  <th className="px-2 py-2 font-medium">Cliente</th>
                  <th className="hidden px-2 py-2 font-medium @4xl:table-cell">Data</th>
                  <th className="px-2 py-2 text-right font-medium">Total (R$)</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => {
                  const s = status(o);
                  const on = o.id === selected;
                  return (
                    <tr
                      key={o.id}
                      onClick={() => setSelected(o.id)}
                      className={cn("cursor-pointer border-b border-line transition-colors last:border-0", on ? "bg-accent-soft/60" : "hover:bg-bg-2")}
                    >
                      <td className="px-4 py-3">
                        <button type="button" aria-pressed={on} onClick={() => setSelected(o.id)} className="rounded font-mono text-text">
                          {o.id}
                        </button>
                      </td>
                      <td className="px-2 py-3">
                        <span className="flex items-center gap-2.5">
                          <Avatar name={o.ini} tone={Number(o.id.slice(-1))} />
                          <span className="min-w-0">
                            <span className="block truncate text-text">{o.customer}</span>
                            <span className="block text-[12px] text-dim">{o.items}</span>
                          </span>
                        </span>
                      </td>
                      <td className="tnum hidden px-2 py-3 @4xl:table-cell">{o.date}</td>
                      <td className="tnum px-2 py-3 text-right text-text">{o.total}</td>
                      <td className="px-4 py-3"><Badge tone={s.tone}>{s.label}</Badge></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="flex flex-col gap-2.5">
          <Card
            title={`Pedido ${current.id}`}
            sub={`${current.customer} · ${current.items}`}
            right={<Badge tone={st.tone}>{st.label}</Badge>}
          >
            <ol aria-live="polite">
              {stages.map((s, i) => {
                const done = i < current.stage || (i === current.stage && !current.issue && current.stage === 4);
                const here = i === current.stage;
                const bad = here && current.issue;
                return (
                  <li key={s} className="relative flex items-center gap-3 pb-3 last:pb-0">
                    {i < stages.length - 1 && (
                      <span aria-hidden className={cn("absolute left-[0.6875rem] top-6 h-[calc(100%-1.25rem)] w-px", i < current.stage ? "bg-accent" : "bg-line")} />
                    )}
                    <span
                      aria-hidden
                      className={cn(
                        "relative grid size-[1.375rem] shrink-0 place-items-center rounded-full border text-white",
                        done ? "border-accent bg-accent" : bad ? "border-danger bg-danger" : here ? "border-accent bg-surface" : "border-line-strong bg-surface",
                      )}
                    >
                      {done ? <Check className="size-3" strokeWidth={2.5} /> : here ? <i className={cn("size-2 rounded-full", bad ? "bg-white" : "bg-accent")} /> : null}
                    </span>
                    <span className={cn(here ? "font-medium text-text" : done ? "text-muted" : "text-dim")}>
                      {s}
                      {bad && <span className="ml-2 text-[12px] font-normal text-danger">precisa de ação</span>}
                    </span>
                  </li>
                );
              })}
            </ol>
          </Card>

          <Card title="Vendas por canal" sub="Participação no mês">
            <div role="img" aria-label="Loja virtual 46%, representantes 31%, balcão 23%" className="flex h-2.5 gap-0.5 overflow-hidden rounded-full">
              {channels.map(([l, v, c]) => (
                <i key={l} className={cn("h-full first:rounded-l-full last:rounded-r-full", c)} style={{ width: `${v}%` }} />
              ))}
            </div>
            <ul className="mt-3 flex flex-col gap-1.5">
              {channels.map(([l, v, c]) => (
                <li key={l} className="flex items-center gap-2 text-text">
                  <i className={cn("size-2 rounded-full", c)} />
                  <span className="flex-1">{l}</span>
                  <span className="tnum text-muted">{v}%</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </AppWindow>
  );
}
