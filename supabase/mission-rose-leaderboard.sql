create table if not exists public.mission_rose_scores (
  id uuid primary key default gen_random_uuid(),
  player_name text not null check (char_length(btrim(player_name)) between 1 and 24),
  score integer not null check (score between 0 and 10000000),
  created_at timestamptz not null default now()
);

create index if not exists mission_rose_scores_top_idx
  on public.mission_rose_scores (score desc, created_at asc);

alter table public.mission_rose_scores enable row level security;

-- The browser never accesses this table directly. The Vercel API uses a server-only key.
revoke all on table public.mission_rose_scores from anon, authenticated;
grant usage on schema public to service_role;
grant select, insert, update on table public.mission_rose_scores to service_role;
