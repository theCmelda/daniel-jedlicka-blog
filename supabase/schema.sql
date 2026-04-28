-- =================================================================
-- Daniel Jedlička blog — Supabase schema
-- Run via Supabase Studio → SQL Editor → New query → paste → Run
-- =================================================================

-- 1. ARTICLES
create table if not exists public.articles (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null,
  locale          text not null check (locale in ('sk','cs')),
  title           text not null,
  excerpt         text,
  body_md         text not null,
  hero_image_url  text,
  category        text,
  tags            text[] default '{}',
  status          text not null default 'draft' check (status in ('draft','published','archived')),
  primary_keyword text,
  cta_target      text default '/najlepsi-biznis-model',
  reading_minutes int,
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (slug, locale)
);

create index if not exists articles_status_idx on public.articles (status, published_at desc);
create index if not exists articles_locale_idx on public.articles (locale);
create index if not exists articles_category_idx on public.articles (category);

-- 2. NEWSLETTER SUBSCRIBERS
create table if not exists public.subscribers (
  id           uuid primary key default gen_random_uuid(),
  email        text not null unique,
  locale       text default 'sk',
  source_slug  text,
  user_agent   text,
  ip           text,
  confirmed_at timestamptz,
  created_at   timestamptz not null default now()
);

create index if not exists subscribers_created_idx on public.subscribers (created_at desc);

-- 3. COMMENTS
create table if not exists public.comments (
  id           uuid primary key default gen_random_uuid(),
  article_id   uuid not null references public.articles(id) on delete cascade,
  parent_id    uuid references public.comments(id) on delete cascade,
  author_name  text not null,
  author_email text,
  body         text not null,
  status       text not null default 'pending' check (status in ('pending','approved','spam','rejected')),
  ip           text,
  user_agent   text,
  created_at   timestamptz not null default now()
);

create index if not exists comments_article_status_idx on public.comments (article_id, status, created_at);

-- 4. PAGEVIEWS (lightweight analytics)
create table if not exists public.pageviews (
  id           bigserial primary key,
  path         text not null,
  locale       text,
  referrer     text,
  user_agent   text,
  country      text,
  session_hash text,
  created_at   timestamptz not null default now()
);

create index if not exists pageviews_created_idx on public.pageviews (created_at desc);
create index if not exists pageviews_path_idx on public.pageviews (path);

-- 5. ROW-LEVEL SECURITY
-- Public can READ published articles + approved comments. Everything else service-role only.
alter table public.articles      enable row level security;
alter table public.comments      enable row level security;
alter table public.subscribers   enable row level security;
alter table public.pageviews     enable row level security;

-- Articles: public read of published rows
drop policy if exists "Public read published articles" on public.articles;
create policy "Public read published articles" on public.articles
  for select using (status = 'published');

-- Comments: public read of approved rows
drop policy if exists "Public read approved comments" on public.comments;
create policy "Public read approved comments" on public.comments
  for select using (status = 'approved');

-- Comments: anyone can insert (will land in pending)
drop policy if exists "Anyone can submit a comment" on public.comments;
create policy "Anyone can submit a comment" on public.comments
  for insert with check (status = 'pending');

-- Subscribers: anyone can insert their email
drop policy if exists "Anyone can subscribe" on public.subscribers;
create policy "Anyone can subscribe" on public.subscribers
  for insert with check (true);

-- Pageviews: anyone can insert
drop policy if exists "Anyone can log a pageview" on public.pageviews;
create policy "Anyone can log a pageview" on public.pageviews
  for insert with check (true);

-- 6. UPDATED_AT TRIGGER for articles
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
  before update on public.articles
  for each row execute function public.set_updated_at();

-- 7. SEED: one example article so the homepage isn't empty on first deploy
insert into public.articles (slug, locale, title, excerpt, body_md, status, published_at, category, primary_keyword, hero_image_url)
values (
  'vitajte-na-blogu',
  'sk',
  'Vitajte na blogu Daniela Jedličku',
  'Toto je prvý článok. Nenahrádza nič, čo už máš — prináša nový pohľad na peniaze, biznis a slobodu.',
  e'## Toto nie je ďalší motivačný blog\n\nMojím cieľom je len jedno — pomôcť ti uvidieť realitu peňazí takú, aká je.\n\nŠkola ťa naučila pracovať za hodiny. Nikdy ťa nenaučila, ako tvoriť hodnotu, ktorá pracuje za teba.\n\nZačnime od najtvrdšej pravdy: **šetrenie ťa nikdy neurobí bohatým.** Bohatstvo prichádza zo zvyšovania príjmu, nie zo škrtania na káve.\n\nV ďalších článkoch ti ukážem konkrétne stratégie, ako si vybudovať príjem, ktorý nie je viazaný na čas.',
  'published',
  now(),
  'mindset',
  'finančná sloboda',
  null
)
on conflict (slug, locale) do nothing;

insert into public.articles (slug, locale, title, excerpt, body_md, status, published_at, category, primary_keyword, hero_image_url)
values (
  'vitejte-na-blogu',
  'cs',
  'Vítejte na blogu Daniela Jedličky',
  'Toto je první článek. Nenahrazuje nic, co už máš — přináší nový pohled na peníze, byznys a svobodu.',
  e'## Tohle není další motivační blog\n\nMým cílem je jediné — pomoct ti vidět realitu peněz takovou, jaká je.\n\nŠkola tě naučila pracovat za hodiny. Nikdy tě nenaučila, jak tvořit hodnotu, která pracuje za tebe.\n\nZačněme od nejtvrdší pravdy: **spoření tě nikdy nezbohatí.** Bohatství přichází ze zvyšování příjmu, ne z šetření na kávě.',
  'published',
  now(),
  'mindset',
  'finanční svoboda',
  null
)
on conflict (slug, locale) do nothing;
