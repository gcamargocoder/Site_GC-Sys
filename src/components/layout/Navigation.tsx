"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav, siteConfig, whatsappUrl } from "@/config/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { Button } from "@/components/ui/Button";
import { cn, EASE } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navigation() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  // O menu pertence à rota em que foi aberto: ao navegar, fecha sem efeito colateral.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const setOpen = (v: boolean) => setOpenAt(v ? pathname : null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const [pillReady, setPillReady] = useState(false);
  const activeHref = nav.find((n) => isActive(pathname, n.href))?.href ?? null;
  const target = hovered ?? activeHref;

  const measure = useCallback(() => {
    const el = target ? listRef.current?.querySelector<HTMLElement>(`[data-href="${target}"]`) : null;
    setPill(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
  }, [target]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setPillReady(true));
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloqueio de rolagem, Escape e retorno de foco
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a[href], button");
        const items = [toggleRef.current, ...Array.from(f)].filter(Boolean) as HTMLElement[];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const solid = scrolled || open;
  const wa = whatsappUrl();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500 ease-[var(--ease)]",
        solid ? "border-line" : "border-transparent",
      )}
    >
      {/* Fundo em elemento próprio: backdrop-filter no header prenderia o menu fixo dentro dele */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 bg-bg/85 backdrop-blur-md transition-opacity duration-500 ease-[var(--ease)]",
          solid ? "opacity-100" : "opacity-0",
        )}
      />
      <div className="container-x flex h-[var(--nav-h)] items-center justify-between">
        <Wordmark priority />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul
            ref={listRef}
            className="relative flex items-center gap-1 rounded-full border border-line bg-surface/80 p-1 shadow-soft"
            onMouseLeave={() => setHovered(null)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setHovered(null);
            }}
          >
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-y-1 left-0 rounded-full bg-accent-soft",
                pillReady && "transition-[transform,width,opacity] duration-[450ms] ease-[var(--ease)]",
                pill ? "opacity-100" : "opacity-0",
              )}
              style={{ width: pill?.w ?? 0, transform: `translateX(${pill?.x ?? 0}px)` }}
            />
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} data-href={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onMouseEnter={() => setHovered(item.href)}
                    onFocus={() => setHovered(item.href)}
                    className={cn(
                      "relative inline-flex min-h-10 items-center rounded-full px-4 text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors duration-300",
                      active ? "text-accent" : "text-muted hover:text-text",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button href="/contato" className="min-h-11 max-lg:hidden">
            Solicitar projeto
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong bg-surface text-text transition-colors hover:border-accent hover:text-accent lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-x-0 bottom-0 top-[var(--nav-h)] overflow-y-auto border-t border-line bg-bg shadow-soft lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="container-x flex min-h-full flex-col justify-between gap-12 py-10">
              <ul className="flex flex-col">
                {nav.map((item, i) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <motion.li
                      key={item.href}
                      className="border-b border-line last:border-b-0"
                      initial={reduce ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: EASE, delay: 0.12 + i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "font-display -mx-3 flex min-h-[4.25rem] items-center justify-between rounded-2xl px-3 py-3 text-[1.875rem] font-medium leading-none tracking-[-0.03em] transition-colors active:bg-accent-soft",
                          active ? "text-accent" : "text-text",
                        )}
                      >
                        {item.label}
                        <span
                          aria-hidden
                          className={cn("size-2 rounded-full", active ? "bg-accent" : "border border-line-strong")}
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div
                className="flex flex-col gap-6"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button href="/contato" className="w-full">
                  Solicitar projeto
                </Button>
                <div className="t-small flex flex-col gap-1">
                  {siteConfig.contact.email && (
                    <a className="hover:text-text" href={`mailto:${siteConfig.contact.email}`}>
                      {siteConfig.contact.email}
                    </a>
                  )}
                  {wa && (
                    <a className="hover:text-text" href={wa} target="_blank" rel="noopener noreferrer">
                      {siteConfig.contact.whatsappDisplay || "WhatsApp"}
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
