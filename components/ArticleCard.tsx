import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/supabase";
import type { Locale } from "@/lib/i18n";
import { dict } from "@/lib/i18n";

export default function ArticleCard({ article, locale }: { article: Article; locale: Locale }) {
  const d = dict(locale);
  return (
    <Link
      href={`/${locale}/${article.slug}`}
      className="group block bg-white rounded-chunk overflow-hidden border-2 border-palm/15 shadow-chunk hover:translate-y-1 hover:shadow-none transition-all"
    >
      {article.hero_image_url ? (
        <div className="relative w-full aspect-[16/10] bg-sand">
          <Image
            src={article.hero_image_url}
            alt={article.title}
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-full aspect-[16/10] bg-gradient-to-br from-palm/30 via-sun/30 to-coral/30" />
      )}
      <div className="p-5">
        {article.category && (
          <span className="inline-block mb-2 text-xs uppercase tracking-wide text-coral font-semibold">
            {article.category}
          </span>
        )}
        <h3 className="font-serif text-xl md:text-2xl text-ink group-hover:text-palm leading-tight mb-2">
          {article.title}
        </h3>
        {article.excerpt && <p className="text-ink/70 text-base leading-relaxed">{article.excerpt}</p>}
        <span className="mt-4 inline-flex items-center gap-1 text-palm font-semibold">
          {d.read_more} →
        </span>
      </div>
    </Link>
  );
}
