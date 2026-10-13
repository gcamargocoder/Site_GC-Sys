import { principles } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

const dots = ["before:bg-accent", "before:bg-sage", "before:bg-lav", "before:bg-peach", "before:bg-teal", "before:bg-accent", "before:bg-sage", "before:bg-lav"];

export function Differentiators() {
  const left = principles.slice(0, 4);
  const right = principles.slice(4);
  return (
    <section aria-labelledby="principios" className="section-y bg-surface">
      <Container>
        <div className="grid-12 gap-y-16">
          <div className="col-span-12">
            <Eyebrow className="mb-8">Princípios de engenharia</Eyebrow>
            <h2 id="principios" className="t-display [font-size:clamp(2.375rem,0.9rem+5.2vw,5.5rem)]">
              <span className="text-dim">Não é apenas código.</span>
              <br />
              É estrutura para crescer.
            </h2>
          </div>

          <div className="col-span-12 grid gap-x-16 md:grid-cols-2 lg:col-span-11 lg:col-start-2">
            {[left, right].map((group, g) => (
              <dl
                key={g}
                className={g === 1 ? "md:mt-24" : undefined}
              >
                {group.map((p, i) => (
                  <Reveal
                    key={p.title}
                    delay={i * 0.06}
                    className={"relative border-t border-line py-7 pl-9 before:absolute before:left-0 before:top-[2.1rem] before:size-2 before:rounded-full first:border-line-strong " + dots[(g * 4 + i) % dots.length]}
                  >
                    <dt className="t-h4 text-text">{p.title}</dt>
                    <dd className="t-body mt-2 max-w-[40ch]">{p.text}</dd>
                  </Reveal>
                ))}
              </dl>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
