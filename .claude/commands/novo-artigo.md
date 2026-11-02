---
description: Pesquisa um tema, propõe a estrutura e escreve um artigo em rascunho
argument-hint: tema ou palavra-chave
---

Crie um artigo sobre: $ARGUMENTS

Siga o `CLAUDE.md` e os dados de `materiais/dados-da-marca.md`.

1. **Confira o que já existe.** Procure o tema em `src/content/blog/`, `conteudos/plano/pautas.csv` e `conteudos/biblioteca/`. Se já houver artigo sobre a mesma pergunta, proponha `/atualizar-artigo`.
2. **Pesquise.** Use a skill `ai-seo` e busca na web para ver o que aparece hoje e como as IAs respondem. Abra as fontes que for citar.
3. **Reúna o que é próprio.** Busque em `conteudos/biblioteca/` histórias, exemplos e frases reais do Victor sobre o tema.
4. **Proponha e pare.** Mostre título, palavra-chave, a frase do que este artigo acrescenta, as seções em forma de pergunta, as fontes e o que falta do Victor. Espere o OK. Se a pedido do Victor esta etapa puder ser pulada, siga direto.
5. **Escreva** em `src/content/blog/<slug>.mdx` no formato do `CLAUDE.md`, com `rascunho: true`, `<Cta>` no meio e links internos. Marque o que depender do Victor com um `<Destaque tipo="alerta" titulo="Para completar antes de publicar">`, sem inventar nada.
6. **Imagem.** A imagem social é gerada sozinha pelo título.
7. **Valide** com `npm run validar -- <slug>` e `npm run build`. Corrija os erros.
8. **Entregue** o link local do artigo, as fontes usadas, o que falta completar e os avisos que restaram. Não publique: a aprovação é do Victor.
