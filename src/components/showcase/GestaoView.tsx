"use client";

import { useState } from "react";
import { BarChart3, CreditCard, LayoutDashboard, Package, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppWindow, AreaChart, Avatar, Badge, Card, GhostButton, Meter, Segmented, Stat, type BadgeTone, type NavItem } from "./ui";

const nav: NavItem[] = [
  { label: "Visão geral", icon: LayoutDashboard },
  { label: "Financeiro", icon: CreditCard, badge: "7" },
  { label: "Estoque", icon: Package },
  { label: "Clientes", icon: Users },
  { label: "Relatórios", icon: BarChart3 },
];

const months = ["Nov", "Dez", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out"];
const revenue = [318, 352, 301, 329, 361, 374, 366, 398, 412, 431, 447, 483];
const goal = [330, 340, 345, 350, 360, 370, 380, 390, 400, 410, 425, 440];
const RANGES = ["6 meses", "12 meses"] as const;

const transactions: [string, string, string, string, boolean, BadgeTone, string][] = [
  ["MT", "Marina Tavares", "Venda #2184", "+ R$ 4.280,00", true, "ok", "Recebido"],
  ["RD", "Rafael Duarte", "Fornecedor · embalagens", "− R$ 1.915,40", false, "wait", "Agendado"],
  ["BL", "Beatriz Lemos", "Venda #2183", "+ R$ 9.640,00", true, "ok", "Recebido"],
  ["OR", "Otávio Ramos", "Assinatura anual", "+ R$ 2.390,00", true, "info", "Em conciliação"],
  ["TR", "Transportadora Exemplo", "Frete · outubro", "− R$ 3.072,10", false, "alert", "Vencido"],
];

const segments = [
  { label: "Recorrentes", value: 58, bar: "bg-accent" },
  { label: "Novos", value: 27, bar: "bg-sage" },
  { label: "Em risco", value: 15, bar: "bg-peach" },
];

const topClients: [string, string, string][] = [
  ["Beatriz Lemos", "R$ 38,2 mil", "BL"],
  ["Marina Tavares", "R$ 31,7 mil", "MT"],
  ["Júlia Campos", "R$ 24,9 mil", "JC"],
];

/** Painel de gestão: receita, indicadores, transações e visão de clientes. */
export function GestaoView() {
  const [range, setRange] = useState<(typeof RANGES)[number]>("12 meses");
  const n = range === "6 meses" ? 6 : 12;
  const data = revenue.slice(-n);
  const meta = goal.slice(-n);
  const labels = months.slice(-n);

  return (
    <AppWindow
      path="app.empresa.exemplo / gestao"
      brand="Painel"
      nav={nav}
      active={0}
      user={{ initials: "AM", name: "Ana Martins", role: "Diretora" }}
      title="Visão geral da empresa"
      sub="Outubro · todas as unidades"
      actions={
        <span className="hidden gap-2 @lg:flex">
          <GhostButton>Exportar</GhostButton>
          <GhostButton primary>Novo lançamento</GhostButton>
        </span>
      }
    >
      <div className="grid grid-cols-2 gap-2.5 @3xl:grid-cols-4">
        <Stat label="Receita do mês" value="R$ 483 mil" delta="8,0% vs. setembro" spark={[34, 36, 35, 40, 42, 41, 48]} />
        <Stat label="Margem operacional" value="21,4%" delta="1,2 p.p." spark={[18, 19, 19, 20, 20, 21, 21]} tone="bg-sage" />
        <Stat label="Entrega no prazo" value="94,2%" delta="0,6 p.p." up={false} spark={[96, 95, 95, 94, 95, 94, 94]} tone="bg-lav" />
        <Stat label="Clientes ativos" value="1.284" delta="36 novos" spark={[10, 11, 11, 13, 13, 14, 16]} tone="bg-peach" />
      </div>

      <div className="mt-2.5 grid gap-2.5 @5xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <Card
          title="Desempenho do negócio"
          sub="Receita mensal (R$ mil) e meta"
          right={<Segmented label="Período do gráfico" options={RANGES} value={range} onChange={setRange} />}
        >
          <AreaChart data={data} goal={meta} labels={labels} highlight={data.length - 1} format={(v) => `R$ ${v} mil`} />
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-dim">
            <span className="flex items-center gap-2"><i className="h-0.5 w-4 rounded bg-accent" />Receita</span>
            <span className="flex items-center gap-2"><i className="w-4 border-t-2 border-dashed border-line-strong" />Meta</span>
          </div>
        </Card>

        <Card title="Indicadores operacionais" sub="Situação atual">
          <div className="flex flex-col gap-4">
            <Meter label="Meta de receita" value={91} caption="R$ 483 de 530 mil" />
            <Meter label="Ocupação do estoque" value={72} caption="72%" tone="bg-sage" />
            <Meter label="Atendimento no prazo" value={88} caption="88%" tone="bg-lav" />
            <Meter label="Contas a receber em dia" value={96} caption="96%" tone="bg-peach" />
          </div>
        </Card>
      </div>

      <div className="mt-2.5 grid gap-2.5 @5xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <Card title="Transações recentes" sub="Últimas movimentações" right={<span className="text-[12px] font-medium text-accent">Ver todas</span>}>
          <ul>
            {transactions.map(([ini, name, what, value, plus, tone, status], i) => (
              <li key={what} className="flex items-center gap-3 border-t border-line py-2.5 first:border-0 first:pt-0 last:pb-0">
                <Avatar name={ini} tone={i} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium text-text">{name}</span>
                  <span className="block truncate text-[12px] text-dim">{what}</span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-1 @xl:flex-row @xl:items-center @xl:gap-4">
                  <span className={cn("tnum font-medium", plus ? "text-text" : "text-muted")}>{value}</span>
                  <span className="@xl:w-32 @xl:text-right"><Badge tone={tone}>{status}</Badge></span>
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Clientes" sub="Base por situação">
          <div role="img" aria-label="Recorrentes 58%, novos 27%, em risco 15%" className="flex h-2.5 gap-0.5 overflow-hidden rounded-full">
            {segments.map((s) => (
              <i key={s.label} className={cn("h-full first:rounded-l-full last:rounded-r-full", s.bar)} style={{ width: `${s.value}%` }} />
            ))}
          </div>
          <ul className="mt-3 grid grid-cols-3 gap-2">
            {segments.map((s) => (
              <li key={s.label}>
                <span className="flex items-center gap-1.5 text-[12px] text-dim"><i className={cn("size-2 rounded-full", s.bar)} />{s.label}</span>
                <span className="tnum font-display text-[17px] font-semibold text-text">{s.value}%</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[12px] text-dim">Maiores clientes do mês</p>
          <ul className="mt-1.5">
            {topClients.map(([name, v, ini], i) => (
              <li key={name} className="flex items-center gap-2.5 border-t border-line py-2 first:border-0">
                <Avatar name={ini} tone={i} small />
                <span className="flex-1 truncate text-text">{name}</span>
                <span className="tnum text-muted">{v}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppWindow>
  );
}
