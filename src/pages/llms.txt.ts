import type { APIRoute } from 'astro';
import { listarArtigos } from '../lib/artigos';
import { AUTOR, GASS, NUMEROS, SITE, TEMAS } from '../data/site';

export const GET: APIRoute = async () => {
  const artigos = await listarArtigos();
  const secoes = TEMAS.flatMap((tema) => {
    const doTema = artigos.filter((artigo) => artigo.data.tema === tema.id);
    if (doTema.length === 0) return [];
    return [
      `## ${tema.nome}`,
      '',
      ...doTema.map((artigo) => `- [${artigo.data.titulo}](${SITE.url}/blog/${artigo.id}.md): ${artigo.data.resumo}`),
      '',
    ];
  });

  const texto = [
    `# ${SITE.nome}`,
    '',
    `> ${SITE.descricao}`,
    '',
    `${GASS.descricao} Autor: ${AUTOR.nome}. ${AUTOR.cargo}. ${AUTOR.bio}`,
    '',
    ...NUMEROS.map((numero) => `- ${numero.valor} ${numero.rotulo}`),
    '',
    `Texto completo de todos os artigos: ${SITE.url}/llms-full.txt`,
    '',
    '## Páginas principais',
    '',
    `- [Sobre a GASS](${SITE.url}/sobre)`,
    `- [Victor Macambira](${SITE.url}/autor/victor-macambira)`,
    `- [Diagnóstico de Gestão gratuito](${SITE.url}/diagnostico)`,
    '',
    ...secoes,
  ].join('\n');

  return new Response(texto, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
