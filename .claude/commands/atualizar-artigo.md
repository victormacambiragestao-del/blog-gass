---
description: Revisa um artigo publicado com dados novos e atualiza a data
argument-hint: endereço ou slug do artigo
---

Revise o artigo: $ARGUMENTS

Siga o `CLAUDE.md`.

1. **Leia o artigo** em `src/content/blog/`.
2. **Confira cada fonte e número.** Abra os links e marque o que está desatualizado ou quebrado.
3. **Pesquise o tema de novo.** Veja o que aparece hoje nas buscas e nas IAs, e o que falta no artigo. Consulte também `conteudos/biblioteca/` e os relatórios de `conteudos/radar/`.
4. **Mostre as mudanças propostas** e espere o OK. Mude só o que melhora o artigo. Não troque o endereço.
5. **Aplique** as mudanças e coloque a data de hoje em `atualizadoEm`, só se houve mudança real de conteúdo.
6. **Valide** com `npm run validar -- <slug>` e `npm run build`.
7. **Entregue** a lista do que mudou e por quê.
