import type { Artigo } from './artigos';
import { AUTOR, GASS, PERFIS, SITE, TEMAS, buscarTema } from '../data/site';

const idGass = `${SITE.url}/sobre#gass`;
const idVictor = `${SITE.url}/autor/victor-macambira#pessoa`;
const idSite = `${SITE.url}/blog#site`;

export function schemaDoSite() {
  return [
    {
      '@type': 'Organization',
      '@id': idGass,
      name: GASS.nome,
      url: `${SITE.url}/sobre`,
      logo: `${SITE.url}/blog/logo-gass.png`,
      description: GASS.descricao,
      foundingDate: GASS.fundacao,
      founder: GASS.fundadores.map((nome) => ({ '@type': 'Person', name: nome })),
      address: {
        '@type': 'PostalAddress',
        streetAddress: GASS.endereco.rua,
        addressLocality: GASS.endereco.cidade,
        addressRegion: GASS.endereco.estado,
        addressCountry: GASS.endereco.pais,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: `+${SITE.whatsapp}`,
        availableLanguage: 'pt-BR',
      },
      ...(PERFIS.gass.length > 0 && { sameAs: PERFIS.gass }),
    },
    {
      '@type': 'Person',
      '@id': idVictor,
      name: AUTOR.nome,
      url: `${SITE.url}/autor/victor-macambira`,
      image: `${SITE.url}/blog/victor-macambira.jpg`,
      jobTitle: AUTOR.cargo,
      description: AUTOR.bio,
      worksFor: { '@id': idGass },
      knowsAbout: TEMAS.filter((tema) => tema.id !== 'noticias').map((tema) => tema.nome),
      ...(PERFIS.victor.length > 0 && { sameAs: PERFIS.victor }),
    },
    {
      '@type': 'WebSite',
      '@id': idSite,
      name: SITE.nome,
      url: `${SITE.url}/blog`,
      inLanguage: 'pt-BR',
      publisher: { '@id': idGass },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/blog/busca?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
  ];
}

export function schemaDaTrilha(itens: { nome: string; href?: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: itens.map((item, indice) => ({
      '@type': 'ListItem',
      position: indice + 1,
      name: item.nome,
      ...(item.href && { item: `${SITE.url}${item.href}` }),
    })),
  };
}

export function schemaDoArtigo(artigo: Artigo) {
  const { data } = artigo;
  const url = `${SITE.url}/blog/${artigo.id}`;
  const blocos: Record<string, unknown>[] = [
    {
      '@type': data.tipo === 'noticia' ? 'NewsArticle' : 'BlogPosting',
      '@id': `${url}#artigo`,
      headline: data.titulo,
      description: data.resumo,
      image: `${SITE.url}/blog/og/${artigo.id}.png`,
      datePublished: data.publicadoEm.toISOString(),
      dateModified: (data.atualizadoEm ?? data.publicadoEm).toISOString(),
      inLanguage: 'pt-BR',
      articleSection: buscarTema(data.tema)?.nome,
      mainEntityOfPage: url,
      author: { '@id': idVictor },
      publisher: { '@id': idGass },
      isPartOf: { '@id': idSite },
    },
  ];

  if (data.faq.length > 0) {
    blocos.push({
      '@type': 'FAQPage',
      mainEntity: data.faq.map((item) => ({
        '@type': 'Question',
        name: item.pergunta,
        acceptedAnswer: { '@type': 'Answer', text: item.resposta },
      })),
    });
  }

  if (data.howto && data.howto.passos.length > 0) {
    blocos.push({
      '@type': 'HowTo',
      name: data.howto.nome,
      step: data.howto.passos.map((passo, indice) => ({
        '@type': 'HowToStep',
        position: indice + 1,
        name: passo.nome,
        text: passo.texto,
      })),
    });
  }

  return blocos;
}
