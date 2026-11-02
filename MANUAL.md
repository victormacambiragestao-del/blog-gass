# Manual do blog da GASS

## Como publicar um artigo

**Pelo Claude Code (mais simples):** abra o Claude Code nesta pasta e peça, por exemplo, `/novo-artigo como calcular o ponto de equilíbrio`. Ele pesquisa, propõe a estrutura e escreve um rascunho para você revisar.

**Pelo painel:** peça ao Claude para abrir o painel de escrita. Ele aparece no navegador em `localhost:4321/keystatic`. Crie ou edite o artigo e salve.

**Para ir ao ar:**
1. Leia o rascunho em `localhost:4321/blog`.
2. Preencha os trechos marcados como "Para completar antes de publicar".
3. Desmarque **Rascunho** no painel, ou peça ao Claude: "pode publicar o artigo X".
4. Peça ao Claude para enviar a alteração. O site é atualizado sozinho em alguns minutos.

O Claude confere tudo antes com `npm run validar -- nome-do-artigo --publicar` e só publica com a sua aprovação.

## Comandos

| Comando | Quando usar |
|---|---|
| `/pautas-quentes` | Toda segunda-feira, para ver as notícias da semana |
| `/decompor` | Depois de gravar uma aula, live ou reunião. Coloque o texto em `conteudos/transcricoes/entrada` |
| `/pesquisar-pauta` | Antes de escrever sobre um tema novo |
| `/novo-artigo` | Para escrever um artigo |
| `/noticia` | Para analisar uma notícia a partir da fonte oficial |
| `/atualizar-artigo` | A cada 3 a 6 meses nos artigos principais |
| `/auditoria-seo` | Uma vez por mês |
| `/radar` | No começo de cada mês |

O plano das próximas 12 semanas está em `conteudos/plano/calendario-12-semanas.csv`, e as 50 pautas, em `conteudos/plano/pautas.csv`. Os dois abrem no Excel.

## Como acompanhar os resultados

**Todo mês:**
1. Exporte as consultas e as páginas do Google Search Console e do Bing Webmaster Tools e salve em `conteudos/radar/dados`.
2. Faça as 20 perguntas de `conteudos/plano/perguntas-para-ias.csv` no ChatGPT, no Gemini e no Perplexity. Repita cada uma três vezes e anote se a GASS aparece, em `conteudos/radar/testes-ia`.
3. Rode `/radar`. Ele mostra o que melhorou, o que caiu e as cinco próximas ações.

**O que olhar primeiro:** cliques no WhatsApp e pedidos de Diagnóstico por artigo. É isso que vira cliente.

## Regras que não mudam

- Nenhum artigo vai ao ar sem a sua aprovação.
- Todo número precisa de fonte com link, ou de ser identificado como dado interno da GASS.
- Frases suas só entram se você disse ou aprovou.
- Os dados oficiais da marca ficam em `materiais/dados-da-marca.md`. Atualize esse arquivo quando algo mudar.
