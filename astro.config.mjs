import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';
import rehypeAncoras from './src/lib/rehype-ancoras.mjs';

// O painel de escrita só roda no computador local por enquanto. O site publicado continua 100% estático.
const emDesenvolvimento = process.argv.includes('dev');

export default defineConfig({
  site: 'https://victormacambira.com.br',
  trailingSlash: 'never',
  // Arquivos dentro de /blog para não colidir com o site do Lovable no mesmo domínio.
  build: { format: 'file', assets: 'blog/_astro' },
  // A raiz do domínio continua no Lovable. O redirecionamento só serve para abrir o blog localmente.
  redirects: { '/': '/blog' },
  devToolbar: { enabled: false },
  markdown: { rehypePlugins: [rehypeAncoras] },
  integrations: [mdx(), ...(emDesenvolvimento ? [react(), keystatic()] : [])],
  vite: { plugins: [tailwindcss()] },
});
