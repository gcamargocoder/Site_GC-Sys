import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
};

/** Metadados por página: título único, canonical, Open Graph e Twitter. */
export function buildMetadata({ title, description, path }: PageMeta): Metadata {
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: siteConfig.name,
      title,
      description,
      url,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
