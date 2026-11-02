import { readFileSync } from 'node:fs';
import type { APIRoute } from 'astro';
import satori from 'satori';
import sharp from 'sharp';
import { listarArtigos } from '../../../lib/artigos';
import { AUTOR, SITE } from '../../../data/site';

const lora = readFileSync('node_modules/@fontsource/lora/files/lora-latin-400-normal.woff');
const poppins = readFileSync('node_modules/@fontsource/poppins/files/poppins-latin-400-normal.woff');
const logo = `data:image/png;base64,${readFileSync('src/assets/logo-gass.png').toString('base64')}`;

export async function getStaticPaths() {
  const artigos = await listarArtigos();
  return [
    { params: { slug: 'padrao' }, props: { titulo: SITE.nome } },
    ...artigos.map((artigo) => ({ params: { slug: artigo.id }, props: { titulo: artigo.data.titulo } })),
  ];
}

export const GET: APIRoute = async ({ props }) => {
  const arvore = {
    type: 'div',
    props: {
      style: {
        width: 1200,
        height: 630,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        background: '#161616',
      },
      children: [
        { type: 'img', props: { src: logo, width: 116, height: 88 } },
        {
          type: 'div',
          props: {
            style: {
              fontFamily: 'Lora',
              fontSize: props.titulo.length > 60 ? 62 : 74,
              lineHeight: 1.15,
              color: '#f6f0f0',
              maxWidth: 1040,
            },
            children: props.titulo,
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', fontFamily: 'Poppins', fontSize: 28, lineHeight: 1.4, color: '#f06666' },
            children: `${AUTOR.nome}, cofundador da GASS`,
          },
        },
      ],
    },
  };

  const svg = await satori(arvore as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Lora', data: lora, weight: 400, style: 'normal' },
      { name: 'Poppins', data: poppins, weight: 400, style: 'normal' },
    ],
  });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
