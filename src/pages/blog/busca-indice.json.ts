import type { APIRoute } from 'astro';
import { listarArtigos } from '../../lib/artigos';
import { limparMdx } from '../../lib/markdown';

export const GET: APIRoute = async () => {
  const artigos = await listarArtigos();
  const indice = artigos.map((artigo) => ({
    url: `/blog/${artigo.id}`,
    titulo: artigo.data.titulo,
    resumo: artigo.data.resumo,
    texto: limparMdx(artigo.body ?? ''),
  }));
  return new Response(JSON.stringify(indice), { headers: { 'Content-Type': 'application/json' } });
};
