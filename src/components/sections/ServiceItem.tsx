import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/config/content";
import { ServiceIcon } from "@/components/ui/ServiceGlyph";
import { glyphTone, tones } from "@/components/ui/tones";
import { cn } from "@/lib/utils";

/** Linha do índice de serviços: ícone no tom do serviço, título editorial e seta. */
export function ServiceItem({ service }: { service: Service }) {
  const t = tones[glyphTone[service.glyph]];
  return (
    <li>
      <Link
        href={`/servicos/${service.slug}`}
        className={cn(
          "group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-5 rounded-[1.25rem] border border-line bg-surface p-5 transition-[border-color,box-shadow] duration-300 hover:shadow-soft md:gap-x-8 md:p-6",
          t.hoverBorder,
        )}
      >
        <ServiceIcon name={service.glyph} className="size-14" />
        <div className="flex flex-col gap-1.5">
          <h3 className="t-h3">{service.title}</h3>
          <p className="t-small max-w-[56ch]">{service.short}</p>
        </div>
        <span
          aria-hidden
          className={cn(
            "grid size-10 place-items-center rounded-full border border-line text-muted transition-[background-color,color,border-color] duration-300 group-hover:border-transparent group-hover:bg-bg-3",
            t.groupInk,
          )}
        >
          <ArrowRight
            className="size-4 transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-0.5"
            strokeWidth={1.75}
          />
        </span>
      </Link>
    </li>
  );
}
