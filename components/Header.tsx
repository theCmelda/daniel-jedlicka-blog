import Link from "next/link";
import Image from "next/image";
import { dict, type Locale } from "@/lib/i18n";

export default function Header({ locale }: { locale: Locale }) {
  const d = dict(locale);
  const altLocale = d.locale_switch_to;
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-cream/85 border-b border-palm/10">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-4">
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          <span className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/photos/dj-bali-profile.jpg"
              alt="Daniel Jedlička"
              fill
              sizes="48px"
              className="object-cover"
              priority
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-lg md:text-xl font-bold text-ink group-hover:text-palm transition-colors">
              Daniel Jedlička
            </span>
            <span className="text-[10px] md:text-[11px] text-palm/70 uppercase tracking-[0.25em]">
              {locale === "sk" ? "Peniaze · Biznis · Sloboda" : "Peníze · Byznys · Svoboda"}
            </span>
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
            className="px-4 py-2 rounded-full bg-coral text-white font-semibold hover:bg-coralDark transition-colors"
          >
            {d.cta_main}
          </a>
        </nav>
      </div>
    </header>
  );
}
