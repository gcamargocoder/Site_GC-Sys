import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig, whatsappUrl } from "@/config/site";

const briefing: [string, string][] = [
  ["Qual problema precisa ser resolvido", "bg-accent-soft text-accent-deep"],
  ["Como a operação funciona hoje", "bg-sage-soft text-sage-ink"],
  ["Sistemas e planilhas que já existem", "bg-lav-soft text-lav-ink"],
  ["Prazo desejado, se houver", "bg-peach-soft text-peach-ink"],
];

/** Conclusão da experiência: superfície azul-gelo, acolhedora, com um guia do que contar. */
export function ContactCTA({
  title = <>Vamos construir a solução que seu negócio precisa?</>,
  text = "Conte sobre seu projeto e descubra como podemos desenvolver uma solução alinhada à realidade da sua empresa.",
}: {
  title?: React.ReactNode;
  text?: string;
}) {
  const wa = whatsappUrl("Olá! Gostaria de conversar sobre um projeto.");
  return (
    <section
      aria-labelledby="cta-final"
      className="relative z-10 overflow-hidden bg-bg-3 [background-image:linear-gradient(to_bottom,var(--bg),transparent_8rem)]"
    >
      {/* Arcos concêntricos: eco discreto das linhas curvas do símbolo da marca */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block">
        {[46, 36, 26].map((r) => (
          <span
            key={r}
            className="absolute right-[-14rem] top-1/2 -translate-y-1/2 rounded-full border border-accent/10"
            style={{ width: `${r}rem`, height: `${r}rem` }}
          />
        ))}
      </div>
      <Container className="section-y relative">
        <div className="grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-7">
            <h2 id="cta-final" className="t-h1 max-w-[18ch] [font-size:clamp(2.25rem,1.1rem+4vw,4rem)]">
              {title}
            </h2>
            <p className="t-lead mt-6 max-w-[48ch]">{text}</p>
            <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <Button href="/contato">Conversar sobre meu projeto</Button>
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center border-b border-accent/40 text-[0.9375rem] font-medium text-accent-deep transition-colors hover:border-accent hover:text-accent"
                >
                  Falar pelo WhatsApp
                </a>
              )}
            </div>
            {siteConfig.contact.email && (
              <p className="mt-6 text-[0.9375rem] text-muted">{siteConfig.contact.email}</p>
            )}
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="rounded-[1.5rem] border border-line bg-surface p-6 shadow-lift md:p-7">
              <p className="font-display text-[1.0625rem] font-semibold tracking-[-0.015em] text-text">
                O que ajuda a começar
              </p>
              <p className="t-small mt-1.5">Não precisa estar tudo definido. Quatro pontos já bastam.</p>
              <ul className="mt-5 flex flex-col gap-3">
                {briefing.map(([t, c]) => (
                  <li key={t} className="flex items-center gap-3 text-[0.9375rem] text-text">
                    <span aria-hidden className={`grid size-6 shrink-0 place-items-center rounded-full ${c}`}>
                      <Check className="size-3.5" strokeWidth={2.25} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
