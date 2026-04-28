import Link from "next/link";
import Image from "next/image";
import { dict, type Locale } from "@/lib/i18n";

export default function Header({ locale }: { locale: Locale }) {
  const d = dict(locale);
  const altLocale = d.locale_switch_to;
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-cream/80 border-b border-palm/10">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          <span className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-palm shadow-chunkSun">
            <Image
              src="/photos/dj-bali-profile.jpg"
              alt="Daniel Jedlička"
              fill
              sizes="44px"
              className="object-cover"
              priority
            />
          </span>
          <span className="font-serif text-xl md:text-2xl text-palm group-hover:text-coral transition-colors">
            Daniel Jedlička
          </span>
        </Link>
        <nav className="flex items-center gap-2 md:gap-5 text-sm md:text-base">
          <Link href={`/${locale}`} className="hidden md:inline text-ink/80 hover:text-palm">
            {d.nav_articles}
          </Link>
          <Link
            href={`/${altLocale}`}
            className="px-3 py-1.5 rounded-full bg-sand text-palm border border-palm/20 hover:bg-sun/40 transition-colors"
            aria-label={`Switch language to ${d.locale_switch}`}
          >
            {d.locale_switch}
          </Link>
          <a
            href="https://pdfmetoda.sk/najlepsi-biznis-model"
            className="button px-4 py-2 rounded-full bg-coral text-white font-semibold shadow-chunk hover:translate-y-0.5 hover:shadow-none transition-all"
          >
            {d.cta_main}
          </a>
        </nav>
      </div>
    </header>
  );
}
