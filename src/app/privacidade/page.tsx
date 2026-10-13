import { buildMetadata } from "@/lib/metadata";
import { controllerLine, LegalPage } from "@/components/sections/LegalPage";

export const metadata = buildMetadata({
  title: "Política de privacidade",
  description: "Como tratamos os dados pessoais informados no formulário de contato deste site.",
  path: "/privacidade",
});

export default function PrivacidadePage() {
  return (
    <LegalPage
      title="Política de privacidade"
      intro="Este documento explica como os dados pessoais são tratados quando você utiliza este site e o formulário de contato, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018)."
      sections={[
        { title: "Controlador dos dados", body: [controllerLine()] },
        {
          title: "Dados que coletamos",
          body: [
            "Coletamos apenas as informações que você fornece voluntariamente no formulário de contato: nome, empresa, e-mail, WhatsApp, tipo de projeto e descrição da necessidade.",
            "O site não exige cadastro e não utiliza essas informações para outras finalidades além das descritas abaixo.",
          ],
        },
        {
          title: "Finalidade e base legal",
          body: [
            "Os dados são usados para responder à sua solicitação, entender o contexto do projeto e, quando aplicável, elaborar uma proposta comercial.",
            "A base legal é o seu consentimento, manifestado ao marcar a opção correspondente no formulário, e a execução de procedimentos preliminares relacionados a um possível contrato.",
          ],
        },
        {
          title: "Compartilhamento",
          body: [
            "Os dados podem ser processados por prestadores de serviço necessários à operação do site e ao envio de mensagens, como serviços de e-mail e hospedagem, que atuam em nosso nome e sob obrigações de confidencialidade.",
            "Não vendemos dados pessoais.",
          ],
        },
        {
          title: "Retenção",
          body: [
            "Mantemos os dados pelo tempo necessário para atender à sua solicitação e cumprir obrigações legais. Contatos que não evoluem para uma relação comercial são eliminados em prazo razoável.",
          ],
        },
        {
          title: "Seus direitos",
          body: [
            "Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, portabilidade, eliminação dos dados e revogação do consentimento, entre outros direitos previstos no art. 18 da LGPD.",
            "Para exercer esses direitos, utilize o canal de contato indicado neste documento.",
          ],
        },
        {
          title: "Cookies e medição",
          body: [
            "Este site não utiliza cookies de publicidade. Caso ferramentas de medição de audiência sejam adicionadas, esta política será atualizada para descrevê-las.",
          ],
        },
        {
          title: "Alterações",
          body: ["Esta política pode ser atualizada. A data da última revisão consta no topo da página."],
        },
      ]}
    />
  );
}
