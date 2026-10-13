import { cn } from "@/lib/utils";

/** Rótulo técnico em monoespaçada. Usado para dados, índices e anotações. */
export function TechnicalLabel({
  className,
  tone = "dim",
  ...props
}: React.ComponentPropsWithoutRef<"span"> & { tone?: "dim" | "muted" | "accent" }) {
  return (
    <span
      className={cn(
        "t-label",
        tone === "dim" && "text-dim",
        tone === "muted" && "text-muted",
        tone === "accent" && "text-accent",
        className,
      )}
      {...props}
    />
  );
}
