import { buildMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: "Termos de uso",
  description: "Condições para uso do site institucional e do formulário de contato.",
  path: "/termos",
});

export default function TermosPage() {
  return (
    <LegalPage
      title="Termos de uso"
      intro={`Ao acessar este site, você concorda com as condições descritas abaixo. Se não concordar, recomendamos que não o utilize.`}
      sections={[
        {
          title: "Finalidade do site",
          body: [
            `Este site apresenta os serviços de ${siteConfig.legal.companyName || siteConfig.name} e permite o envio de solicitações de contato. As informações têm caráter informativo e não constituem proposta comercial.`,
          ],
        },
        {
          title: "Interfaces conceituais",
          body: [
            "As interfaces de sistemas exibidas neste site são demonstrações conceituais, com dados fictícios, criadas para ilustrar categorias de solução. Elas não representam produtos entregues a clientes nem desempenho real.",
          ],
        },
        {
          title: "Propriedade intelectual",
          body: [
            "Textos, identidade visual, código e demais conteúdos do site são protegidos por direitos de propriedade intelectual. A reprodução depende de autorização prévia.",
          ],
        },
        {
          title: "Uso adequado",
          body: [
            "É proibido utilizar o site para fins ilícitos, tentar comprometer sua segurança ou enviar conteúdo malicioso pelo formulário de contato.",
          ],
        },
        {
          title: "Limitação de responsabilidade",
          body: [
            "Empenhamo-nos para manter o conteúdo correto e disponível, mas não garantimos funcionamento ininterrupto. O site pode ser alterado ou suspenso sem aviso prévio.",
          ],
        },
        {
          title: "Links externos",
          body: ["O site pode conter links para serviços de terceiros, cujo conteúdo e políticas não controlamos."],
        },
        {
          title: "Legislação aplicável",
          body: ["Estes termos são regidos pela legislação brasileira."],
        },
      ]}
    />
  );
}
