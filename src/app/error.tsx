"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="pb-[var(--section-y)] pt-[calc(var(--nav-h)+clamp(5rem,12vw,10rem))]">
      <Container>
        <p className="t-mono text-accent">Erro inesperado</p>
        <h1 className="t-display mt-6">Algo saiu do esperado.</h1>
        <p className="t-lead mt-8 max-w-[44ch]">
          Não foi possível carregar esta página. Tente novamente ou volte ao início.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button type="button" onClick={reset} arrow={false}>
            Tentar novamente
          </Button>
          <Button href="/" variant="secondary">
            Voltar ao início
          </Button>
        </div>
      </Container>
    </section>
  );
}
