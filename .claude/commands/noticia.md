---
description: Escreve uma análise curta de notícia a partir da fonte oficial
argument-hint: link ou assunto da notícia
---

Analise esta notícia: $ARGUMENTS

Siga o `CLAUDE.md`.

1. **Vá à fonte oficial** (lei, portaria, órgão, banco central, IBGE, empresa envolvida). Confirme data, vigência e o que realmente mudou. Se as fontes divergirem, conte isso no texto e não escolha um lado sem base. Sem fonte oficial, avise o Victor e pare.
2. **Busque a visão da GASS** em `conteudos/biblioteca/` e nos artigos existentes.
3. **Escreva** em `src/content/blog/<slug>.mdx`, com 600 a 900 palavras, `tipo: noticia`, `tema: noticias` e `rascunho: true`:
   - Resposta direta: o que aconteceu e quem é afetado.
   - O que mudou, com data e link da fonte.
   - O que muda para a sua empresa.
   - O que fazer na segunda-feira, em passos práticos.
   - Quando houver tributo ou lei, oriente a confirmar com o contador ou advogado.
4. **Valide** com `npm run validar -- <slug>` e `npm run build`.
5. **Entregue** o link local, as fontes e a data de validade da informação. Não publique.
