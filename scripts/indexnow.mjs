// Avisa Bing e outros buscadores sobre as páginas publicadas. Rodar depois de cada publicação.
const SITE = 'https://victormacambira.com.br';
const CHAVE = 'b66aac31aad7498e8f40462e9b60fc58';

const sitemap = await fetch(`${SITE}/sitemap.xml`).then((resposta) => resposta.text());
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((achado) => achado[1]);

const resposta = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: new URL(SITE).host,
    key: CHAVE,
    keyLocation: `${SITE}/${CHAVE}.txt`,
    urlList: urls,
  }),
});

console.log(`IndexNow: ${urls.length} páginas enviadas, resposta ${resposta.status}.`);
