import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    titulo: z.string(),
    // Pergunta curta usada em destaque na home do blog.
    pergunta: z.string(),
    resumo: z.string().max(155),
    resposta: z.string(),
    tema: z.enum([
      'financeiro',
      'pessoas',
      'processos',
      'indicadores',
      'vendas',
      'restaurantes',
      'expansao',
      'lideranca',
      'noticias',
    ]),
    tipo: z.enum(['pilar', 'satelite', 'noticia']),
    publicadoEm: z.coerce.date(),
    atualizadoEm: z.coerce.date().nullish(),
    tituloSeo: z.string().max(60).optional(),
    faq: z.array(z.object({ pergunta: z.string(), resposta: z.string() })).default([]),
    // Só preencher quando os mesmos passos estiverem visíveis no texto do artigo.
    howto: z
      .object({
        nome: z.string(),
        passos: z.array(z.object({ nome: z.string(), texto: z.string() })),
      })
      .optional(),
    cta: z.object({ texto: z.string(), mensagem: z.string() }),
    // Material oferecido no artigo.
    material: z.enum(['padrao', 'cmv', 'dre', 'rotina']).default('padrao'),
    // Nenhum artigo vai ao ar sem aprovação: rascunhos só aparecem no computador local.
    rascunho: z.boolean().default(true),
  }),
});

export const collections = { blog };
