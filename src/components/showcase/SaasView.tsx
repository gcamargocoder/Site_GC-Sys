"use client";

import { CreditCard, Layers, LayoutDashboard, Settings2, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppWindow, Avatar, Badge, BarChart, Card, GhostButton, Meter, Stat, type BadgeTone, type NavItem } from "./ui";

const nav: NavItem[] = [
  { label: "Visão geral", icon: LayoutDashboard },
  { label: "Contas", icon: Layers },
  { label: "Usuários", icon: Users },
  { label: "Planos", icon: CreditCard },
  { label: "Ajustes", icon: Settings2 },
];

const plans: [string, string, number, string, string][] = [
  ["Essencial", "R$ 89/mês", 612, "bg-sage", "48%"],
  ["Profissional", "R$ 249/mês", 518, "bg-accent", "40%"],
  ["Empresarial", "R$ 790/mês", 154, "bg-lav", "12%"],
];

const days = ["S", "T", "Q", "Q", "S", "S", "D", "S", "T", "Q", "Q", "S", "S", "D"];
const activity = [62, 71, 68, 80, 74, 31, 24, 66, 78, 83, 88, 81, 36, 29];

const users: [string, string, string, string, BadgeTone, string][] = [
  ["HP", "Helena Prado", "Administradora", "Ativo agora", "ok", "Ativa"],
  ["CM", "Caio Mendonça", "Gestor", "Há 2 h", "ok", "Ativa"],
  ["LB", "Lucas Brandão", "Operador", "Ontem", "ok", "Ativa"],
  ["DF", "Diego Ferraz", "Operador", "Convite enviado", "wait", "Pendente"],
  ["JC", "Júlia Campos", "Leitura", "Há 12 dias", "idle", "Inativa"],
];

/** Plataforma de assinaturas: planos, atividade, usuários e gestão da conta. */
export function SaasView() {
  return (
    <AppWindow
      path="plataforma.exemplo / contas"
      brand="Plataforma"
      nav={nav}
      active={1}
      user={{ initials: "HP", name: "Helena Prado", role: "Administradora" }}
      title="Contas e assinaturas"
      sub="Gestão multiempresa"
      actions={
        <span className="hidden gap-2 @lg:flex">
          <GhostButton>Faturas</GhostButton>
          <GhostButton primary>Convidar usuário</GhostButton>
        </span>
      }
    >
      <div className="grid grid-cols-2 gap-2.5 @3xl:grid-cols-4">
        <Stat label="Assinaturas" value="1.284" delta="36 no mês" spark={[9, 10, 11, 11, 12, 13, 14]} tone="bg-lav" />
        <Stat label="Recorrente (MRR)" value="R$ 96,4 mil" delta="4,7%" spark={[8, 9, 9, 10, 11, 11, 12]} />
        <Stat label="Usuários ativos" value="18.902" delta="5,2%" spark={[14, 15, 16, 16, 17, 18, 19]} tone="bg-sage" />
        <Stat label="Cancelamentos" value="1,8%" delta="0,3 p.p." up={false} spark={[1, 1, 2, 1, 2, 2, 2]} tone="bg-peach" />
      </div>

      <div className="mt-2.5 grid gap-2.5 @5xl:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <Card title="Planos" sub="Assinaturas por plano">
          <div role="img" aria-label="Essencial 48%, Profissional 40%, Empresarial 12%" className="flex h-2.5 gap-0.5 overflow-hidden rounded-full">
            {plans.map(([n, , , bar, share]) => (
              <i key={n} className={cn("h-full first:rounded-l-full last:rounded-r-full", bar)} style={{ width: share }} />
            ))}
          </div>
          <ul className="mt-3">
            {plans.map(([name, price, count, bar, share]) => (
              <li key={name} className="flex items-center gap-3 border-t border-line py-2.5 first:border-0 last:pb-0">
                <i className={cn("size-2.5 shrink-0 rounded-full", bar)} />
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-text">{name}</span>
                  <span className="block text-[12px] text-dim">{price}</span>
                </span>
                <span className="text-right">
                  <span className="tnum block font-display text-[16px] font-semibold text-text">{count}</span>
                  <span className="tnum block text-[12px] text-dim">{share}</span>
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Atividade" sub="Usuários ativos por dia · últimas 2 semanas">
          <BarChart data={activity} labels={days} highlight={10} tone="bg-lav" />
        </Card>
      </div>

      <div className="mt-2.5 grid gap-2.5 @5xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <Card title="Usuários da conta" sub="5 de 18 · Ateliê Exemplo" right={<span className="text-[12px] font-medium text-accent">Gerenciar</span>}>
          <ul>
            {users.map(([ini, name, role, seen, tone, label], i) => (
              <li key={name} className="flex items-center gap-3 border-t border-line py-2.5 first:border-0 first:pt-0 last:pb-0">
                <Avatar name={ini} tone={i + 1} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium text-text">{name}</span>
                  <span className="block truncate text-[12px] text-dim">{role} · {seen}</span>
                </span>
                <Badge tone={tone}>{label}</Badge>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Conta" sub="Ateliê Exemplo" right={<Badge tone="lav">Profissional</Badge>}>
          <div className="flex flex-col gap-4">
            <Meter label="Usuários" value={72} caption="18 de 25" tone="bg-lav" />
            <Meter label="Armazenamento" value={41} caption="41 de 100 GB" tone="bg-accent" />
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-3">
            <div>
              <dt className="text-[12px] text-dim">Próxima fatura</dt>
              <dd className="tnum font-medium text-text">R$ 249,00 · 05/11</dd>
            </div>
            <div>
              <dt className="text-[12px] text-dim">Pagamento</dt>
              <dd className="font-medium text-text">Cartão final 4242</dd>
            </div>
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">
            <GhostButton primary>Alterar plano</GhostButton>
            <GhostButton>Ver faturas</GhostButton>
          </div>
        </Card>
      </div>
    </AppWindow>
  );
}
