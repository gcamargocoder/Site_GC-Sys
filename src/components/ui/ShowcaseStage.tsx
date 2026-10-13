import { cn } from "@/lib/utils";
import { solutionTone } from "./tones";
import { tones } from "./tones";

/** Área de vitrine suavemente colorida que abriga uma interface conceitual. */
export function ShowcaseStage({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  const t = tones[solutionTone[id] ?? "blue"];
  return (
    <div className={cn("relative overflow-hidden rounded-[1.75rem] border border-line p-3 sm:p-6 md:p-10", t.wash, className)}>
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--line-strong)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom_right,black,transparent_70%)]"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
