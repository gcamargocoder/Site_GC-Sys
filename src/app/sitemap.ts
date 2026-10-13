import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { services } from "@/config/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const pages = ["", "/servicos", "/solucoes", "/sobre", "/contato", "/privacidade", "/termos"];
  return [
    ...pages.map((p) => ({
      url: `${base}${p}`,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : p.startsWith("/p") || p === "/termos" ? 0.3 : 0.8,
    })),
    ...services.map((s) => ({
      url: `${base}/servicos/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
