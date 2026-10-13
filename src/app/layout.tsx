import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Geist, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { isPlaceholderUrl, siteConfig } from "@/config/site";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Desenvolvimento de Sistemas, SaaS e Aplicativos`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.name,
  },
  robots: { index: !isPlaceholderUrl, follow: !isPlaceholderUrl },
};

export const viewport: Viewport = {
  themeColor: "#faf9f6",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.legalName || siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      logo: `${siteConfig.url}/branding/gc-sys-horizontal-transparent.png`,
      ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
      ...(siteConfig.social.linkedin ? { sameAs: [siteConfig.social.linkedin] } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      inLanguage: "pt-BR",
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${jakarta.variable} ${plexMono.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="fixed left-4 top-4 z-[100] -translate-y-24 bg-accent px-4 py-3 text-sm font-medium text-accent-ink focus:translate-y-0"
        >
          Ir para o conteúdo
        </a>
        <Navigation />
        <main id="conteudo" className="page-in relative z-10">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
