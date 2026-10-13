import { Bell, Database, Download, Filter, GitBranch, Mail, Search, Zap } from "lucide-react";
import type { SolutionId } from "@/config/content";
import { cn } from "@/lib/utils";
import { Bars, Chip, Kpi, MockFrame, PanelTitle, td, th } from "./mock-kit";

/* ───────────── 1. Gestão empresarial ───────────── */

function GestaoMock() {
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  const data = [42, 48, 45, 53, 58, 55, 63, 61, 70, 74, 69, 82];
  const alerts = [
    ["Estoque abaixo do mínimo", "12 itens", "wait"],
    ["Pedidos sem faturamento", "7 pedidos", "alert"],
    ["Contas a receber vencidas", "R$ 18.420", "alert"],
    ["Integração fiscal", "Operando", "ok"],
  ] as const;
  return (
    <MockFrame
      path="gestao / visão geral"
      active="Visão geral"
      nav={["Visão geral", "Pedidos", "Estoque", "Clientes", "Financeiro", "Relatórios"]}
    >
      <PanelTitle title="Visão geral da operação" sub="Outubro · todas as unidades" />
      <div className="grid grid-cols-2 gap-2 @xl:grid-cols-4">
        <Kpi label="Receita" value="R$ 482,6 mil" delta="8,4%" up />
        <Kpi label="Pedidos em aberto" value="128" delta="12 a mais" up={false} />
        <Kpi label="Ticket médio" value="R$ 3.771" delta="2,1%" up />
        <Kpi label="Entrega no prazo" value="94,2%" delta="1,3 p.p." up />
      </div>
      <div className="mt-2 grid gap-2 @xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-xl border border-line bg-surface p-3">
          <PanelTitle title="Receita mensal" sub="Últimos 12 meses" />
          <Bars data={data} labels={months} highlight={11} />
        </div>
        <div className="rounded-xl border border-line bg-surface p-3">
          <PanelTitle title="Atenção hoje" />
          <ul>
            {alerts.map(([t, v, tone]) => (
              <li key={t} className="flex items-center justify-between gap-3 border-t border-line py-2">
                <span className="min-w-0 truncate text-muted">{t}</span>
                <Chip tone={tone}>{v}</Chip>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MockFrame>
  );
}

/* ───────────── 2. Vendas e pedidos ───────────── */

function VendasMock() {
  const cols = [
    { name: "Qualificação", total: "R$ 214.000", deals: [["Proposta 031", "R$ 48.000"], ["Proposta 034", "R$ 92.500"]] },
    { name: "Proposta enviada", total: "R$ 186.400", deals: [["Proposta 027", "R$ 72.400"], ["Proposta 029", "R$ 114.000"]] },
    { name: "Negociação", total: "R$ 129.800", deals: [["Proposta 022", "R$ 129.800"]] },
    { name: "Fechado", total: "R$ 96.300", deals: [["Proposta 018", "R$ 96.300"]] },
  ];
  const orders: [string, string, string, string, "ok" | "wait" | "alert" | "idle", string][] = [
    ["PED-0148", "Cliente 07", "12/10", "3.240,00", "ok", "Faturado"],
    ["PED-0147", "Cliente 22", "12/10", "1.180,50", "wait", "Em separação"],
    ["PED-0146", "Cliente 03", "11/10", "9.870,00", "ok", "Entregue"],
    ["PED-0145", "Cliente 15", "11/10", "640,00", "alert", "Pendência"],
  ];
  return (
    <MockFrame
      path="vendas / pipeline e pedidos"
      active="Pipeline"
      nav={["Visão geral", "Pipeline", "Pedidos", "Clientes", "Relatórios"]}
    >
      <PanelTitle
        title="Pipeline comercial"
        sub="Valores em reais · propostas ativas"
        right={<span className="tnum font-mono text-[10px] text-dim">6 propostas</span>}
      />
      <div className="grid grid-cols-2 gap-2 @2xl:grid-cols-4">
        {cols.map((c, i) => (
          <div key={c.name} className={cn("overflow-hidden rounded-xl border border-line bg-surface", i > 1 && "hidden @2xl:block")}>
            <div className="border-b border-line p-2.5">
              <p className="text-[11px] text-dim">{c.name}</p>
              <p className="tnum mt-0.5 text-[14px] font-medium tracking-[-0.02em] text-text">{c.total}</p>
            </div>
            <ul className="flex flex-col gap-1.5 p-2">
              {c.deals.map(([n, v]) => (
                <li key={n} className={cn("rounded-lg border bg-bg-2 p-2", i === 3 ? "border-sage" : "border-line")}>
                  <p className="text-text">{n}</p>
                  <p className="tnum mt-0.5 font-mono text-[10px] text-dim">{v}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div tabIndex={0} role="region" aria-label="Pedidos recentes (tabela)" className="mt-2 overflow-x-auto rounded-xl border border-line bg-surface">
        <table className="w-full border-collapse">
          <caption className="sr-only">Pedidos recentes (dados demonstrativos)</caption>
          <thead>
            <tr className="border-b border-line">
              <th className={th}>Pedido</th>
              <th className={cn(th, "hidden @lg:table-cell")}>Cliente</th>
              <th className={cn(th, "hidden @xl:table-cell")}>Data</th>
              <th className={cn(th, "text-right")}>Total (R$)</th>
              <th className={th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(([id, c, d, v, tone, s]) => (
              <tr key={id} className="border-t border-line first:border-0">
                <td className={cn(td, "font-mono text-text")}>{id}</td>
                <td className={cn(td, "hidden text-text @lg:table-cell")}>{c}</td>
                <td className={cn(td, "tnum hidden @xl:table-cell")}>{d}</td>
                <td className={cn(td, "tnum text-right text-text")}>{v}</td>
                <td className={td}>
                  <Chip tone={tone}>{s}</Chip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MockFrame>
  );
}

/* ───────────── 3. Plataformas SaaS ───────────── */

function SaasMock() {
  const accounts: [string, string, string, number, string, "ok" | "wait" | "alert" | "idle"][] = [
    ["Conta 0142", "Business", "24", 78, "Ativa", "ok"],
    ["Conta 0141", "Starter", "5", 41, "Ativa", "ok"],
    ["Conta 0139", "Business", "18", 92, "Limite de uso", "alert"],
    ["Conta 0137", "Enterprise", "112", 63, "Ativa", "ok"],
    ["Conta 0134", "Starter", "3", 12, "Em teste", "wait"],
  ];
  return (
    <MockFrame
      path="plataforma / contas"
      active="Contas"
      nav={["Visão geral", "Contas", "Planos", "Uso", "Financeiro", "Configurações"]}
    >
      <PanelTitle
        title="Contas e assinaturas"
        sub="Gestão multiempresa"
        right={
          <span className="rounded-md border border-line-strong bg-surface px-2.5 py-1 text-[11px] font-medium text-accent-deep">
            Novo plano
          </span>
        }
      />
      <div className="grid grid-cols-2 gap-2 @xl:grid-cols-4">
        <Kpi label="Contas ativas" value="1.284" delta="36 novas no mês" up />
        <Kpi label="Receita recorrente" value="R$ 96,4 mil" delta="4,7% no mês" up />
        <Kpi label="Cancelamentos" value="1,8%" delta="0,3 p.p. no mês" up={false} />
        <Kpi label="Usuários ativos" value="18.902" delta="5,2% no mês" up />
      </div>
      <div tabIndex={0} role="region" aria-label="Contas e assinaturas (tabela)" className="mt-2 overflow-x-auto rounded-xl border border-line bg-surface">
        <table className="w-full border-collapse">
          <caption className="sr-only">Contas da plataforma (dados demonstrativos)</caption>
          <thead>
            <tr className="border-b border-line">
              <th className={th}>Conta</th>
              <th className={th}>Plano</th>
              <th className={cn(th, "hidden text-right @lg:table-cell")}>Usuários</th>
              <th className={cn(th, "hidden @xl:table-cell")}>Uso do plano</th>
              <th className={th}>Situação</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map(([n, p, u, use, s, tone]) => (
              <tr key={n} className="border-t border-line first:border-0">
                <td className={cn(td, "font-mono text-text")}>{n}</td>
                <td className={cn(td, "text-text")}>{p}</td>
                <td className={cn(td, "tnum hidden text-right @lg:table-cell")}>{u}</td>
                <td className={cn(td, "hidden @xl:table-cell")}>
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-20 overflow-hidden rounded-full bg-surface-2">
                      <i className={cn("block h-full rounded-full", use > 90 ? "bg-peach" : "bg-accent")} style={{ width: `${use}%` }} />
                    </span>
                    <span className="tnum font-mono text-[10px]">{use}%</span>
                  </span>
                </td>
                <td className={td}>
                  <Chip tone={tone}>{s}</Chip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MockFrame>
  );
}

/* ───────────── 4. Painéis administrativos ───────────── */

function PaineisMock() {
  const rows: [string, string, string, string, string, "ok" | "wait" | "alert" | "idle", boolean][] = [
    ["REG-2041", "Reajuste de preços", "Comercial", "12/10 09:42", "Aprovado", "ok", false],
    ["REG-2040", "Cadastro de fornecedor", "Compras", "12/10 09:15", "Em análise", "wait", true],
    ["REG-2039", "Ajuste de estoque", "Logística", "11/10 17:30", "Em análise", "wait", true],
    ["REG-2038", "Cancelamento de pedido", "Atendimento", "11/10 16:02", "Recusado", "alert", false],
    ["REG-2037", "Nova tabela de frete", "Logística", "11/10 11:48", "Aprovado", "ok", true],
  ];
  return (
    <MockFrame
      path="admin / solicitações"
      active="Registros"
      nav={["Visão geral", "Registros", "Clientes", "Estoque", "Relatórios", "Configurações"]}
    >
      <PanelTitle title="Solicitações" sub="Fila de aprovação · 5 de 214" />
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        <span className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-line bg-surface px-2 py-1.5 text-dim @xl:max-w-[14rem]">
          <Search aria-hidden className="size-3" strokeWidth={1.5} />
          Buscar registro
        </span>
        {["Período: 7 dias", "Status: todos", "Área"].map((f, i) => (
          <span
            key={f}
            className={cn(
              "items-center gap-1.5 rounded-md border border-line-strong bg-surface px-2 py-1.5 text-muted",
              i === 2 ? "hidden @xl:flex" : "flex",
            )}
          >
            <Filter aria-hidden className="size-3 text-dim" strokeWidth={1.5} />
            {f}
          </span>
        ))}
      </div>
      <div className="mb-2 flex items-center justify-between rounded-lg border border-accent/25 bg-accent-soft px-3 py-2 text-accent-deep">
        <span>
          <span className="tnum font-mono">3</span> selecionadas
        </span>
        <span className="flex gap-3 font-mono text-[10px]">
          <span>Aprovar</span>
          <span className="hidden @lg:inline">Atribuir</span>
          <span className="flex items-center gap-1">
            <Download aria-hidden className="size-3" strokeWidth={1.5} /> Exportar
          </span>
        </span>
      </div>
      <div tabIndex={0} role="region" aria-label="Solicitações em fila (tabela)" className="overflow-x-auto rounded-xl border border-line bg-surface">
        <table className="w-full border-collapse">
          <caption className="sr-only">Solicitações em fila (dados demonstrativos)</caption>
          <thead>
            <tr className="border-b border-line">
              <th className={cn(th, "w-8")}><span className="sr-only">Selecionar</span></th>
              <th className={th}>Registro</th>
              <th className={th}>Assunto</th>
              <th className={cn(th, "hidden @lg:table-cell")}>Área</th>
              <th className={cn(th, "hidden text-right @xl:table-cell")}>Aberto em</th>
              <th className={th}>Situação</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([id, subj, area, when, s, tone, sel]) => (
              <tr key={id} className={cn("border-t border-line first:border-0", sel && "bg-surface-2")}>
                <td className={td}>
                  <span
                    aria-hidden
                    className={cn("flex size-3.5 items-center justify-center rounded border", sel ? "border-accent bg-accent" : "border-line-strong bg-surface")}
                  >
                    {sel && <i className="size-1 rounded-full bg-white" />}
                  </span>
                </td>
                <td className={cn(td, "font-mono text-text")}>{id}</td>
                <td className={cn(td, "max-w-[10rem] truncate text-text")}>{subj}</td>
                <td className={cn(td, "hidden @lg:table-cell")}>{area}</td>
                <td className={cn(td, "tnum hidden text-right @xl:table-cell")}>{when}</td>
                <td className={td}>
                  <Chip tone={tone}>{s}</Chip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-line px-3 py-2 font-mono text-[10px] text-dim">
          <span className="tnum">1–5 de 214</span>
          <span className="flex gap-3">
            <span>Anterior</span>
            <span className="text-text">Próxima</span>
          </span>
        </div>
      </div>
    </MockFrame>
  );
}

/* ───────────── 5. Automações empresariais ───────────── */

function AutomacoesMock() {
  const steps: [typeof Zap, string, string, string, string][] = [
    [Zap, "Gatilho", "Novo pedido aprovado", "bg-accent-soft text-accent-deep", "Loja virtual"],
    [GitBranch, "Condição", "Valor acima de R$ 5.000", "bg-lav-soft text-lav-ink", "Regra de negócio"],
    [Database, "Ação", "Reservar itens no estoque", "bg-sage-soft text-sage-ink", "Sistema de estoque"],
    [Mail, "Ação", "Avisar equipe comercial", "bg-peach-soft text-peach-ink", "E-mail"],
  ];
  const runs: [string, string, string, "ok" | "wait" | "alert"][] = [
    ["PED-0148", "09:42", "Concluída", "ok"],
    ["PED-0147", "09:15", "Concluída", "ok"],
    ["PED-0146", "08:57", "Aguardando estoque", "wait"],
    ["PED-0144", "08:21", "Falha na integração", "alert"],
  ];
  return (
    <MockFrame
      path="automacoes / fluxos"
      active="Fluxos"
      nav={["Visão geral", "Fluxos", "Integrações", "Execuções", "Alertas", "Configurações"]}
    >
      <PanelTitle
        title="Aprovação de pedidos"
        sub="Fluxo ativo · 4 etapas"
        right={<Chip tone="ok">Ativo</Chip>}
      />
      <div className="grid gap-2 @2xl:grid-cols-[1.35fr_1fr]">
        <ol className="rounded-xl border border-line bg-bg-2 p-3">
          {steps.map(([Icon, kind, title, tint, src], i) => (
            <li key={title} className="relative flex gap-3 pb-3 last:pb-0">
              {i < steps.length - 1 && (
                <span aria-hidden className="absolute bottom-0 left-[0.95rem] top-9 w-px bg-line-strong" />
              )}
              <span className={cn("relative grid size-8 shrink-0 place-items-center rounded-lg", tint)}>
                <Icon aria-hidden className="size-4" strokeWidth={1.75} />
              </span>
              <span className="min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 py-2">
                <span className="flex items-center justify-between gap-2 text-[10px] text-dim">
                  <span>{kind}</span>
                  <span>{src}</span>
                </span>
                <span className="mt-0.5 block text-[12px] font-medium text-text">{title}</span>
              </span>
            </li>
          ))}
        </ol>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <Kpi label="Execuções hoje" value="186" delta="12% vs. ontem" up />
            <Kpi label="Tempo economizado" value="6 h 40" delta="1 h 10 hoje" up />
          </div>
          <div className="flex-1 rounded-xl border border-line bg-surface p-3">
            <PanelTitle
              title="Últimas execuções"
              right={<Bell aria-hidden className="size-3.5 text-dim" strokeWidth={1.5} />}
            />
            <ul>
              {runs.map(([id, t, s, tone]) => (
                <li key={id} className="flex items-center justify-between gap-2 border-t border-line py-1.5">
                  <span className="font-mono text-text">
                    {id} <span className="text-dim">{t}</span>
                  </span>
                  <Chip tone={tone}>{s}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

const map: Record<SolutionId, () => React.JSX.Element> = {
  gestao: GestaoMock,
  vendas: VendasMock,
  saas: SaasMock,
  paineis: PaineisMock,
  automacoes: AutomacoesMock,
};

export function SolutionMockup({ id }: { id: SolutionId }) {
  const Cmp = map[id];
  return <Cmp />;
}
