import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

const buscadores = ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User'];
// Decisão do Victor: robôs de treinamento liberados. Para bloquear, troque "Allow: /" por "Disallow: /" neste grupo.
const treinamento = ['GPTBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended'];

const regras = (agentes: string[]) =>
  `${agentes.map((agente) => `User-agent: ${agente}`).join('\n')}\nAllow: /\nDisallow: /keystatic\nDisallow: /api/\n`;

export const GET: APIRoute = () =>
  new Response(
    [
      '# Robôs de busca e de resposta com citação',
      regras(buscadores),
      '# Robôs de treinamento de IA',
      regras(treinamento),
      '# Demais robôs',
      regras(['*']),
      `Sitemap: ${SITE.url}/sitemap.xml\n`,
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
