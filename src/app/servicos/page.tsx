import { buildMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { ServiceList } from "@/components/sections/Services";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Process } from "@/components/sections/Process";

export const metadata = buildMetadata({
  title: "Serviços de desenvolvimento de software",
  description:
    "Desenvolvimento de sistemas sob medida, plataformas SaaS, aplicativos web e mobile, sistemas de gestão, automações, integrações e arquitetura de software.",
  path: "/servicos",
});

export default function ServicosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Serviços"
        title="Engenharia de software aplicada a desafios reais."
        lead="Seis frentes de atuação que podem ser contratadas separadamente ou combinadas em um mesmo projeto."
      />
      <section aria-label="Lista de serviços" className="pb-[var(--section-y)]">
        <Container>
          <h2 className="sr-only">Lista de serviços</h2>
          <ServiceList />
        </Container>
      </section>
      <Process />
      <ContactCTA
        title="Não sabe por onde começar?"
        text="Descreva o cenário atual da operação. Indicamos o caminho técnico mais adequado, mesmo que ainda não exista um escopo fechado."
      />
    </>
  );
}
