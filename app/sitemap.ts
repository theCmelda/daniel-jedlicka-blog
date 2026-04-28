import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://danieljedlicka.sk";
  const { data } = await supabase
    .from("articles")
    .select("slug, locale, updated_at")
    .eq("status", "published");

  const urls: MetadataRoute.Sitemap = [
    { url: `${base}/sk`, changeFrequency: "daily", priority: 1 },
    { url: `${base}/cs`, changeFrequency: "daily", priority: 1 },
  ];

  for (const a of data ?? []) {
    urls.push({
      url: `${base}/${a.locale}/${a.slug}`,
      lastModified: a.updated_at ?? undefined,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }
  return urls;
}
