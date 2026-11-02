# Auditoria antes da publicação, 02/11/2026

Versão auditada: site gerado com os quatro rascunhos liberados só para o teste. Nada foi publicado.

## Resultado do Lighthouse (celular)

| Página | Desempenho | Acessibilidade | Boas práticas | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| /blog | 100 | 100 | 81 | 100 | 1,5 s | 0,012 |
| /blog/como-calcular-cmv | 99 | 100 | 81 | 100 | 1,8 s | 0,022 |
| /blog/fim-da-escala-6x1-o-que-fazer | 99 | 100 | 81 | 100 | 1,7 s | 0,001 |
| /diagnostico | 99 | 100 | 81 | 100 | 1,3 s | 0,04 |
| /sobre | 100 | 100 | 81 | 100 | 1,4 s | 0,038 |

Metas do briefing: 95 ou mais, LCP abaixo de 2,5 s e CLS abaixo de 0,1. Desempenho, acessibilidade, SEO, LCP e CLS atingiram a meta.

**Boas práticas em 81:** duas causas, nenhuma do site.
- O teste rodou em `http://localhost`, sem HTTPS. Na Cloudflare, o site terá HTTPS.
- O antivírus Kaspersky do computador injeta um script nas páginas (`gc.kis.v2.scr.kaspersky-labs.com`). Isso acontece só nesta máquina.

Repetir o teste no endereço publicado para confirmar.

**Não medido:** INP. Ele depende de interação real de visitantes e aparece no Search Console depois de algumas semanas no ar. O bloqueio total foi de 0 ms em todas as páginas, um bom sinal.

## Verificação técnica (14 páginas)

Conferido por script em todas as páginas geradas:

- Um único H1 por página e sem pulos de nível de título.
- Títulos e descrições únicos, com títulos de até 60 caracteres.
- Endereço oficial em todas as páginas, sem `.html`.
- `lang="pt-BR"`, Open Graph e imagem social existente em todas as páginas.
- Nenhum link interno quebrado e nenhuma âncora inexistente.
- Dados estruturados válidos em JSON. Os artigos têm `BlogPosting` ou `NewsArticle` com título, imagem, datas, autor e editora, e `BreadcrumbList` aponta só para páginas existentes.
- Sitemap só com páginas indexáveis. Busca, 404 e temas com menos de três artigos ficam fora.
- `robots.txt` com os robôs de busca e de IA pedidos e com o sitemap.
- Links do `llms.txt` funcionando.

## Corrigido nesta auditoria

1. **Logo carregava como "preguiçoso" no topo.** Agora carrega na hora, em duas resoluções, para não ficar borrado em telas de alta densidade.
2. **Arquivos fora de /blog.** Imagens e scripts do blog estavam na raiz do domínio e poderiam colidir com o site do Lovable. Agora tudo fica em `/blog`.
3. **Descrições curtas** em Busca e 404. Ficaram assim de propósito, porque essas páginas não aparecem no Google.

## Pendências

| Prioridade | Pendência | Quem resolve |
|---|---|---|
| Alta | Nenhum artigo liberado. Se publicar hoje, o blog sobe sem artigos | Victor aprova a notícia do 6x1 depois da revisão jurídica |
| Alta | Validar os dados estruturados no Rich Results Test e no validator.schema.org | Depois da publicação, usando o endereço real |
| Alta | Testar se a divisão do domínio entre Cloudflare e Lovable funciona | Na publicação |
| Média | Ferramenta de medição (GA4 ou Plausible) e ferramenta de e-mail | Decisão do Victor |
| Média | Supabase real para os leads | Conta do Victor |
| Média | Painel de escrita na internet. Hoje funciona só no computador | Próxima etapa, se o Victor quiser |
| Baixa | Teste manual de navegação por teclado | Na revisão final |
