import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { Hero } from "@/components/sections/Hero";
import { Positioning } from "@/components/sections/Positioning";
import { Services } from "@/components/sections/Services";
import { Solutions } from "@/components/sections/Solutions";
import { Differentiators } from "@/components/sections/Differentiators";
import { Process } from "@/components/sections/Process";
import { Stack } from "@/components/sections/Stack";
import { ContactCTA } from "@/components/sections/ContactCTA";

const homeTitle = `${siteConfig.name} | Desenvolvimento de Sistemas, SaaS e Aplicativos`;

export const metadata = {
  ...buildMetadata({
    title: homeTitle,
    description: `A ${siteConfig.name} desenvolve sistemas sob medida, plataformas SaaS, aplicativos e soluções de gestão para empresas.`,
    path: "/",
  }),
  title: { absolute: homeTitle },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Positioning />
      <Services />
      <Solutions />
      <Differentiators />
      <Process />
      <Stack />
      <ContactCTA />
    </>
  );
}
