# Daniel Jedlička — Blog

Slovak/Czech bilingual blog for `danieljedlicka.sk`. Built on Next.js 14 (App Router), Tailwind, Supabase. V1 Bali Tropical design.

## Stack

- Next.js 14, React 18, TypeScript
- Tailwind CSS — Bali Tropical palette (palm/coral/sun/sand/cream)
- Supabase — articles CMS, comments, newsletter signups, pageviews
- Vercel — hosting + ISR (revalidate every 60s)

## Local dev

```bash
npm install
cp .env.example .env.local   # fill in Supabase keys
npm run dev
```

## Deployment

Pushed to GitHub → auto-deployed by Vercel. Set the four env vars in Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`

## Routes

- `/sk` and `/cs` — homepages
- `/sk/[slug]`, `/cs/[slug]` — article pages
- `/sitemap.xml`, `/robots.txt` — SEO
- `POST /api/newsletter` — email capture
- `POST /api/comments` and `GET /api/comments?articleId=` — comments
- `POST /api/pageview` — lightweight analytics

## Adding articles

Add rows to `public.articles` in Supabase Studio, set `status = 'published'`. Page revalidates within 60s.
