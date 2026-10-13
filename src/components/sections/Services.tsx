import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services, type Service } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceGlyph";
import { glyphTone, tones } from "@/components/ui/tones";
import { cn } from "@/lib/utils";
import { ServiceItem } from "./ServiceItem";

export function ServiceList() {
  return (
    <ul className="flex flex-col gap-3">
      {services.map((s) => (
        <ServiceItem key={s.slug} service={s} />
      ))}
    </ul>
  );
}

const sketchRows: [string, string, string][] = [
  ["w-2/3", "Regra aplicada", "bg-sage-soft text-sage-ink"],
  ["w-1/2", "Exceção rastreada", "bg-peach-soft text-peach-ink"],
  ["w-3/5", "Rotina automática", "bg-accent-soft text-accent-deep"],
];

/* Miniaturas decorativas: sugerem o produto sem fingir um projeto entregue. */
function SystemSketch() {
  return (
    <div
      aria-hidden
      className="mt-8 grid grid-cols-[3.5rem_1fr] overflow-hidden rounded-xl border border-line bg-surface shadow-soft"
    >
      <div className="flex flex-col gap-2 border-r border-line bg-bg-2 p-3">
        <i className="h-2 rounded-full bg-accent/70" />
        <i className="h-2 rounded-full bg-line-strong" />
        <i className="h-2 rounded-full bg-line-strong" />
      </div>
      <div className="flex flex-col gap-2.5 p-3.5">
        {sketchRows.map(([w, t, c]) => (
          <div key={t} className="flex items-center justify-between gap-3">
            <i className={cn("h-2 rounded-full bg-line-strong", w)} />
            <span className={cn("rounded-full px-2.5 py-0.5 text-[0.6875rem] font-medium", c)}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlansSketch() {
  return (
    <div aria-hidden className="mt-8 rounded-xl border border-line bg-surface p-3.5 shadow-soft">
      <div className="flex gap-1.5 rounded-full bg-surface-2 p-1 text-[0.6875rem] font-medium text-dim">
        <span className="flex-1 rounded-full py-1 text-center">Essencial</span>
        <span className="flex-1 rounded-full bg-surface py-1 text-center text-lav-ink shadow-soft">
          Profissional
        </span>
        <span className="flex-1 rounded-full py-1 text-center">Empresa</span>
      </div>
      <div className="mt-3.5 flex items-center justify-between text-[0.6875rem] text-dim">
        <span>Uso do plano</span>
        <span className="tnum text-text">68%</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-lav-soft">
        <i className="block h-full w-[68%] rounded-full bg-lav" />
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <span
      aria-hidden
      className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-surface text-muted transition-[background-color,color,border-color] duration-300 group-hover:border-transparent group-hover:bg-text group-hover:text-surface"
    >
      <ArrowRight
        className="size-4 transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-0.5"
        strokeWidth={1.75}
      />
    </span>
  );
}

function Feature({
  s,
  className,
  children,
}: {
  s: Service;
  className?: string;
  children?: React.ReactNode;
}) {
  const t = tones[glyphTone[s.glyph]];
  return (
    <Link
      href={`/servicos/${s.slug}`}
      className={cn(
        "group relative flex flex-col justify-between rounded-[1.5rem] border border-line p-6 transition-[transform,box-shadow] duration-500 ease-[var(--ease)] hover:-translate-y-1 hover:shadow-lift md:p-8",
        t.wash,
        className,
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <ServiceIcon name={s.glyph} className="size-14 bg-surface shadow-soft" />
          <Arrow />
        </div>
        <h3 className="t-h3 mt-8 md:[font-size:clamp(1.5rem,1.1rem+1vw,2rem)]">{s.title}</h3>
        <p className="t-body mt-3 max-w-[40ch]">{s.short}</p>
      </div>
      {children}
    </Link>
  );
}

function Compact({ s }: { s: Service }) {
  const t = tones[glyphTone[s.glyph]];
  return (
    <Link
      href={`/servicos/${s.slug}`}
      className="group relative flex h-full flex-col gap-6 rounded-[1.5rem] border border-line bg-surface p-6 transition-[transform,box-shadow] duration-500 ease-[var(--ease)] hover:-translate-y-1 hover:shadow-lift"
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-6 top-0 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-500 ease-[var(--ease)] group-hover:scale-x-100",
          t.dot,
        )}
      />
      <div className="flex items-start justify-between gap-4">
        <ServiceIcon name={s.glyph} />
        <Arrow />
      </div>
      <div>
        <h3 className="t-h3">{s.title}</h3>
        <p className="t-small mt-2">{s.short}</p>
      </div>
    </Link>
  );
}

export function Services() {
  const [custom, saas, apps, mgmt, auto, arch] = services;
  return (
    <section aria-labelledby="servicos" className="section-y">
      <Container>
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow className="mb-6">Serviços</Eyebrow>
            <h2 id="servicos" className="t-h1">
              Seis frentes, uma mesma base de engenharia.
            </h2>
          </div>
          <div className="col-span-12 flex flex-col items-start gap-6 lg:col-span-4 lg:col-start-9">
            <p className="t-lead">Do primeiro desenho de arquitetura à evolução de um sistema em produção.</p>
            <Button href="/servicos" variant="secondary">
              Ver todos os serviços
            </Button>
          </div>
        </div>

        <Reveal className="mt-12 grid gap-4 md:mt-16 md:grid-cols-12">
          <Feature s={custom} className="md:col-span-7">
            <SystemSketch />
          </Feature>
          <Feature s={saas} className="md:col-span-5">
            <PlansSketch />
          </Feature>
          <div className="md:col-span-4">
            <Compact s={apps} />
          </div>
          <div className="md:col-span-4">
            <Compact s={mgmt} />
          </div>
          <div className="md:col-span-4">
            <Compact s={auto} />
          </div>
          <Link
            href={`/servicos/${arch.slug}`}
            className="group relative flex flex-col gap-6 overflow-hidden rounded-[1.5rem] bg-accent-deep p-6 text-white transition-[transform,box-shadow] duration-500 ease-[var(--ease)] hover:-translate-y-1 hover:shadow-lift md:col-span-12 md:flex-row md:items-center md:justify-between md:p-8"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-16 size-64 rounded-full border border-white/10"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -right-2 -top-8 size-64 rounded-full border border-white/10"
            />
            <div className="relative flex items-center gap-5">
              <ServiceIcon name={arch.glyph} className="size-14 bg-white/10 !text-white" />
              <div>
                <h3 className="t-h3 text-white">{arch.title}</h3>
                <p className="mt-1.5 max-w-[56ch] text-[0.9375rem] leading-snug text-white/75">{arch.short}</p>
              </div>
            </div>
            <span className="relative inline-flex items-center gap-2 text-[0.9375rem] font-medium">
              Conhecer a abordagem
              <ArrowRight
                className="size-4 transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-1"
                strokeWidth={1.75}
              />
            </span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
