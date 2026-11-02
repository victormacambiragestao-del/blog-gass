import { getCollection, type CollectionEntry } from 'astro:content';

export type Artigo = CollectionEntry<'blog'>;

// INCLUIR_RASCUNHOS=1 serve só para auditar a versão de publicação. Nunca use no deploy.
const mostrarRascunhos = !import.meta.env.PROD || process.env.INCLUIR_RASCUNHOS === '1';

export async function listarArtigos(): Promise<Artigo[]> {
  const artigos = await getCollection('blog', ({ data }) => mostrarRascunhos || !data.rascunho);
  return artigos.sort((a, b) => b.data.publicadoEm.getTime() - a.data.publicadoEm.getTime());
}

export function tempoDeLeitura(texto: string) {
  const palavras = texto.trim().split(/\s+/).length;
  return Math.max(1, Math.round(palavras / 200));
}

const formatoData = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatarData(data: Date) {
  return formatoData.format(data);
}
