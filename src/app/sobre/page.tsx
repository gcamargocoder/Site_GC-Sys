import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { PageHeader } from "@/components/sections/PageHeader";
import { Differentiators } from "@/components/sections/Differentiators";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata = buildMetadata({
  title: "Sobre a empresa de desenvolvimento de software",
  description: `Conheça a forma de trabalho da ${siteConfig.name}: engenharia de software orientada ao negócio, com arquitetura, método e parceria de longo prazo.`,
  path: "/sobre",
});

const commitments = [
  {
    title: "Entender antes de construir",
    text: "Nenhuma linha de código antes de compreender o processo, os usuários e o que precisa mudar na operação.",
  },
  {
    title: "Decisões registradas",
    text: "Escopo, arquitetura e prioridades documentados, para que o projeto não dependa de memória ou de uma única pessoa.",
  },
  {
    title: "Entregas incrementais",
    text: "Partes utilizáveis em ciclos curtos, validadas com quem vai operar o sistema.",
  },
  {
    title: "Comunicação direta",
    text: "Conversa objetiva com quem projeta e desenvolve, sem camadas intermediárias desnecessárias.",
  },
];

export default function SobrePage() {
  const story = siteConfig.about.story;
  return (
    <>
      <PageHeader
        eyebrow="Sobre"
        title="Engenharia de software com visão de negócio."
        lead={`A ${siteConfig.name} projeta e desenvolve sistemas para empresas que precisam que a tecnologia acompanhe a operação, e não o contrário.`}
      />

      <section aria-labelledby="visao" className="border-t border-line py-[var(--section-y)]">
        <Container>
          <div className="grid-12 gap-y-12">
            <div className="col-span-12 lg:col-span-3">
              <TechnicalLabel className="reg block pt-4">Posicionamento</TechnicalLabel>
            </div>
            <div className="col-span-12 lg:col-span-8 lg:col-start-5">
              <h2 id="visao" className="t-h2">
                Software é parte da estrutura da empresa. Deve ser projetado como tal.
              </h2>
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                <p className="t-body">
                  Um sistema bem construído reduz esforço manual, dá visibilidade ao que acontece na
                  operação e sustenta o crescimento. Um sistema mal estruturado faz o oposto: cria
                  dependências, gargalos e custos que aumentam com o tempo.
                </p>
                <p className="t-body">
                  Por isso tratamos arquitetura, interface, segurança e manutenção como partes de uma
                  mesma decisão, e conduzimos cada projeto como uma parceria técnica de longo prazo.
                </p>
              </div>
              {story && <p className="t-lead mt-12 max-w-[58ch] text-text">{story}</p>}
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="forma" className="bg-bg-2 py-[var(--section-y)]">
        <Container>
          <div className="grid-12 gap-y-12">
            <div className="col-span-12 lg:col-span-4">
              <TechnicalLabel className="mb-6 block">Forma de trabalho</TechnicalLabel>
              <h2 id="forma" className="t-h2">
                Como nos relacionamos com cada projeto.
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              {commitments.map((c, i) => (
                <div
                  key={c.title}
                  className="grid gap-2 border-t border-line py-7 md:grid-cols-[3rem_14rem_1fr] md:gap-6"
                >
                  <span className="t-mono text-dim">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="t-h4 text-text">{c.title}</h3>
                  <p className="t-body">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Differentiators />
      <ContactCTA
        title="Vamos conversar sobre o seu projeto?"
        text="Apresente o contexto e os objetivos. Respondemos com os próximos passos e as perguntas que precisamos esclarecer."
      />
    </>
  );
}
