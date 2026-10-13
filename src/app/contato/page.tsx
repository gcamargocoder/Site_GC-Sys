import { Eyebrow } from "@/components/ui/Eyebrow";
import { siteConfig, whatsappUrl } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = buildMetadata({
  title: "Contato e solicitação de orçamento",
  description:
    "Solicite um orçamento de desenvolvimento de software. Conte a necessidade da sua empresa e receba um retorno com os próximos passos.",
  path: "/contato",
});

const next = [
  ["Análise", "Lemos o contexto e identificamos o que precisa ser esclarecido."],
  ["Conversa", "Entramos em contato para entender o cenário e os objetivos."],
  ["Proposta", "Apresentamos escopo, abordagem técnica e próximos passos."],
];

export default function ContatoPage() {
  const { email, whatsappDisplay } = siteConfig.contact;
  const wa = whatsappUrl("Olá! Gostaria de conversar sobre um projeto.");

  return (
    <section className="pb-[var(--section-y)] pt-[calc(var(--nav-h)+clamp(3.5rem,8vw,7rem))]" aria-labelledby="contato">
      <Container>
        <div className="grid-12 gap-y-16">
          <div className="col-span-12 flex flex-col gap-12 lg:col-span-5">
            <div className="flex flex-col gap-8">
              <Eyebrow>Contato</Eyebrow>
              <h1 id="contato" className="t-h1">
                Conte o que sua empresa precisa.
              </h1>
              <p className="t-lead max-w-[42ch]">
                Quanto mais contexto sobre a operação e o objetivo, mais precisa será a nossa resposta.
              </p>
            </div>

            {(email || wa) && (
              <div>
                <TechnicalLabel>Canais diretos</TechnicalLabel>
                <ul className="mt-4 border-t border-line-strong">
                  {email && (
                    <li className="border-b border-line">
                      <a href={`mailto:${email}`} className="flex min-h-14 items-center justify-between text-text transition-colors hover:text-accent">
                        {email}
                      </a>
                    </li>
                  )}
                  {wa && (
                    <li className="border-b border-line">
                      <a href={wa} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center justify-between text-text transition-colors hover:text-accent">
                        WhatsApp {whatsappDisplay && <span className="t-mono text-dim">{whatsappDisplay}</span>}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}

            <div>
              <TechnicalLabel>Depois do envio</TechnicalLabel>
              <ol className="mt-4 border-t border-line-strong">
                {next.map(([t, d], i) => (
                  <li key={t} className="grid grid-cols-[2.5rem_6rem_1fr] gap-x-2 border-b border-line py-4 text-[0.9375rem]">
                    <span className="t-mono pt-0.5 text-dim">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-text">{t}</span>
                    <span className="text-muted">{d}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="rounded-[1.75rem] border border-line bg-surface p-6 shadow-soft sm:p-10">
              <ContactForm fallbackEmail={email || undefined} fallbackWhatsapp={wa || undefined} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
