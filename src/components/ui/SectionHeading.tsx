import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  level?: "h1" | "h2";
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  level = "h2",
  className,
  titleClassName,
}: Props) {
  const Tag = level;
  return (
    <header className={cn("flex flex-col gap-6", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag className={cn(level === "h1" ? "t-h1" : "t-h2", titleClassName)}>{title}</Tag>
      {lead && <p className="t-lead max-w-[52ch]">{lead}</p>}
    </header>
  );
}
