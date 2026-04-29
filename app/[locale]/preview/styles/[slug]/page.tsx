import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase, type Article } from "@/lib/supabase";
import { dict, type Locale } from "@/lib/i18n";
import { markdownToHtml } from "@/lib/markdown";

export const revalidate = 30;

async function getDraft(locale: Locale, slug: string): Promise<Article | null> {
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("locale", locale)
    .eq("slug", slug)
    .eq("status", "draft")
    .maybeSingle();
  return (data ?? null) as Article | null;
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const a = await getDraft(locale, slug);
  if (!a) return { title: "Preview not found" };
  return { title: `${a.title} · Style preview` };
}

export default async function StyleArticlePreview({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string };
}) {
  const a = await getDraft(locale, slug);
  if (!a) notFound();
  const d = dict(locale);
  const html = await markdownToHtml(a.body_md);

  return (
    <>
      <div className="bg-palm text-white py-3 px-5 text-center text-sm">
        <strong>Style preview:</strong> {a.category}
        <span className="mx-3 opacity-50">|</span>
        <Link href={`/${locale}/preview/styles`} className="underline hover:no-underline">← všetky štýly</Link>
      </div>
      <article className="max-w-3xl mx-auto px-5 pt-10 md:pt-16">
        {a.category && (
          <span className="inline-block mb-3 text-xs uppercase tracking-wide text-coral font-semibold">
            {a.category}
          </span>
        )}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-tight mb-5">
          {a.title}
        </h1>
        {a.excerpt && <p className="text-xl text-ink/70 mb-8">{a.excerpt}</p>}
        {a.hero_image_url && (
          <div className="relative w-full aspect-[16/9] rounded-chunk overflow-hidden shadow-chunk mb-10">
            <Image src={a.hero_image_url} alt={a.title} fill sizes="(max-width:768px) 100vw, 768px" className="object-cover" priority />
          </div>
        )}
        <div className="prose-bali" dangerouslySetInnerHTML={{ __html: html }} />

        <aside className="my-12 p-6 rounded-chunk bg-palm text-white shadow-chunkSun">
          <h3 className="font-serif text-2xl mb-2">{d.cta_main}</h3>
          <p className="text-white/80 mb-4">
            {locale === "sk"
              ? "Pozri si stratégiu, ktorá pomohla stovkám ľudí v SK a CZ."
              : "Podívej se na strategii, která pomohla stovkám lidí v SK a CZ."}
          </p>
          <a
            href={a.cta_target ?? "https://pdfmetoda.sk/najlepsi-biznis-model"}
            className="inline-block px-6 py-3 rounded-chunk bg-coral text-white font-semibold"
          >
            {d.cta_main} →
          </a>
        </aside>

        <div className="text-center my-10">
          <Link href={`/${locale}/preview/styles`} className="text-palm underline">
            ← Späť na zoznam štýlov
          </Link>
        </div>
      </article>
    </>
  );
}
