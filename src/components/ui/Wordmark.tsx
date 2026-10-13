import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Logotipo oficial GC-Sys (versão horizontal, fundo transparente).
 * Proporção original preservada: altura definida, largura automática.
 */
export function Wordmark({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — página inicial`}
      className={cn("inline-flex items-center rounded-lg", className)}
    >
      <Image
        src="/branding/gc-sys-horizontal-transparent.png"
        alt={siteConfig.name}
        width={720}
        height={134}
        priority={priority}
        unoptimized
        className="h-8 w-auto"
      />
    </Link>
  );
}
