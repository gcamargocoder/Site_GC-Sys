import { solutions } from "@/config/content";
import { buildMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ShowcaseStage } from "@/components/ui/ShowcaseStage";
import { solutionTone, tones } from "@/components/ui/tones";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { SolutionMockup } from "@/components/visuals/SolutionMockups";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Soluções: gestão, vendas, SaaS, painéis e automações",
  description:
    "Categorias de sistemas que desenvolvemos: software para gestão empresarial, sistemas de pedidos personalizados, plataformas SaaS e painéis administrativos.",
  path: "/solucoes",
});

export default function SolucoesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Soluções"
        title="Categorias de sistema, projetadas para a sua operação."
        lead="Cada projeto parte da realidade da empresa. As interfaces abaixo são demonstrações conceituais de padrões e organização de informação, não produtos entregues."
      />

      {solutions.map((s, i) => (
        <section
          key={s.id}
          aria-labelledby={`sol-${s.id}`}
          className={cn("py-[var(--section-y)]", i % 2 === 1 ? "bg-bg-2" : "bg-surface")}
        >
          <Container>
            <div className="grid-12 items-start gap-y-12">
              <div
                className={cn(
                  "col-span-12 flex flex-col gap-8 lg:col-span-4",
                  i % 2 === 1 && "lg:order-2 lg:col-start-9",
                )}
              >
                <Eyebrow>{s.tab}</Eyebrow>
                <h2 id={`sol-${s.id}`} className="t-h2">
                  {s.title}
                </h2>
                <p className="t-body">{s.text}</p>
                <ul className="border-t border-line-strong">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 border-b border-line py-3.5 text-[0.9375rem] text-text">
                      <span aria-hidden className={cn("size-1.5 rounded-full", tones[solutionTone[s.id]].dot)} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={cn("col-span-12 lg:col-span-8", i % 2 === 1 && "lg:order-1 lg:col-start-1")}>
                <Reveal>
                  <ShowcaseStage id={s.id}>
                    <SolutionMockup id={s.id} />
                  </ShowcaseStage>
                  <p className="mt-4 text-[0.8125rem] text-dim">
                    Interface conceitual · dados demonstrativos
                  </p>
                </Reveal>
              </div>
            </div>
          </Container>
        </section>
      ))}

      <ContactCTA
        title="Precisa de algo fora dessas categorias?"
        text="A maior parte dos projetos combina mais de uma delas. Descreva a necessidade e avaliamos a melhor estrutura."
      />
    </>
  );
}
