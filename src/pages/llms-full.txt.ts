import type { APIRoute } from 'astro';
import { listarArtigos } from '../lib/artigos';
import { artigoEmMarkdown } from '../lib/markdown';
import { AUTOR, GASS, SITE } from '../data/site';

export const GET: APIRoute = async () => {
  const artigos = await listarArtigos();
  const texto = [
    `# ${SITE.nome}`,
    '',
    `${GASS.descricao} Autor: ${AUTOR.nome}. ${AUTOR.cargo}. ${AUTOR.bio}`,
    '',
    ...artigos.flatMap((artigo) => ['---', '', artigoEmMarkdown(artigo)]),
  ].join('\n');

  return new Response(texto, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
