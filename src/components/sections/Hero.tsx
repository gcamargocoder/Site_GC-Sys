import Link from "next/link";
import { services } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/ServiceGlyph";
import { HeroSystem } from "@/components/visuals/HeroSystem";

const d = (n: number) => ({ "--d": n }) as React.CSSProperties;
const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-[calc(var(--nav-h)+clamp(2rem,4.5vw,4rem))] [background-image:radial-gradient(70rem_44rem_at_88%_6%,var(--bg-3),transparent_70%),radial-gradient(40rem_30rem_at_-5%_95%,var(--peach-soft),transparent_70%)]"
    >
      <Container>
        <div className="grid-12 gap-y-14 xl:items-center">
          <div className="col-span-12 xl:col-span-6">
            <p
              className="fade-in mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/80 py-1.5 pl-2.5 pr-4 text-[0.8125rem] font-medium tracking-[-0.005em] text-muted shadow-soft md:mb-9"
              style={d(0)}
            >
              <span aria-hidden className="size-2 rounded-full bg-sage" />
              Desenvolvimento de software sob medida
            </p>

            <h1
              id="hero-title"
              className="t-display [font-size:clamp(2.375rem,1.3rem+4.6vw,4.25rem)] xl:[font-size:min(4.4vw,4.5rem)]"
            >
              <span className="line-mask max-md:!inline [&>span]:max-md:!inline">
                <span style={i(0)}>Software sob medida </span>
              </span>
              <span className="line-mask max-md:!inline [&>span]:max-md:!inline">
                <span style={i(1)}>para negócios que </span>
              </span>
              <span className="line-mask text-accent max-md:!inline [&>span]:max-md:!inline">
                <span style={i(2)}>querem evoluir.</span>
              </span>
            </h1>

            <div className="fade-in mt-8 flex flex-col gap-8 md:mt-10" style={d(700)}>
              <p className="t-lead max-w-[46ch]">
                Sistemas de gestão, plataformas SaaS e aplicativos desenhados em torno da rotina real da
                sua empresa, com engenharia cuidadosa e entregas acompanhadas de perto.
              </p>
              <div className="flex flex-col gap-3 xs:flex-row">
                <Button href="/contato">Solicitar orçamento</Button>
                <Button href="/servicos" variant="secondary">
                  Conhecer os serviços
                </Button>
              </div>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-6">
            <HeroSystem />
          </div>
        </div>
      </Container>

      {/* Régua de serviços: índice navegável, ancora a base da dobra */}
      <nav
        aria-label="Índice de serviços"
        className="fade-in mt-[clamp(3.5rem,7vw,6rem)] border-t border-line bg-surface/60 backdrop-blur-sm"
        style={d(1100)}
      >
        <Container>
          <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {services.map((s, idx) => (
              <li
                key={s.slug}
                className="group/s relative border-b border-line max-md:odd:border-r max-md:odd:pr-4 md:max-xl:[&:not(:nth-child(3n))]:border-r md:max-xl:[&:not(:nth-child(3n))]:pr-4 xl:border-b-0 xl:[&:not(:last-child)]:border-r xl:pr-5"
              >
                <Link
                  href={`/servicos/${s.slug}`}
                  className={
                    "flex min-h-[5.5rem] flex-col justify-between gap-5 py-5 transition-colors duration-300 xl:min-h-[6.5rem] " +
                    (idx % 2 === 1 ? "max-md:pl-4 " : "") +
                    (idx % 3 !== 0 ? "md:max-xl:pl-4 " : "") +
                    (idx !== 0 ? "xl:pl-5" : "")
                  }
                >
                  <ServiceIcon name={s.glyph} className="size-10 rounded-xl" glyphClassName="size-5" />
                  <span className="text-[0.9375rem] leading-snug tracking-[-0.01em] text-muted transition-colors duration-300 group-hover/s:text-text">
                    {s.title}
                  </span>
                </Link>
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-[-1px] h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease)] group-hover/s:scale-x-100 xl:left-0"
                />
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </section>
  );
}
