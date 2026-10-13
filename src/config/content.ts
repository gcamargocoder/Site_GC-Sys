/**
 * CONTEÚDO EDITORIAL
 * Textos reutilizados em várias páginas. Sem números, clientes ou
 * resultados inventados: apenas descrição de capacidade e método.
 */

export type GlyphName =
  | "custom"
  | "saas"
  | "apps"
  | "management"
  | "automation"
  | "architecture";

export type Service = {
  slug: string;
  number: string;
  title: string;
  short: string;
  glyph: GlyphName;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  deliverables: string[];
  fitsWhen: string[];
  approach: { title: string; text: string }[];
};

export const services: Service[] = [
  {
    slug: "sistemas-sob-medida",
    number: "01",
    title: "Sistemas sob medida",
    short:
      "Software corporativo desenhado a partir dos requisitos e fluxos da sua operação.",
    glyph: "custom",
    seoTitle: "Desenvolvimento de sistemas sob medida",
    seoDescription:
      "Desenvolvimento de sistemas sob medida para empresas: software corporativo projetado a partir dos fluxos, regras e requisitos da sua operação.",
    intro:
      "Quando planilhas, ferramentas genéricas e processos manuais deixam de acompanhar a operação, o caminho é um sistema que reflita como a empresa realmente trabalha. Projetamos e construímos software corporativo a partir das suas regras de negócio, não de um modelo pronto.",
    deliverables: [
      "Levantamento de requisitos e mapeamento de fluxos",
      "Arquitetura de software e modelagem de dados",
      "Interfaces projetadas para o trabalho diário da equipe",
      "Controle de acesso por perfil e trilha de auditoria",
      "Integração com os sistemas que a empresa já utiliza",
      "Implantação, documentação e evolução contínua",
    ],
    fitsWhen: [
      "A operação depende de planilhas e controles paralelos",
      "Ferramentas de prateleira exigem adaptações que travam o processo",
      "As regras de negócio são específicas e mudam com frequência",
      "É preciso centralizar informação hoje espalhada em vários lugares",
    ],
    approach: [
      {
        title: "Começamos pelo processo",
        text: "Antes de qualquer tela, entendemos quem faz o quê, com quais dados e em que ordem.",
      },
      {
        title: "Entregamos em etapas",
        text: "O escopo é dividido em entregas utilizáveis, para validar decisões com o uso real.",
      },
      {
        title: "Construímos para durar",
        text: "Código legível, documentado e organizado para que o sistema possa crescer sem reescrita.",
      },
    ],
  },
  {
    slug: "plataformas-saas",
    number: "02",
    title: "Plataformas SaaS",
    short:
      "Produtos de software por assinatura, com arquitetura preparada para escalar.",
    glyph: "saas",
    seoTitle: "Desenvolvimento de plataformas SaaS",
    seoDescription:
      "Desenvolvimento de SaaS: arquitetura multiempresa, cobrança recorrente, painéis e infraestrutura em nuvem para produtos digitais escaláveis.",
    intro:
      "Um SaaS não é só um sistema acessível pela internet. Exige isolamento entre clientes, cobrança recorrente, gestão de planos e uma base técnica que suporte crescimento. Estruturamos o produto desde a arquitetura até a operação em nuvem.",
    deliverables: [
      "Arquitetura multiempresa (multi-tenant) e isolamento de dados",
      "Cadastro, autenticação e gestão de equipes por conta",
      "Planos, assinaturas e integração com meios de cobrança",
      "Painel administrativo para operação do produto",
      "APIs documentadas para integrações de terceiros",
      "Infraestrutura em nuvem com observabilidade e backups",
    ],
    fitsWhen: [
      "Há um produto a lançar ou uma operação a transformar em plataforma",
      "O modelo de receita é recorrente",
      "Clientes diferentes precisam usar o mesmo sistema com seus próprios dados",
      "O produto precisa evoluir rápido sem comprometer a base técnica",
    ],
    approach: [
      {
        title: "Produto antes de código",
        text: "Definimos o que entra na primeira versão e o que pode esperar, com foco em validar o modelo.",
      },
      {
        title: "Base preparada para crescer",
        text: "Decisões de arquitetura tomadas desde o início para evitar retrabalho quando a base de clientes aumentar.",
      },
      {
        title: "Operação visível",
        text: "Métricas, logs e alertas para acompanhar a saúde do produto depois do lançamento.",
      },
    ],
  },
  {
    slug: "aplicativos-web-e-mobile",
    number: "03",
    title: "Aplicativos web e mobile",
    short:
      "Aplicações com interfaces claras e arquitetura robusta, para navegador e celular.",
    glyph: "apps",
    seoTitle: "Desenvolvimento de aplicativos web e mobile",
    seoDescription:
      "Desenvolvimento de aplicativos web e mobile para empresas: interfaces intuitivas, desempenho e arquitetura robusta para o uso diário.",
    intro:
      "Equipes de campo, clientes e gestores usam o sistema em contextos diferentes. Projetamos aplicações web e mobile que respeitam esses contextos, com interface objetiva e uma base técnica compartilhada com o restante da operação.",
    deliverables: [
      "Aplicações web responsivas e progressivas",
      "Aplicativos para iOS e Android",
      "Design de interface e fluxos de uso",
      "Autenticação, notificações e funcionamento com conectividade instável",
      "Integração com APIs e sistemas internos",
      "Publicação nas lojas de aplicativos",
    ],
    fitsWhen: [
      "Equipes externas precisam registrar informação em campo",
      "Clientes precisam acompanhar pedidos ou solicitações",
      "O sistema atual não funciona bem no celular",
      "Há necessidade de uma experiência própria para cada perfil de usuário",
    ],
    approach: [
      {
        title: "Fluxos antes de telas",
        text: "Mapeamos a jornada de cada perfil para que a interface faça menos perguntas e mais trabalho.",
      },
      {
        title: "Uma base, várias interfaces",
        text: "Web, mobile e API compartilham regras de negócio para manter o comportamento consistente.",
      },
      {
        title: "Desempenho como requisito",
        text: "Tempo de resposta e consumo de dados fazem parte dos critérios de aceite.",
      },
    ],
  },
  {
    slug: "sistemas-de-gestao",
    number: "04",
    title: "Sistemas de gestão",
    short:
      "Soluções para vendas, pedidos, estoque, clientes e rotinas internas da empresa.",
    glyph: "management",
    seoTitle: "Criação de sistemas de gestão empresarial",
    seoDescription:
      "Criação de sistemas de gestão e software para gestão empresarial: vendas, pedidos, estoque, clientes e operação interna em uma única plataforma.",
    intro:
      "Gestão deixa de ser um problema de tecnologia quando a informação certa chega à pessoa certa, no momento certo. Construímos sistemas que unificam vendas, pedidos, estoque, clientes e rotinas administrativas em uma base única.",
    deliverables: [
      "Gestão de vendas, propostas e pipeline comercial",
      "Controle de pedidos, produção e expedição",
      "Estoque, cadastros e movimentações",
      "CRM e histórico de relacionamento com clientes",
      "Relatórios e painéis para acompanhamento da operação",
      "Perfis de acesso e registro de alterações",
    ],
    fitsWhen: [
      "Vendas, pedidos e estoque vivem em ferramentas separadas",
      "A gestão depende de relatórios montados manualmente",
      "Um ERP ou CRM de prateleira é caro demais ou rígido demais",
      "É preciso integrar o sistema com e-commerce ou emissão fiscal",
    ],
    approach: [
      {
        title: "Dados com dono",
        text: "Cada informação tem origem, responsável e regra de atualização definidas.",
      },
      {
        title: "Módulos que se conectam",
        text: "Começamos pelo módulo mais crítico e expandimos sem refazer a fundação.",
      },
      {
        title: "Relatórios que respondem perguntas",
        text: "Painéis desenhados a partir das decisões que a gestão precisa tomar.",
      },
    ],
  },
  {
    slug: "automacoes-e-integracoes",
    number: "05",
    title: "Automações e integrações",
    short:
      "Integrações que conectam ferramentas, eliminam trabalho repetitivo e agilizam fluxos.",
    glyph: "automation",
    seoTitle: "Automação de processos e integrações de sistemas",
    seoDescription:
      "Automação de processos empresariais e desenvolvimento de APIs e integrações entre sistemas, e-commerce e ferramentas de gestão.",
    intro:
      "Parte significativa do tempo operacional é gasta copiando dados de um sistema para outro. Desenvolvemos integrações e automações que conectam as ferramentas da empresa e deixam as pessoas com as decisões, não com a digitação.",
    deliverables: [
      "Desenvolvimento de APIs e webhooks",
      "Integração com e-commerce, marketplaces e meios de pagamento",
      "Sincronização entre ERP, CRM e sistemas internos",
      "Automação de rotinas e fluxos de aprovação",
      "Monitoramento, reprocessamento e tratamento de falhas",
      "Documentação técnica das integrações",
    ],
    fitsWhen: [
      "Os mesmos dados são digitados em mais de um sistema",
      "Pedidos de canais diferentes chegam por vias manuais",
      "Processos dependem de planilhas enviadas por e-mail",
      "Há integrações frágeis que falham sem aviso",
    ],
    approach: [
      {
        title: "Mapear antes de automatizar",
        text: "Automatizar um processo confuso apenas o torna rápido e confuso. Entendemos e simplificamos primeiro.",
      },
      {
        title: "Falhas previstas",
        text: "Toda integração tem fila, nova tentativa e alerta, porque sistemas externos falham.",
      },
      {
        title: "Tudo rastreável",
        text: "É possível saber o que foi sincronizado, quando e com qual resultado.",
      },
    ],
  },
  {
    slug: "arquitetura-e-evolucao-de-software",
    number: "06",
    title: "Arquitetura e evolução de software",
    short:
      "Consultoria técnica, modernização, otimização e arquiteturas preparadas para escalar.",
    glyph: "architecture",
    seoTitle: "Arquitetura de software e modernização de sistemas",
    seoDescription:
      "Consultoria em arquitetura de software, modernização de sistemas legados e otimização de aplicações para empresas em crescimento.",
    intro:
      "Sistemas existentes também precisam evoluir. Avaliamos a arquitetura atual, identificamos gargalos e riscos e definimos um caminho de modernização que preserve o que funciona e corrija o que limita o crescimento.",
    deliverables: [
      "Diagnóstico técnico de código, infraestrutura e dados",
      "Desenho de arquitetura-alvo e plano de migração",
      "Modernização incremental de sistemas legados",
      "Otimização de desempenho e custo em nuvem",
      "Revisão de segurança e boas práticas",
      "Documentação e transferência de conhecimento para a equipe",
    ],
    fitsWhen: [
      "O sistema é difícil de alterar e cada mudança gera novos problemas",
      "O desempenho piora conforme a base de usuários cresce",
      "Há dependência de poucas pessoas que conhecem o código",
      "A infraestrutura é cara ou difícil de manter",
    ],
    approach: [
      {
        title: "Diagnóstico objetivo",
        text: "Relatório com riscos priorizados, sem jargão e com recomendações acionáveis.",
      },
      {
        title: "Evolução incremental",
        text: "Substituímos partes de forma gradual para manter a operação funcionando durante a transição.",
      },
      {
        title: "Conhecimento compartilhado",
        text: "Documentação e acompanhamento para que a equipe interna ganhe autonomia.",
      },
    ],
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Descoberta",
    text: "Entendemos requisitos, fluxos de trabalho e objetivos do projeto antes de propor qualquer solução.",
    output: "Mapa de processos e requisitos",
  },
  {
    number: "02",
    title: "Estratégia",
    text: "Definimos escopo, arquitetura, prioridades e direção do produto, com decisões registradas e justificadas.",
    output: "Escopo, arquitetura e plano de entregas",
  },
  {
    number: "03",
    title: "Design",
    text: "Projetamos interfaces e experiências em torno da necessidade operacional de cada perfil de usuário.",
    output: "Fluxos e protótipos navegáveis",
  },
  {
    number: "04",
    title: "Desenvolvimento",
    text: "Implementamos a solução com práticas de engenharia adequadas: revisão de código, testes e entregas frequentes.",
    output: "Software funcional em ciclos curtos",
  },
  {
    number: "05",
    title: "Evolução",
    text: "Testes, implantação, monitoramento e melhorias contínuas, conforme o escopo contratado.",
    output: "Operação acompanhada e melhorias",
  },
] as const;

export const principles = [
  {
    title: "Arquitetura primeiro",
    text: "Decisões estruturais tomadas antes do código, para que o sistema aguente o que vem depois.",
  },
  {
    title: "Orientação ao negócio",
    text: "Cada funcionalidade responde a uma necessidade operacional, não a uma tendência.",
  },
  {
    title: "Escalabilidade",
    text: "Componentes desacoplados e infraestrutura que cresce sem exigir reescrita.",
  },
  {
    title: "Interfaces limpas",
    text: "Telas que reduzem esforço cognitivo e erro operacional no uso diário.",
  },
  {
    title: "Segurança desde o projeto",
    text: "Controle de acesso, proteção de dados e boas práticas presentes desde a primeira versão.",
  },
  {
    title: "Código sustentável",
    text: "Legível, testado e documentado, para que outra equipe consiga assumi-lo.",
  },
  {
    title: "Integrações",
    text: "Sistemas que conversam entre si, com contratos de API claros e monitorados.",
  },
  {
    title: "Evolução contínua",
    text: "Um roteiro técnico para o software acompanhar a empresa depois do lançamento.",
  },
] as const;

export const solutions = [
  {
    id: "gestao",
    tab: "Gestão empresarial",
    title: "Gestão empresarial",
    text: "Um sistema unificado para operar a empresa: cadastros, financeiro, estoque e indicadores em uma única base de dados, com permissões por área.",
    points: [
      "Cadastros centralizados",
      "Indicadores em tempo real",
      "Permissões por área e função",
    ],
  },
  {
    id: "vendas",
    tab: "Vendas e pedidos",
    title: "Vendas e pedidos",
    text: "Fluxos digitais para pipeline comercial, pedidos e relacionamento com clientes, do primeiro contato à entrega.",
    points: [
      "Pipeline e propostas",
      "Pedidos com status e histórico",
      "Integração com e-commerce",
    ],
  },
  {
    id: "saas",
    tab: "Plataformas SaaS",
    title: "Plataformas SaaS",
    text: "Produtos por assinatura projetados para escalar: contas isoladas, planos, cobrança recorrente e operação centralizada.",
    points: [
      "Contas multiempresa",
      "Planos e cobrança recorrente",
      "Métricas de uso do produto",
    ],
  },
  {
    id: "paineis",
    tab: "Painéis administrativos",
    title: "Painéis administrativos",
    text: "Painéis operacionais que reúnem informações dispersas e simplificam decisões e rotinas de controle.",
    points: [
      "Filtros e visões salvas",
      "Ações em lote com auditoria",
      "Exportação de dados",
    ],
  },
  {
    id: "automacoes",
    tab: "Automações empresariais",
    title: "Automações empresariais",
    text: "Rotinas repetitivas viram fluxos automáticos entre os sistemas da empresa, com regras claras, histórico de execuções e alertas quando algo foge do esperado.",
    points: [
      "Gatilhos, condições e ações",
      "Integração entre sistemas",
      "Registro de cada execução",
    ],
  },
] as const;

export type SolutionId = (typeof solutions)[number]["id"];
