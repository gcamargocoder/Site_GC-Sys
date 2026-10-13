# GC-Sys — site institucional

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion · Lucide.
A marca oficial é **GC-Sys** (`src/config/site.ts`). Logotipos em `public/branding/` (originais com fundo escuro + versões transparentes usadas no site).

## Como rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
```

## O que você precisa preencher (nada é inventado)

Tudo em **`src/config/site.ts`**. Campos vazios simplesmente não aparecem no site.

| Item | Onde |
|---|---|
| Nome da empresa, razão social, CNPJ, DPO | `name`, `legal.*` |
| E-mail, WhatsApp (só dígitos com DDI), cidade | `contact.*` |
| LinkedIn / GitHub / Instagram | `social.*` |
| História institucional (opcional) | `about.story` |
| Domínio | `NEXT_PUBLIC_SITE_URL` (ver `.env.example`) |
| Tecnologias | `technologies[].confirmed` — **só marque `true` após validar**. Em produção, itens não confirmados não são exibidos (a seção some se nenhum estiver confirmado). |

## Formulário de contato

O formulário valida no cliente e no servidor (`src/lib/contact.ts`) e envia para `POST /api/contato`.
**Sem provedor configurado, a API responde 503 e o formulário avisa o visitante** — nenhuma mensagem é descartada em silêncio.
Configure no host (nunca no código): Resend (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`) **ou** `CONTACT_WEBHOOK_URL`.
Recomenda-se acrescentar limitação de taxa (ex.: no provedor de hospedagem) antes do lançamento.

## Estrutura

```
src/app          rotas (/, /servicos, /servicos/[slug], /solucoes, /sobre, /contato, /privacidade, /termos, /api/contato, sitemap, robots, og image)
src/config       site.ts (dados da empresa) · content.ts (serviços, processo, princípios, soluções)
src/components   ui · layout · sections · visuals (HeroSystem, mockups) · forms
src/lib          metadata, validação, utilidades
```

Design tokens (cores, escala tipográfica fluida, grade) estão em `src/app/globals.css`.

## Observações de conteúdo

- Interfaces de sistema são **conceituais, com dados demonstrativos**, e rotuladas como tal.
- Política de privacidade e Termos são textos-base: **revise com assessoria jurídica** antes de publicar.
- Seção "Forma de trabalho" em `/sobre` descreve práticas; confirme que refletem a operação real.
