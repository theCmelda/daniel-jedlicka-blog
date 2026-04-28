import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase = createClient(url, anon, {
  auth: { persistSession: false },
});

// Service-role client for write APIs that bypass RLS (newsletter insert with dedupe etc)
export const supabaseAdmin = service
  ? createClient(url, service, { auth: { persistSession: false } })
  : null;

export type Article = {
  id: string;
  slug: string;
  locale: "sk" | "cs";
  title: string;
  excerpt: string | null;
  body_md: string;
  hero_image_url: string | null;
  category: string | null;
  tags: string[];
  status: "draft" | "published" | "archived";
  primary_keyword: string | null;
  cta_target: string | null;
  reading_minutes: number | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Comment = {
  id: string;
  article_id: string;
  parent_id: string | null;
  author_name: string;
  body: string;
  status: "pending" | "approved" | "spam" | "rejected";
  created_at: string;
};
