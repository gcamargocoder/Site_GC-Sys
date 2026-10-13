import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "inverse";

const base =
  "group/btn relative inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full whitespace-nowrap px-5 text-[0.9375rem] font-medium tracking-[-0.01em] bg-no-repeat [background-position:0_100%] [background-size:100%_0%] transition-[background-size,color,border-color,transform] duration-[450ms] ease-[var(--ease)] hover:[background-size:100%_100%] focus-visible:[background-size:100%_100%] active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent [background-image:linear-gradient(var(--accent-deep),var(--accent-deep))] text-accent-ink border border-transparent shadow-soft",
  secondary:
    "border border-line-strong bg-surface text-text [background-image:linear-gradient(var(--bg-3),var(--bg-3))] hover:border-accent/50",
  ghost: "text-text hover:text-accent px-0 min-h-11 !bg-none",
  inverse:
    "bg-accent-deep [background-image:linear-gradient(var(--accent),var(--accent))] text-accent-ink border border-transparent",
};

type CommonProps = {
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type LinkProps = CommonProps & { href: string } & Omit<
    React.ComponentPropsWithoutRef<"a">,
    "href" | "className" | "children"
  >;
type ButtonProps = CommonProps & { href?: undefined } & Omit<
    React.ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >;

export function Button(props: LinkProps | ButtonProps) {
  const { variant = "primary", arrow = true, className, children, ...rest } = props;
  const cls = cn(base, variants[variant], className);
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 ease-[var(--ease)] group-hover/btn:translate-x-1"
          strokeWidth={1.75}
        />
      )}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchor } = rest as Omit<LinkProps, keyof CommonProps>;
    if (/^(https?:|mailto:|tel:)/.test(href)) {
      const ext = href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
      return (
        <a href={href} className={cls} {...anchor} {...ext}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...anchor}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={cls} {...(rest as Omit<ButtonProps, keyof CommonProps>)}>
      {inner}
    </button>
  );
}
