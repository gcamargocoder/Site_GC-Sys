import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProductShowcase } from "@/components/showcase/ProductShowcase";

export function Solutions() {
  return (
    <section
      aria-labelledby="solucoes"
      className="section-y relative bg-bg-3 [background-image:linear-gradient(to_bottom,var(--bg),transparent_9rem)]"
    >
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Soluções"
            title={<span id="solucoes">O que construímos, em interface real.</span>}
            lead="Escolha uma categoria e veja o tipo de interface que desenvolvemos: painéis, pedidos e plataformas pensados para o trabalho do dia a dia."
            className="max-w-3xl"
          />
          <Button href="/solucoes" variant="secondary" className="self-start md:self-auto">
            Ver todas as soluções
          </Button>
        </div>
        <ProductShowcase />
      </Container>
    </section>
  );
}
