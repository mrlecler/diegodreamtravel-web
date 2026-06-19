-- Correr en el SQL Editor de Supabase
-- https://supabase.com/dashboard/project/<tu-project-id>/sql/new

create table if not exists public.leads_dream15 (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  tipo text check (tipo in ('quinceanero','familia')),
  nombre_apellido text not null,
  whatsapp text not null,
  edad text,
  ciudad text,
  fecha_tentativa text
);

alter table public.leads_dream15 enable row level security;

create policy "anon insert leads_dream15" on public.leads_dream15
  for insert to anon with check (true);
