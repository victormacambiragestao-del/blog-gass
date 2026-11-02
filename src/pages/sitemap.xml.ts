import type { APIRoute } from 'astro';
import { listarArtigos } from '../lib/artigos';
import { SITE, TEMAS } from '../data/site';

const data = (valor: Date) => valor.toISOString().slice(0, 10);

export const GET: APIRoute = async () => {
  const artigos = await listarArtigos();
  const paginas: { caminho: string; modificado?: string }[] = [
    { caminho: '/' },
    { caminho: '/blog' },
    { caminho: '/sobre' },
    { caminho: '/autor/victor-macambira' },
    { caminho: '/diagnostico' },
    { caminho: '/privacidade' },
    // Temas com menos de 3 artigos ficam fora do índice para evitar páginas fracas.
    ...TEMAS.filter((tema) => artigos.filter((artigo) => artigo.data.tema === tema.id).length >= 3).map((tema) => ({
      caminho: `/blog/tema/${tema.id}`,
    })),
    ...artigos.map((artigo) => ({
      caminho: `/blog/${artigo.id}`,
      modificado: data(artigo.data.atualizadoEm ?? artigo.data.publicadoEm),
    })),
  ];

  const urls = paginas
    .map(
      ({ caminho, modificado }) =>
        `  <url><loc>${SITE.url}${caminho === '/' ? '' : caminho}</loc>${modificado ? `<lastmod>${modificado}</lastmod>` : ''}</url>`,
    )
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
