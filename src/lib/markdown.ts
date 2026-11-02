import type { Artigo } from './artigos';
import { AUTOR, SITE, buscarTema } from '../data/site';
import { formatarData } from './artigos';

function atributo(atributos: string, nome: string) {
  return atributos.match(new RegExp(`${nome}="([^"]*)"`))?.[1];
}

// Troca os componentes visuais do artigo por Markdown puro.
export function limparMdx(corpo: string) {
  return corpo
    .replace(/<(CalculadoraCmv|Cta)\b[^>]*\/>/g, '')
    .replace(/<Numero\b([^>]*)\/>/g, (_, attrs) => `**${atributo(attrs, 'valor')}**: ${atributo(attrs, 'rotulo')}`)
    .replace(/<Destaque\b([^>]*)>([\s\S]*?)<\/Destaque>/g, (_, attrs, miolo) => {
      const titulo = atributo(attrs, 'titulo');
      return `${titulo ? `**${titulo}**\n\n` : ''}${miolo.trim()}`;
    })
    .replace(/<Citacao\b([^>]*)>([\s\S]*?)<\/Citacao>/g, (_, attrs, miolo) => {
      const cargo = atributo(attrs, 'cargo');
      return `> ${miolo.trim()}\n>\n> ${atributo(attrs, 'autor')}${cargo ? `, ${cargo}` : ''}`;
    })
    .replace(/<\/?(Passos|Checklist|Comparativo)>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function artigoEmMarkdown(artigo: Artigo) {
  const { data } = artigo;
  const linhas = [
    `# ${data.titulo}`,
    '',
    `URL: ${SITE.url}/blog/${artigo.id}`,
    `Autor: ${AUTOR.nome}, ${AUTOR.cargo}`,
    `Tema: ${buscarTema(data.tema)?.nome}`,
    `Publicado em: ${formatarData(data.publicadoEm)}`,
    ...(data.atualizadoEm ? [`Atualizado em: ${formatarData(data.atualizadoEm)}`] : []),
    '',
    data.resposta,
    '',
    limparMdx(artigo.body ?? ''),
  ];

  if (data.faq.length > 0) {
    linhas.push('', '## Perguntas frequentes');
    for (const item of data.faq) linhas.push('', `### ${item.pergunta}`, '', item.resposta);
  }

  return `${linhas.join('\n')}\n`;
}
