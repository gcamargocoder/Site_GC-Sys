import { cn } from "@/lib/utils";

/** Linha de contexto acima de títulos: marcador de acento + texto técnico. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("t-label flex items-center gap-3 text-muted", className)}>
      <span aria-hidden className="h-px w-6 bg-accent" />
      {children}
    </p>
  );
}
