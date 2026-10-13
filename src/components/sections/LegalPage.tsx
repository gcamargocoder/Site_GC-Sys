import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export type LegalSection = { title: string; body: string[] };

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  const { legal } = siteConfig;
  return (
    <article className="pb-[var(--section-y)] pt-[calc(var(--nav-h)+clamp(3.5rem,8vw,7rem))]">
      <Container>
        <div className="grid-12 gap-y-12">
          <header className="col-span-12 flex flex-col gap-6 lg:col-span-4">
            <Eyebrow>Documento legal</Eyebrow>
            <h1 className="t-h2">{title}</h1>
            <p className="t-small">Última atualização: {legal.lastUpdated}</p>
          </header>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <p className="t-lead">{intro}</p>
            <div className="mt-12">
              {sections.map((s, i) => (
                <section key={s.title} className="border-t border-line py-8">
                  <h2 className="t-h4 mb-4 text-text">
                    <span className="t-mono mr-3 text-dim">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </h2>
                  <div className="flex max-w-[64ch] flex-col gap-3">
                    {s.body.map((p) => (
                      <p key={p} className="t-body">
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}

export function controllerLine() {
  const { legal, contact, name } = siteConfig;
  const who = legal.companyName || name;
  const parts = [who];
  if (legal.cnpj) parts.push(`CNPJ ${legal.cnpj}`);
  const channel = legal.dpoEmail || contact.email;
  return `${parts.join(", ")}${channel ? `. Canal de contato para assuntos de privacidade: ${channel}.` : "."}`;
}
