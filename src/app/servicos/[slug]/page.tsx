import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { services } from "@/config/content";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { ServiceIcon } from "@/components/ui/ServiceGlyph";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { ContactCTA } from "@/components/sections/ContactCTA";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/servicos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/servicos/${service.slug}`,
  });
}

export default async function ServicePage({ params }: PageProps<"/servicos/[slug]">) {
  const { slug } = await params;
  const idx = services.findIndex((s) => s.slug === slug);
  if (idx === -1) notFound();
  const service = services[idx];
  const next = services[(idx + 1) % services.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        description: service.seoDescription,
        serviceType: service.seoTitle,
        provider: { "@id": `${siteConfig.url}/#organization` },
        areaServed: { "@type": "Country", name: "Brasil" },
        url: `${siteConfig.url}/servicos/${service.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Serviços", item: `${siteConfig.url}/servicos` },
          { "@type": "ListItem", position: 3, name: service.title },
        ],
      },
    ],
  };

  return (
    <>
      <header className="pb-[clamp(3.5rem,7vw,6rem)] pt-[calc(var(--nav-h)+clamp(2.5rem,6vw,5rem))]">
        <Container>
          <nav aria-label="Trilha de navegação" className="mb-12">
            <Link
              href="/servicos"
              className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-text"
            >
              <ArrowLeft aria-hidden className="size-4" strokeWidth={1.5} />
              Todos os serviços
            </Link>
          </nav>
          <div className="grid-12 gap-y-10">
            <div className="col-span-12 lg:col-span-8">
              <p className="t-mono mb-6 text-accent">{service.number}</p>
              <h1 className="t-h1">{service.title}</h1>
            </div>
            <div className="col-span-12 flex items-start justify-between gap-8 lg:col-span-4 lg:flex-col lg:justify-end">
              <ServiceIcon name={service.glyph} className="size-20 rounded-[1.5rem]" glyphClassName="size-10" />
            </div>
            <p className="t-lead col-span-12 max-w-[60ch] lg:col-span-7">{service.intro}</p>
          </div>
        </Container>
      </header>

      <section className="border-t border-line py-[var(--section-y)]" aria-label="Escopo">
        <Container>
          <div className="grid-12 gap-y-16">
            <div className="col-span-12 lg:col-span-5">
              <h2 className="t-h3">O que entregamos</h2>
              <ul className="mt-8 border-t border-line-strong">
                {service.deliverables.map((d, i) => (
                  <li key={d} className="grid grid-cols-[2.5rem_1fr] gap-x-2 border-b border-line py-4 text-[0.9375rem] text-text">
                    <span className="t-mono pt-0.5 text-dim">{String(i + 1).padStart(2, "0")}</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <h2 className="t-h3">Quando faz sentido</h2>
              <ul className="mt-8 border-t border-line-strong">
                {service.fitsWhen.map((d) => (
                  <li key={d} className="grid grid-cols-[1.5rem_1fr] gap-x-2 border-b border-line py-4 text-[0.9375rem] text-muted">
                    <span aria-hidden className="mt-2 size-1.5 rounded-full bg-accent" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-bg-2 py-[var(--section-y)]" aria-labelledby="abordagem">
        <Container>
          <div className="grid-12 gap-y-12">
            <div className="col-span-12 lg:col-span-4">
              <TechnicalLabel className="mb-6 block">Abordagem</TechnicalLabel>
              <h2 id="abordagem" className="t-h2">Como conduzimos.</h2>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              {service.approach.map((a) => (
                <div key={a.title} className="grid gap-2 border-t border-line py-7 md:grid-cols-[14rem_1fr] md:gap-8">
                  <h3 className="t-h4 text-text">{a.title}</h3>
                  <p className="t-body">{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-14" aria-label="Próximo serviço">
        <Container>
          <Link
            href={`/servicos/${next.slug}`}
            className="group flex items-center justify-between gap-6 py-4"
          >
            <span>
              <TechnicalLabel className="block">Próximo serviço</TechnicalLabel>
              <span className="t-h2 mt-3 block transition-transform duration-500 ease-[var(--ease)] group-hover:translate-x-2">
                {next.title}
              </span>
            </span>
            <ArrowUpRight aria-hidden className="size-7 shrink-0 text-dim transition-colors group-hover:text-accent" strokeWidth={1.25} />
          </Link>
        </Container>
      </section>

      <ContactCTA
        title={<>Vamos avaliar o seu cenário.</>}
        text={`Conte o contexto do projeto de ${service.title.toLowerCase().replace("saas", "SaaS")} e retornamos com uma proposta de caminho técnico.`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
