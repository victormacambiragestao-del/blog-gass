-- Rode este arquivo uma vez no SQL Editor do Supabase.
-- O site só pode inserir contatos. Ninguém consegue ler a tabela pela chave pública.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  criado_em timestamptz not null default now(),
  tipo text not null check (tipo in ('diagnostico', 'newsletter')),
  nome text check (char_length(nome) <= 120),
  empresa text check (char_length(empresa) <= 120),
  whatsapp text check (char_length(whatsapp) <= 30),
  email text check (char_length(email) <= 160),
  segmento text check (char_length(segmento) <= 60),
  faturamento text check (char_length(faturamento) <= 60),
  desafio text check (char_length(desafio) <= 60),
  material text check (char_length(material) <= 60),
  origem text check (char_length(origem) <= 200),
  consentimento boolean not null
);

alter table public.leads enable row level security;

drop policy if exists "site insere leads" on public.leads;
create policy "site insere leads"
  on public.leads
  for insert
  to anon
  with check (consentimento = true);

grant insert on public.leads to anon;
