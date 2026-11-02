import type { APIRoute } from 'astro';
import { listarArtigos, type Artigo } from '../../lib/artigos';
import { artigoEmMarkdown } from '../../lib/markdown';

export async function getStaticPaths() {
  const artigos = await listarArtigos();
  return artigos.map((artigo) => ({ params: { slug: artigo.id }, props: { artigo } }));
}

export const GET: APIRoute = ({ props }) =>
  new Response(artigoEmMarkdown(props.artigo as Artigo), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
