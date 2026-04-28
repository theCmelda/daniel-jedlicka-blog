import { notFound } from "next/navigation";
import { supabase, type Article } from "@/lib/supabase";
import { dict, type Locale, locales } from "@/lib/i18n";
import ArticleCard from "@/components/ArticleCard";
import { HeroV1, HeroV2, HeroV3, HeroV4, HeroV5 } from "@/components/HeroVariants";

export const revalidate = 60;

const VARIANTS = ["1", "2", "3", "4", "5"] as const;

const LABELS: Record<string, { name: string; tag: string }> = {
  "1": { name: "V1 — Photo right (current)", tag: "Klasika" },
  "2": { name: "V2 — Photo left, vertical headline", tag: "Reverse + serif drama" },
  "3": { name: "V3 — Wide hero, centered text", tag: "Magazine spread" },
  "4": { name: "V4 — Twin tilted photos", tag: "Polaroid stack" },
  "5": { name: "V5 — Circle portrait + sun ring", tag: "Tropical halo" },
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    VARIANTS.map((id) => ({ locale, id }))
  );
}

export async function generateMetadata({
  params: { id },
}: {
  params: { locale: Locale; id: string };
}) {
  const label = LABELS[id]?.name ?? "Preview";
  return { title: `${label} · Preview` };
}

export default async function PreviewPage({
  params: { locale, id },
}: {
  params: { locale: Locale; id: string };
}) {
  if (!VARIANTS.includes(id as (typeof VARIANTS)[number])) notFound();
  const d = dict(locale);
  const label = LABELS[id];

  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("locale", locale)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(24);
  const articles = (data ?? []) as Article[];

  const Hero =
    id === "1" ? HeroV1
    : id === "2" ? HeroV2
    : id === "3" ? HeroV3
    : id === "4" ? HeroV4
    : HeroV5;

  return (
    <>
      {/* Preview-mode banner */}
      <div className="bg-palm text-white py-3 px-5 text-center text-sm">
        <strong>Preview {id}/5:</strong> {label.name} · <span className="opacity-80">{label.tag}</span>
        <span className="mx-3 opacity-50">|</span>
        <a href={`/${locale}/preview/1`} className="underline hover:no-underline mx-1">V1</a>
        <a href={`/${locale}/preview/2`} className="underline hover:no-underline mx-1">V2</a>
        <a href={`/${locale}/preview/3`} className="underline hover:no-underline mx-1">V3</a>
        <a href={`/${locale}/preview/4`} className="underline hover:no-underline mx-1">V4</a>
        <a href={`/${locale}/preview/5`} className="underline hover:no-underline mx-1">V5</a>
      </div>

      <Hero locale={locale} />

      <section className="max-w-6xl mx-auto px-5 pt-6 pb-20">
        <h2 className="font-serif text-3xl md:text-4xl text-palm mb-8">{d.nav_articles}</h2>
        {articles.length === 0 ? (
          <p className="text-ink/60">No articles yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a) => (
              <ArticleCard key={a.id} article={a} locale={locale} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
