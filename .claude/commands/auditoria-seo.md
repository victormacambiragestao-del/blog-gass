---
description: Audita SEO, dados estruturados, Lighthouse, acessibilidade e IAs, e lista correções
argument-hint: endereço do site ou vazio para o site local
---

Audite: $ARGUMENTS (se vazio, use a versão local gerada por `npm run build` e `npm run preview`).

1. Use a skill `seo-audit` no site inteiro e a skill `schema` nos dados estruturados.
2. Rode o Lighthouse nas páginas principais (home do blog, um artigo, um tema, Diagnóstico). Metas: 95 ou mais em todas as categorias, LCP abaixo de 2,5 s, INP abaixo de 200 ms e CLS abaixo de 0,1.
3. Rode `npm run validar` em todos os artigos.
4. Confira links quebrados, títulos e descrições repetidos, H1 único, endereço oficial, sitemap, `robots.txt`, `llms.txt`, versões Markdown, imagens sem `alt`, contraste e navegação por teclado.
5. Use a skill `ai-seo` para checar se o conteúdo pode ser citado pelas IAs.
6. Salve em `conteudos/radar/auditoria-AAAA-MM-DD.md` a lista de correções em ordem de prioridade: o problema, o impacto e como corrigir.
7. Diga em poucas linhas o que está bom, o que corrigir primeiro e o que não pôde ser testado. Só altere o site com o OK do Victor.
