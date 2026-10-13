import type { GlyphName } from "@/config/content";
import { cn } from "@/lib/utils";
import { glyphTone, tones, type Tone } from "./tones";

/**
 * Símbolos proprietários dos serviços: grade de 32px, traço de 1.5,
 * pontas arredondadas e um único detalhe preenchido em tom suave.
 * A cor vem de `currentColor`, definida pelo tom do serviço.
 */
export function ServiceGlyph({ name, className }: { name: GlyphName; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn("size-8", className)}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {name === "custom" && (
        <>
          <rect x="4" y="5" width="24" height="22" rx="4" />
          <path d="M12 5v22M12 12h16" />
          <rect x="16" y="16" width="8" height="7" rx="1.75" fill="currentColor" fillOpacity="0.22" />
        </>
      )}
      {name === "saas" && (
        <>
          <rect x="4" y="4" width="24" height="7" rx="2.5" />
          <rect x="4" y="13" width="24" height="7" rx="2.5" fill="currentColor" fillOpacity="0.16" />
          <rect x="4" y="22" width="24" height="6" rx="2.5" />
          <circle cx="9" cy="7.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="9" cy="16.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="9" cy="25" r="1" fill="currentColor" stroke="none" />
        </>
      )}
      {name === "apps" && (
        <>
          <path d="M16 6H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h8" />
          <path d="M4 11h12" />
          <rect x="17" y="10" width="11" height="18" rx="3" fill="currentColor" fillOpacity="0.16" />
          <circle cx="22.5" cy="24.5" r="1" fill="currentColor" stroke="none" />
        </>
      )}
      {name === "management" && (
        <>
          <path d="M5 27h22" />
          <rect x="7" y="17" width="4.5" height="8" rx="1.5" />
          <rect x="13.75" y="11" width="4.5" height="14" rx="1.5" />
          <rect x="20.5" y="5" width="4.5" height="20" rx="1.5" fill="currentColor" fillOpacity="0.22" />
        </>
      )}
      {name === "automation" && (
        <>
          <rect x="4" y="4" width="9" height="9" rx="2.5" fill="currentColor" fillOpacity="0.22" />
          <rect x="19" y="19" width="9" height="9" rx="2.5" />
          <path d="M13 8.5h5a5 5 0 0 1 5 5V19" />
          <path d="M20.5 16.5 23 19l2.5-2.5" />
        </>
      )}
      {name === "architecture" && (
        <>
          <path d="M16 4 28 10l-12 6L4 10z" fill="currentColor" fillOpacity="0.22" />
          <path d="m4 16 12 6 12-6" />
          <path d="m4 22 12 6 12-6" />
        </>
      )}
    </svg>
  );
}

/** Ícone de serviço: glifo sobre superfície suave arredondada, no tom do serviço. */
export function ServiceIcon({
  name,
  tone,
  className,
  glyphClassName,
}: {
  name: GlyphName;
  tone?: Tone;
  className?: string;
  glyphClassName?: string;
}) {
  const t = tones[tone ?? glyphTone[name]];
  return (
    <span
      aria-hidden
      className={cn("grid size-12 shrink-0 place-items-center rounded-[1.1rem]", t.soft, t.ink, className)}
    >
      <ServiceGlyph name={name} className={cn("size-[1.625rem]", glyphClassName)} />
    </span>
  );
}
