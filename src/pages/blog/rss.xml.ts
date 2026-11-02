import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { listarArtigos } from '../../lib/artigos';
import { SITE } from '../../data/site';

export const GET: APIRoute = async (contexto) => {
  const artigos = await listarArtigos();
  return rss({
    title: SITE.nome,
    description: SITE.descricao,
    site: contexto.site!,
    trailingSlash: false,
    customData: '<language>pt-BR</language>',
    items: artigos.map((artigo) => ({
      title: artigo.data.titulo,
      description: artigo.data.resumo,
      pubDate: artigo.data.publicadoEm,
      link: `/blog/${artigo.id}`,
    })),
  });
};
