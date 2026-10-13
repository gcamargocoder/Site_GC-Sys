import { visibleTechnologies } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

/**
 * Especificação técnica. Só exibe tecnologias com `confirmed: true`
 * (em desenvolvimento, exibe as demais com a marca "A confirmar").
 */
export function Stack() {
  const visible = visibleTechnologies();
  if (visible.length === 0) return null;

  const groups = new Map<string, typeof visible>();
  for (const t of visible) {
    groups.set(t.group, [...(groups.get(t.group) ?? []), t]);
  }
  const hasPending = visible.some((t) => !t.confirmed);

  return (
    <section aria-labelledby="stack" className="section-y bg-surface">
      <Container>
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-4">
            <SectionHeading
              eyebrow="Especificação técnica"
              title={<span id="stack">Tecnologia escolhida pelo problema.</span>}
              lead="Adotamos as ferramentas que fazem sentido para cada projeto, priorizando estabilidade e manutenção a longo prazo."
            />
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <dl className="border-t border-line-strong">
              {[...groups.entries()].map(([group, items]) => (
                <div key={group} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
                  <dt>
                    <TechnicalLabel>{group}</TechnicalLabel>
                  </dt>
                  <dd className="flex flex-wrap gap-x-6 gap-y-2">
                    {items.map((t) => (
                      <span key={t.name} className="t-h3 inline-flex items-baseline gap-2 text-text">
                        {t.name}
                        {!t.confirmed && (
                          <span className="t-label rounded-full bg-peach-soft px-2 py-0.5 text-peach-ink">
                            A confirmar
                          </span>
                        )}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
            {hasPending && (
              <p className="mt-6 font-mono text-[0.75rem] text-dim">
                Modo de desenvolvimento: tecnologias não confirmadas em src/config/site.ts não são
                exibidas em produção.
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
