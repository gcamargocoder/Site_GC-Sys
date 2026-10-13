import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

const rows = [
  ["Processo", "A empresa se adapta à ferramenta.", "A ferramenta se adapta à empresa."],
  [
    "Regras de negócio",
    "Configuração dentro de limites predefinidos.",
    "Implementadas como a operação exige.",
  ],
  [
    "Integrações",
    "Conectores do catálogo do fornecedor.",
    "Construídas para os sistemas que você já usa.",
  ],
  ["Evolução", "Segue o roteiro do fornecedor.", "Segue as prioridades da sua empresa."],
];

export function Positioning() {
  return (
    <section aria-labelledby="posicionamento" className="section-y bg-surface">
      <Container>
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-2">
            <TechnicalLabel className="reg block pt-4">Premissa</TechnicalLabel>
          </div>
          <div className="col-span-12 lg:col-span-10">
            <h2 id="posicionamento" className="t-h1">
              <span className="text-dim">Cada empresa opera de um jeito.</span> Seu software também
              deveria.
            </h2>
          </div>

          <div className="col-span-12 flex flex-col gap-6 lg:col-span-4 lg:col-start-3">
            <p className="t-lead">
              Ferramentas genéricas resolvem o problema médio. Quando a operação tem fluxos, regras e
              exceções próprias, o custo aparece em planilhas paralelas, retrabalho e decisões tomadas
              com informação incompleta.
            </p>
            <p className="t-body">
              Um sistema construído sob medida organiza esse conhecimento em software: o que é rotina
              vira automático, o que é exceção fica rastreável e o que é estratégico fica visível.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Reveal className="rounded-[1.5rem] border border-line bg-bg px-5 shadow-soft md:px-7">
              <table className="w-full text-left">
                <caption className="sr-only">
                  Comparação entre software de prateleira e software sob medida
                </caption>
                <thead>
                  <tr className="hidden md:table-row">
                    <th className="w-[26%] py-3"><span className="sr-only">Critério</span></th>
                    <th className="py-3 pr-4 text-left font-normal">
                      <TechnicalLabel>Prateleira</TechnicalLabel>
                    </th>
                    <th className="py-3 text-left font-normal">
                      <TechnicalLabel tone="accent">Sob medida</TechnicalLabel>
                    </th>
                  </tr>
                </thead>
                <tbody className="block md:table-row-group">
                  {rows.map(([k, a, b]) => (
                    <tr
                      key={k}
                      className="block border-t border-line py-5 md:table-row md:py-0"
                    >
                      <th
                        scope="row"
                        className="block pb-2 text-left text-[0.9375rem] font-medium text-text md:table-cell md:py-5 md:pb-5 md:pr-4 md:align-top"
                      >
                        {k}
                      </th>
                      <td className="block pb-1 text-[0.9375rem] leading-snug text-dim md:table-cell md:py-5 md:pr-4 md:align-top">
                        <span className="t-label mr-2 text-dim md:hidden">Prateleira</span>
                        {a}
                      </td>
                      <td className="block text-[0.9375rem] leading-snug text-text md:table-cell md:py-5 md:align-top">
                        <span className="t-label mr-2 text-accent md:hidden">Sob medida</span>
                        {b}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
