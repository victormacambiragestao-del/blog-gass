// Confere a estrutura dos artigos. Uso: npm run validar -- [slug] [--publicar]
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

const PASTA = 'src/content/blog';
const argumentos = process.argv.slice(2);
const publicar = argumentos.includes('--publicar');
const alvo = argumentos.find((argumento) => !argumento.startsWith('--'));

const PENDENCIAS = [/para completar antes de publicar/i, /modelo de citação/i, /substitua este texto/i, /\[fonte/i, /\bTODO\b/, /esboço para testar/i];
const FRASES_PROIBIDAS = [/no mundo de hoje/i, /é importante ressaltar/i, /vale ressaltar/i, /em um cenário cada vez mais/i, /no cenário atual/i, /não é apenas .* é/i];

function palavras(texto) {
  return texto.replace(/<[^>]+>/g, ' ').replace(/[#*|`>-]/g, ' ').trim().split(/\s+/).filter(Boolean).length;
}

function validar(arquivo) {
  const bruto = readFileSync(join(PASTA, arquivo), 'utf8');
  const partes = bruto.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!partes) return { erros: ['Frontmatter não encontrado.'], avisos: [] };
  const dados = parse(partes[1]);
  const corpo = partes[2];
  const erros = [];
  const avisos = [];
  // No modo de publicação, o que seria aviso sobre tamanho vira impedimento.
  const exigir = (ok, mensagem) => {
    if (!ok) (publicar ? erros : avisos).push(mensagem);
  };

  if ((dados.resumo ?? '').length > 155) erros.push('Resumo com mais de 155 caracteres.');
  const titulo = dados.tituloSeo || dados.titulo || '';
  if (titulo.length > 60) erros.push(`Título para o Google com ${titulo.length} caracteres. O limite é 60: preencha tituloSeo.`);
  if (/^# /m.test(corpo)) erros.push('O corpo tem H1. Comece as seções com ##.');

  const resposta = palavras(dados.resposta ?? '');
  if (resposta < 40 || resposta > 60) erros.push(`Resposta direta com ${resposta} palavras. O esperado é de 40 a 60.`);

  const secoes = [...corpo.matchAll(/^## (.+)$/gm)].map((achado) => achado[1]);
  if (secoes.length < 2) exigir(false, 'Menos de duas seções H2.');
  const semPergunta = secoes.filter((secao) => !secao.trim().endsWith('?'));
  if (semPergunta.length > 0) avisos.push(`H2 que não são perguntas: ${semPergunta.join(' | ')}`);

  const faq = (dados.faq ?? []).length;
  if (dados.tipo !== 'noticia') exigir(faq >= 4 && faq <= 6, `FAQ com ${faq} perguntas. O esperado é de 4 a 6.`);

  const total = palavras(corpo);
  if (dados.tipo === 'pilar') exigir(total >= 3000, `Pilar com ${total} palavras. O mínimo é 3.000.`);
  if (dados.tipo === 'noticia') exigir(total >= 600 && total <= 900, `Notícia com ${total} palavras. O esperado é de 600 a 900.`);

  if (!/<Cta\b/.test(corpo)) exigir(false, 'Falta <Cta> no meio do texto.');
  if (!/\]\(\/blog\//.test(corpo)) exigir(false, 'Nenhum link interno no texto para outro artigo.');

  const temNumero = /\d+(,\d+)?\s?%|R\$\s?\d/.test(corpo);
  const temFonte = /\]\(https?:\/\//.test(corpo);
  if (temNumero && !temFonte) exigir(false, 'Há números no texto e nenhum link de fonte. Confirme se são só exemplos fictícios.');

  for (const padrao of PENDENCIAS) {
    if (padrao.test(bruto)) exigir(false, `Pendência no texto: ${padrao.source}`);
  }
  for (const padrao of FRASES_PROIBIDAS) {
    if (padrao.test(corpo)) avisos.push(`Frase genérica a evitar: ${padrao.source}`);
  }
  if (publicar && dados.rascunho !== false) avisos.push('Ainda marcado como rascunho. Só o Victor pode liberar.');

  return { erros, avisos };
}

if (alvo && !['.mdx', '.md'].some((extensao) => existsSync(join(PASTA, `${alvo}${extensao}`)))) {
  console.error(`Artigo não encontrado: ${alvo}`);
  process.exit(1);
}

const arquivos = readdirSync(PASTA).filter((arquivo) => /\.mdx?$/.test(arquivo) && (!alvo || arquivo.replace(/\.mdx?$/, '') === alvo));
let totalErros = 0;

for (const arquivo of arquivos) {
  const { erros, avisos } = validar(arquivo);
  totalErros += erros.length;
  console.log(`\n${arquivo}: ${erros.length} erro(s), ${avisos.length} aviso(s)`);
  erros.forEach((mensagem) => console.log(`  ERRO: ${mensagem}`));
  avisos.forEach((mensagem) => console.log(`  aviso: ${mensagem}`));
}

process.exit(totalErros > 0 ? 1 : 0);
