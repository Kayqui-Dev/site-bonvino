# Bonvino & Pereira Sociedade de Advogados

Site institucional em português do Brasil, com React 19, Vite 6 e Tailwind CSS 3. A aplicação existente foi preservada; não utiliza Next.js, banco de dados ou API de envio de formulários.

## Desenvolvimento e build

- `npm ci`: instalação reproduzível pelo `package-lock.json`.
- `npm run dev`: desenvolvimento na porta 3001.
- `npm run build`: build Vite e pré-renderização do HTML institucional, sem servidor adicional em produção.
- `npm run preview -- --port 4173`: inspeção local do build.
- `npm run images:optimize`: gera AVIF/WebP responsivos e ícones a partir dos originais em `public/brand`.

O build já contém conteúdo legível no HTML. O React hidrata a navegação, as pastas de atuação, o contato e o mapa sob demanda. As fontes Inter e Playfair Display são locais, com licenças em `public/licenses`.

## Verificação

- `npm run typecheck`: checagem do JavaScript/JSX pelo TypeScript, sem migrar a aplicação.
- `npm run lint`: ESLint com regras React, hooks e acessibilidade.
- `npm test`: testes unitários do conteúdo oficial, validação e preparação da mensagem.
- `npm run test:e2e`: 25 cenários Playwright sobre o build de produção, incluindo larguras de 320 a 2560 px, orientação horizontal, teclado, formulário e axe.
- `npm run verify`: tipos, lint, testes unitários, build e suíte E2E.

A suíte E2E requer o Chromium do Playwright e suas bibliotecas de sistema. A enumeração dos testes não equivale à execução dos cenários. Os testes não enviam mensagens para o escritório e não publicam o site.

## Conteúdo e privacidade

Os dados de contato existentes estão em `src/site.js`; as áreas e os textos oficiais do Terceiro Setor estão em `src/practice-areas.js`. Não existem depoimentos publicados sem comprovação e autorização. A inclusão futura de manifestações exige validação de autenticidade, autorização e revisão profissional aplicável.

O formulário valida e prepara uma mensagem; a pessoa revisa os dados e conclui o envio no WhatsApp. Nenhum envio bem-sucedido é simulado e os campos não são persistidos no site. O mapa do Google só é carregado após solicitação.

## Publicação

A configuração estática e os headers de produção estão em `vercel.json`. A CSP é somente report-only, não uma política de bloqueio. O canonical e o sitemap utilizam o endereço publicado informado no projeto; revisar ambos se houver troca de domínio. A publicação depende de autorização do responsável.
