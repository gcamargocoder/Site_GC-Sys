"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";
import { processSteps } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

function Step({ step, last }: { step: (typeof processSteps)[number]; last: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const reached = useInView(ref, { once: true, margin: "0px 0px -55% 0px" });
  return (
    <li ref={ref} className={cn("relative grid grid-cols-[3rem_1fr] gap-x-4 sm:grid-cols-[5rem_1fr] sm:gap-x-8", !last && "pb-16 md:pb-24")}>
      <div className="relative flex justify-center">
        <span
          aria-hidden
          className={cn(
            "relative z-10 mt-2 size-3 rounded-full border transition-colors duration-500",
            reached ? "border-accent bg-accent" : "border-line-strong bg-bg",
          )}
        />
      </div>
      <div className="grid gap-x-10 gap-y-3 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div>
          <p className={cn("t-mono transition-colors duration-500", reached ? "text-accent" : "text-dim")}>
            {step.number}
          </p>
          <h3 className="t-h2 mt-3 hyphens-auto break-words [font-size:clamp(1.625rem,1rem+2.4vw,2.625rem)] xl:[font-size:clamp(1.875rem,0.7rem+2.2vw,2.75rem)]">{step.title}</h3>
        </div>
        <div className="xl:pt-8">
          <p className="t-body max-w-[42ch]">{step.text}</p>
          <p className="mt-5 border-t border-line pt-3 font-mono text-[0.75rem] text-dim">
            <span className="text-muted">Resultado:</span> {step.output}
          </p>
        </div>
      </div>
    </li>
  );
}

export function Process() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 65%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  return (
    <section aria-labelledby="processo" className="section-y bg-bg-2">
      <Container>
        <div className="grid-12 gap-y-16">
          <div className="col-span-12 lg:col-span-4">
            <div className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
              <Eyebrow>Processo</Eyebrow>
              <h2 id="processo" className="t-h2">
                Do primeiro contato à operação, com método.
              </h2>
              <p className="t-lead max-w-[36ch]">
                Cinco etapas com entregas definidas. Você sabe o que está sendo feito, por quê e o que
                vem a seguir.
              </p>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <ol ref={listRef} className="relative">
              {/* Trilho e progresso */}
              <span
                aria-hidden
                className="absolute bottom-0 left-[1.5rem] top-3 w-px -translate-x-1/2 bg-line sm:left-[2.5rem]"
              />
              <motion.span
                aria-hidden
                className="absolute bottom-0 left-[1.5rem] top-3 w-px origin-top -translate-x-1/2 bg-accent sm:left-[2.5rem]"
                style={{ scaleY: reduce ? 1 : progress }}
              />
              {processSteps.map((s, i) => (
                <Step key={s.number} step={s} last={i === processSteps.length - 1} />
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
