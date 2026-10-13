import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="pb-[var(--section-y)] pt-[calc(var(--nav-h)+clamp(5rem,12vw,10rem))]">
      <Container>
        <p className="t-mono text-accent">Erro 404</p>
        <h1 className="t-display mt-6">Página não encontrada.</h1>
        <p className="t-lead mt-8 max-w-[44ch]">
          O endereço não existe ou foi movido. Volte ao início ou veja o que desenvolvemos.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/">Voltar ao início</Button>
          <Button href="/servicos" variant="secondary">
            Ver serviços
          </Button>
        </div>
      </Container>
    </section>
  );
}
