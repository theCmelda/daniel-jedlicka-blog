import { supabase, type Article } from "@/lib/supabase";
import { dict, type Locale } from "@/lib/i18n";
import ArticleCard from "@/components/ArticleCard";
import PageviewTracker from "@/components/PageviewTracker";
import Image from "next/image";

export const revalidate = 60;

export default async function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  const d = dict(locale);
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("locale", locale)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(24);
  const articles = (data ?? []) as Article[];

  return (
    <>
      <PageviewTracker path={`/${locale}`} locale={locale} />
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 pt-10 md:pt-16 pb-10 grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1">
          <span className="font-display text-3xl text-coral">Aloha 🌴</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-tight mt-2 mb-5">
            Peniaze, biznis a sloboda<br />
            <span className="text-palm">bez bullshitu.</span>
          </h1>
          <p className="text-lg md:text-xl text-ink/75 max-w-xl">
            {locale === "sk"
              ? "Som Daniel. Píšem o tom, ako tvoriť hodnotu, ktorá pracuje za teba — bez nudných keců, bez falošnej motivácie. Iba realita peňazí."
              : "Jsem Daniel. Píšu o tom, jak tvořit hodnotu, která pracuje za tebe — bez nudných keců, bez falešné motivace. Jen realita peněz."}
          </p>
          <a
            href="https://pdfmetoda.sk/najlepsi-biznis-model"
            className="inline-block mt-7 px-7 py-4 rounded-chunk bg-coral text-white font-semibold text-lg shadow-chunk hover:translate-y-1 hover:shadow-none transition-all"
          >
            {d.cta_main} →
          </a>
        </div>
        <div className="order-1 md:order-2 relative aspect-square max-w-md mx-auto w-full rounded-chunk overflow-hidden shadow-chunk border-4 border-white">
          <Image
            src="/photos/dj-pdfmetoda-post4.jpg"
            alt="Daniel Jedlička, infinity pool sunset"
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Articles grid */}
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
