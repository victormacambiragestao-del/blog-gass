// Gera âncoras de títulos sem acento, como no restante das URLs do blog.
function textoDe(no) {
  if (no.type === 'text') return no.value;
  return (no.children ?? []).map(textoDe).join('');
}

function paraAncora(texto) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function rehypeAncoras() {
  return (arvore) => {
    const usadas = new Map();
    const percorrer = (no) => {
      if (no.type === 'element' && /^h[1-6]$/.test(no.tagName)) {
        const base = paraAncora(textoDe(no));
        const repeticoes = usadas.get(base) ?? 0;
        usadas.set(base, repeticoes + 1);
        no.properties.id = repeticoes ? `${base}-${repeticoes + 1}` : base;
      }
      (no.children ?? []).forEach(percorrer);
    };
    percorrer(arvore);
  };
}
