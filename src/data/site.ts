export const SITE = {
  url: 'https://victormacambira.com.br',
  nome: 'Blog de Gestão da GASS',
  descricao:
    'Gestão de pequenas e médias empresas, com fórmula, exemplo e passo a passo, escrita por quem já esteve do lado do dono.',
  whatsapp: '5511932166634',
};

export function linkWhatsApp(mensagem: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export const AUTOR = {
  nome: 'Victor Macambira',
  cargo: 'Cofundador da GASS e assessor sênior de gestão',
  bio: 'Empresário há mais de 13 anos, nos ramos imobiliário, food service, varejo e serviços. Hoje assessora donos de pequenas e médias empresas na GASS.',
};

// Preencher com os endereços oficiais. Eles alimentam o campo sameAs dos dados estruturados.
export const PERFIS = {
  victor: ['https://www.instagram.com/victormacambira', 'https://www.youtube.com/@victormacambira'],
  gass: [] as string[],
};

export const GASS = {
  nome: 'GASS Assessoria de Gestão',
  fundacao: '2019',
  fundadores: ['Pablo Monteiro', 'Victor Macambira'],
  endereco: {
    rua: 'Rua Padre Valdevino, 1899',
    bairro: 'Aldeota',
    cidade: 'Fortaleza',
    estado: 'CE',
    pais: 'BR',
  },
  descricao:
    'Assessoria de gestão para pequenas e médias empresas, com mais de 1.500 empresas atendidas no Brasil, em Portugal, nos EUA e em Angola.',
};

export const OFERTAS = [
  {
    nome: 'Assessoria Executiva de Gestão',
    texto: 'Um assessor acompanha a rotina, os números e as decisões da sua empresa.',
    mensagem: 'Olá! Quero conhecer a Assessoria Executiva de Gestão da GASS.',
  },
  {
    nome: 'Mentoria',
    texto: 'Acompanhamento direto para o dono que quer destravar a gestão do negócio.',
    mensagem: 'Olá! Quero conhecer a Mentoria.',
  },
  {
    nome: 'Treinamentos In Company',
    texto: 'Treinamentos de gestão aplicados dentro da sua empresa, com a sua equipe.',
    mensagem: 'Olá! Quero conhecer os Treinamentos In Company da GASS.',
  },
  {
    nome: 'GASS Select',
    texto: 'Networking entre donos e gestores de empresas.',
    mensagem: 'Olá! Quero conhecer o GASS Select.',
  },
  {
    nome: 'Livro Empresas Que Funcionam',
    texto: 'O livro de Pablo Monteiro, sócio e cofundador da GASS.',
    mensagem: 'Olá! Quero saber mais sobre o livro Empresas Que Funcionam.',
  },
];

export const MATERIAIS = {
  cmv: {
    nome: 'Planilha de CMV',
    arquivo: 'planilha-cmv.xlsx',
    chamada: 'Baixe a planilha de CMV',
    texto: 'Preencha estoque, compras e faturamento e acompanhe o CMV mês a mês.',
  },
  dre: {
    nome: 'Modelo de DRE',
    arquivo: 'modelo-dre.xlsx',
    chamada: 'Baixe o modelo de DRE',
    texto: 'Preencha receitas e despesas e veja o resultado e as margens de cada mês.',
  },
  rotina: {
    nome: 'Checklist de rotina do gestor',
    arquivo: 'checklist-rotina-do-gestor.xlsx',
    chamada: 'Baixe o checklist de rotina do gestor',
    texto: 'O que acompanhar por dia, por semana e por mês para manter a empresa sob controle.',
  },
};

export type MaterialId = keyof typeof MATERIAIS;

export const MATERIAL_POR_TEMA: Record<TemaId, MaterialId> = {
  financeiro: 'dre',
  pessoas: 'rotina',
  processos: 'rotina',
  indicadores: 'rotina',
  vendas: 'dre',
  restaurantes: 'cmv',
  expansao: 'dre',
  lideranca: 'rotina',
  noticias: 'rotina',
};

export const SEGMENTOS = ['Restaurante ou food service', 'Varejo', 'Serviços', 'Indústria', 'Outro'];
export const FAIXAS_DE_FATURAMENTO = [
  'Até R$ 200 mil por mês',
  'De R$ 200 mil a R$ 500 mil por mês',
  'De R$ 500 mil a R$ 1 milhão por mês',
  'Acima de R$ 1 milhão por mês',
];

export const NUMEROS = [
  { valor: '1.500+', rotulo: 'empresas atendidas' },
  { valor: '16+', rotulo: 'anos de experiência em gestão' },
  { valor: '4', rotulo: 'países: Brasil, Portugal, EUA e Angola' },
  { valor: '5 p.p.', rotulo: 'de aumento médio na margem operacional em 5 meses (dado interno da GASS)' },
];

export const TEMAS = [
  { id: 'financeiro', nome: 'Gestão financeira', pergunta: 'Para onde está indo o dinheiro da empresa?' },
  { id: 'pessoas', nome: 'Pessoas e equipes', pergunta: 'Como contratar, treinar e manter gente boa?' },
  { id: 'processos', nome: 'Processos e padrão', pergunta: 'Como entregar o mesmo padrão sem você por perto?' },
  { id: 'indicadores', nome: 'Indicadores e rotina', pergunta: 'Quais números olhar, e em qual reunião?' },
  { id: 'vendas', nome: 'Vendas e crescimento', pergunta: 'Como vender mais sem só baixar o preço?' },
  { id: 'restaurantes', nome: 'Restaurantes e food service', pergunta: 'Como lucrar na operação, no delivery e no cardápio?' },
  { id: 'expansao', nome: 'Expansão', pergunta: 'Franquia, rede própria ou sócio: qual é o próximo passo?' },
  { id: 'lideranca', nome: 'Liderança do dono', pergunta: 'Como sair do operacional sem perder o controle?' },
  { id: 'noticias', nome: 'Notícias e cenário', pergunta: 'O que mudou, e o que fazer na segunda-feira?' },
] as const;

export type TemaId = (typeof TEMAS)[number]['id'];

export function buscarTema(id: string) {
  return TEMAS.find((tema) => tema.id === id);
}
