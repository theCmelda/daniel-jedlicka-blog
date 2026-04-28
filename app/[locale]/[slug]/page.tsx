import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { supabase, type Article } from "@/lib/supabase";
import { dict, type Locale } from "@/lib/i18n";
import { markdownToHtml } from "@/lib/markdown";
import CommentSection from "@/components/CommentSection";
import NewsletterForm from "@/components/NewsletterForm";
import PageviewTracker from "@/components/PageviewTracker";

export const revalidate = 60;

async function getArticle(locale: Locale, slug: string): Promise<Article | null> {
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("locale", locale)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  return (data ?? null) as Article | null;
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const a = await getArticle(locale, slug);
  if (!a) return { title: "Not found" };
  return {
    title: a.title,
    description: a.excerpt ?? undefined,
    openGraph: {
      title: a.title,
      description: a.excerpt ?? undefined,
      images: a.hero_image_url ? [a.hero_image_url] : undefined,
      locale,
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string };
}) {
  const a = await getArticle(locale, slug);
  if (!a) notFound();
  const d = dict(locale);
  const html = await markdownToHtml(a.body_md);

  return (
    <article className="max-w-3xl mx-auto px-5 pt-10 md:pt-16">
      <PageviewTracker path={`/${locale}/${slug}`} locale={locale} />
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

      {/* Inline CTA */}
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

      {/* Newsletter */}
      <section className="my-12 p-6 rounded-chunk bg-sand border-2 border-palm/20">
        <h3 className="font-serif text-2xl text-palm mb-2">{d.newsletter_title}</h3>
        <p className="text-ink/70 mb-4">{d.newsletter_sub}</p>
        <NewsletterForm locale={locale} sourceSlug={a.slug} />
      </section>

      {/* Comments */}
      <CommentSection articleId={a.id} locale={locale} />
    </article>
  );
}
