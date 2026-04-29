import Link from "next/link";
import Image from "next/image";
import { supabase, type Article } from "@/lib/supabase";
import type { Locale } from "@/lib/i18n";

export const revalidate = 30;
export const metadata = { title: "10 article styles · preview" };

export default async function StylePreviewIndex({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("locale", locale)
    .eq("status", "draft")
    .like("category", "Štýl%")
    .order("slug", { ascending: true });
  const drafts = (data ?? []) as Article[];

  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-palm text-white py-3 px-5 text-center text-sm">
        <strong>10 článkov · 10 štýlov · jedna téma.</strong> Klikni na ktorýkoľvek a prečítaj v reálnom blog layoute. Daj mi vedieť, ktorý štýl ide na prod.
      </div>
      <section className="max-w-5xl mx-auto px-5 pt-10 pb-20">
        <h1 className="font-serif text-4xl md:text-5xl text-palm mb-2">Štýl test</h1>
        <p className="text-ink/70 text-lg mb-10 max-w-2xl">
          Tých istých 10 článkov o tej istej téme („Prečo šetrením nikdy nezbohatneš") napísaných v 10 úplne odlišných hlasoch. Vyber si voice, ktorý ti najlepšie sedí.
        </p>
        {drafts.length === 0 ? (
          <p className="text-ink/60">Drafty sa ešte nenahrali. Skús refresh za 30 sekúnd.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {drafts.map((a) => (
              <Link
                key={a.id}
                href={`/${locale}/preview/styles/${a.slug}`}
                className="group block bg-white rounded-chunk overflow-hidden border-2 border-palm/15 shadow-chunk hover:translate-y-1 hover:shadow-none transition-all"
              >
                {a.hero_image_url ? (
                  <div className="relative w-full aspect-[16/10] bg-sand">
                    <Image src={a.hero_image_url} alt={a.title} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
                  </div>
                ) : (
                  <div className="w-full aspect-[16/10] bg-gradient-to-br from-palm/30 via-sun/30 to-coral/30" />
                )}
                <div className="p-5">
                  {a.category && (
                    <span className="inline-block mb-2 text-xs uppercase tracking-wide text-coral font-semibold">
                      {a.category}
                    </span>
                  )}
                  <h3 className="font-serif text-xl md:text-2xl text-ink group-hover:text-palm leading-tight mb-2">
                    {a.title}
                  </h3>
                  {a.excerpt && <p className="text-ink/70 text-sm leading-relaxed line-clamp-3">{a.excerpt}</p>}
                  {a.reading_minutes && (
                    <span className="mt-3 inline-block text-xs text-palm/70">{a.reading_minutes} min čítania</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
