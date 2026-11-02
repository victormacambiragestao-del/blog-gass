import { collection, config, fields } from '@keystatic/core';
import { block, wrapper } from '@keystatic/core/content-components';
import { TEMAS } from './src/data/site';

export default config({
  storage: { kind: 'local' },
  ui: { brand: { name: 'Blog da GASS' } },
  collections: {
    artigos: collection({
      label: 'Artigos',
      path: 'src/content/blog/*',
      slugField: 'titulo',
      entryLayout: 'content',
      format: { contentField: 'corpo' },
      columns: ['tema', 'rascunho'],
      schema: {
        titulo: fields.slug({ name: { label: 'Título', validation: { isRequired: true } } }),
        pergunta: fields.text({
          label: 'Pergunta curta',
          description: 'Aparece em destaque na home. Exemplo: Como calcular o CMV?',
          validation: { isRequired: true },
        }),
        resumo: fields.text({
          label: 'Resumo para o Google',
          description: 'Até 155 caracteres.',
          multiline: true,
          validation: { isRequired: true, length: { max: 155 } },
        }),
        resposta: fields.text({
          label: 'Resposta direta',
          description: 'De 40 a 60 palavras, respondendo à pergunta do título sem rodeio.',
          multiline: true,
          validation: { isRequired: true },
        }),
        tema: fields.select({
          label: 'Tema',
          options: TEMAS.map((tema) => ({ label: tema.nome, value: tema.id })),
          defaultValue: 'financeiro',
        }),
        tipo: fields.select({
          label: 'Tipo',
          options: [
            { label: 'Pilar (guia completo)', value: 'pilar' },
            { label: 'Satélite', value: 'satelite' },
            { label: 'Notícia', value: 'noticia' },
          ],
          defaultValue: 'satelite',
        }),
        publicadoEm: fields.date({ label: 'Data de publicação', validation: { isRequired: true } }),
        atualizadoEm: fields.date({ label: 'Data de atualização' }),
        tituloSeo: fields.text({
          label: 'Título para o Google (opcional)',
          description: 'Até 60 caracteres. Se ficar vazio, o blog usa o título do artigo.',
          validation: { length: { max: 60 } },
        }),
        cta: fields.object(
          {
            texto: fields.text({ label: 'Chamada', validation: { isRequired: true } }),
            mensagem: fields.text({ label: 'Mensagem pronta do WhatsApp', validation: { isRequired: true } }),
          },
          { label: 'Chamada para ação' },
        ),
        material: fields.select({
          label: 'Material gratuito',
          options: [
            { label: 'Padrão do tema', value: 'padrao' },
            { label: 'Planilha de CMV', value: 'cmv' },
            { label: 'Modelo de DRE', value: 'dre' },
            { label: 'Checklist de rotina', value: 'rotina' },
          ],
          defaultValue: 'padrao',
        }),
        faq: fields.array(
          fields.object({
            pergunta: fields.text({ label: 'Pergunta' }),
            resposta: fields.text({ label: 'Resposta', multiline: true }),
          }),
          { label: 'Perguntas frequentes', itemLabel: (item) => item.fields.pergunta.value },
        ),
        howto: fields.object(
          {
            nome: fields.text({ label: 'Nome do passo a passo' }),
            passos: fields.array(
              fields.object({
                nome: fields.text({ label: 'Passo' }),
                texto: fields.text({ label: 'Explicação', multiline: true }),
              }),
              { label: 'Passos', itemLabel: (item) => item.fields.nome.value },
            ),
          },
          { label: 'Passo a passo (opcional)', description: 'Preencha só se o artigo tiver os mesmos passos no texto.' },
        ),
        rascunho: fields.checkbox({
          label: 'Rascunho',
          description: 'Rascunhos não vão ao ar. Desmarque só depois de revisar e aprovar.',
          defaultValue: true,
        }),
        corpo: fields.mdx({
          label: 'Texto do artigo',
          components: {
            Destaque: wrapper({
              label: 'Destaque',
              schema: {
                titulo: fields.text({ label: 'Título' }),
                tipo: fields.select({
                  label: 'Tipo',
                  options: [
                    { label: 'Dica', value: 'dica' },
                    { label: 'Alerta', value: 'alerta' },
                  ],
                  defaultValue: 'dica',
                }),
              },
            }),
            Comparativo: wrapper({ label: 'Tabela comparativa', schema: {} }),
            Passos: wrapper({ label: 'Passo a passo numerado', schema: {} }),
            Checklist: wrapper({ label: 'Checklist', schema: {} }),
            Citacao: wrapper({
              label: 'Citação',
              schema: {
                autor: fields.text({ label: 'Autor', validation: { isRequired: true } }),
                cargo: fields.text({ label: 'Cargo' }),
              },
            }),
            Numero: block({
              label: 'Número grande',
              schema: {
                valor: fields.text({ label: 'Valor', validation: { isRequired: true } }),
                rotulo: fields.text({ label: 'Legenda', validation: { isRequired: true } }),
              },
            }),
            Cta: block({
              label: 'Chamada para o WhatsApp',
              schema: {
                texto: fields.text({ label: 'Chamada', validation: { isRequired: true } }),
                mensagem: fields.text({ label: 'Mensagem pronta', validation: { isRequired: true } }),
              },
            }),
            CalculadoraCmv: block({ label: 'Calculadora de CMV', schema: {} }),
          },
        }),
      },
    }),
  },
});
