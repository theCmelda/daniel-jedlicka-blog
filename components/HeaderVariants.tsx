import Link from "next/link";
import Image from "next/image";
import { dict, type Locale } from "@/lib/i18n";

type Props = { locale: Locale };

/* Reusable nav (right side, identical across all variants) */
function Nav({ locale }: Props) {
  const d = dict(locale);
  return (
    <nav className="flex items-center gap-2 md:gap-5 text-sm md:text-base">
      <Link href={`/${locale}`} className="hidden md:inline text-ink/80 hover:text-palm">{d.nav_articles}</Link>
      <Link href={`/${d.locale_switch_to}`} className="px-3 py-1.5 rounded-full bg-sand text-palm border border-palm/20 hover:bg-sun/40 transition-colors">{d.locale_switch}</Link>
      <a href="https://pdfmetoda.sk/najlepsi-biznis-model" className="px-4 py-2 rounded-full bg-coral text-white font-semibold hover:bg-coralDark transition-colors">{d.cta_main}</a>
    </nav>
  );
}

/* Reusable clean circle avatar — used by ALL variants */
function Circle({ size = 44 }: { size?: number }) {
  return (
    <span className="relative rounded-full overflow-hidden flex-shrink-0" style={{ width: size, height: size }}>
      <Image src="/photos/dj-bali-profile.jpg" alt="Daniel Jedlička" fill sizes={`${size}px`} className="object-cover" priority />
    </span>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-cream/85 border-b border-palm/10">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between gap-4">{children}</div>
    </header>
  );
}

/* H1 — Playfair bold serif, ink color, classic editorial */
export function HeaderH1({ locale }: Props) {
  return (
    <Shell>
      <Link href={`/${locale}`} className="flex items-center gap-3 group">
        <Circle />
        <span className="font-serif text-xl md:text-2xl font-bold text-ink group-hover:text-palm transition-colors tracking-tight">
          Daniel Jedlička
        </span>
      </Link>
      <Nav locale={locale} />
    </Shell>
  );
}

/* H2 — Playfair italic, palm green, sophisticated */
export function HeaderH2({ locale }: Props) {
  return (
    <Shell>
      <Link href={`/${locale}`} className="flex items-center gap-3 group">
        <Circle />
        <span className="font-serif italic text-2xl md:text-[26px] font-semibold text-palm">
          Daniel Jedlička
        </span>
      </Link>
      <Nav locale={locale} />
    </Shell>
  );
}

/* H3 — Caveat handwriting big, coral */
export function HeaderH3({ locale }: Props) {
  return (
    <Shell>
      <Link href={`/${locale}`} className="flex items-center gap-3 group">
        <Circle />
        <span className="font-display text-3xl md:text-4xl text-coral leading-none translate-y-0.5">
          Daniel Jedlička
        </span>
      </Link>
      <Nav locale={locale} />
    </Shell>
  );
}

/* H4 — Inter ExtraBold uppercase tracked, ink */
export function HeaderH4({ locale }: Props) {
  return (
    <Shell>
      <Link href={`/${locale}`} className="flex items-center gap-3 group">
        <Circle />
        <span className="font-sans text-sm md:text-base font-extrabold text-ink uppercase tracking-[0.2em]">
          Daniel Jedlička
        </span>
      </Link>
      <Nav locale={locale} />
    </Shell>
  );
}

/* H5 — Inter light, very minimal */
export function HeaderH5({ locale }: Props) {
  return (
    <Shell>
      <Link href={`/${locale}`} className="flex items-center gap-3 group">
        <Circle />
        <span className="font-sans text-lg md:text-xl font-light text-ink/85 tracking-wide">
          Daniel Jedlička
        </span>
      </Link>
      <Nav locale={locale} />
    </Shell>
  );
}

/* H6 — Two-tone Playfair: "Daniel" coral, "Jedlička" palm */
export function HeaderH6({ locale }: Props) {
  return (
    <Shell>
      <Link href={`/${locale}`} className="flex items-center gap-3 group">
        <Circle />
        <span className="font-serif text-xl md:text-2xl font-bold tracking-tight">
          <span className="text-coral">Daniel</span>{" "}
          <span className="text-palm">Jedlička</span>
        </span>
      </Link>
      <Nav locale={locale} />
    </Shell>
  );
}

/* H7 — Stacked: Caveat first name big + Inter last name small below */
export function HeaderH7({ locale }: Props) {
  return (
    <Shell>
      <Link href={`/${locale}`} className="flex items-center gap-3 group">
        <Circle size={48} />
        <span className="flex flex-col leading-none">
          <span className="font-display text-3xl text-coral">Daniel</span>
          <span className="font-sans text-xs text-palm uppercase tracking-[0.3em] mt-0.5">Jedlička</span>
        </span>
      </Link>
      <Nav locale={locale} />
    </Shell>
  );
}

/* H8 — Stacked editorial: serif name + tiny tagline below */
export function HeaderH8({ locale }: Props) {
  return (
    <Shell>
      <Link href={`/${locale}`} className="flex items-center gap-3 group">
        <Circle size={48} />
        <span className="flex flex-col leading-tight">
          <span className="font-serif text-lg md:text-xl font-bold text-ink">Daniel Jedlička</span>
          <span className="text-[10px] text-palm/70 uppercase tracking-[0.25em]">Peniaze · Biznis · Sloboda</span>
        </span>
      </Link>
      <Nav locale={locale} />
    </Shell>
  );
}

/* H9 — All-caps Playfair, condensed, very magazine */
export function HeaderH9({ locale }: Props) {
  return (
    <Shell>
      <Link href={`/${locale}`} className="flex items-center gap-3 group">
        <Circle />
        <span className="font-serif text-lg md:text-xl font-black text-ink uppercase tracking-[0.12em]">
          Daniel Jedlička
        </span>
      </Link>
      <Nav locale={locale} />
    </Shell>
  );
}

/* H10 — Lowercase Inter, modern indie hacker */
export function HeaderH10({ locale }: Props) {
  return (
    <Shell>
      <Link href={`/${locale}`} className="flex items-center gap-3 group">
        <Circle />
        <span className="font-sans text-lg md:text-xl font-semibold text-ink lowercase tracking-tight">
          daniel jedlička
        </span>
      </Link>
      <Nav locale={locale} />
    </Shell>
  );
}

/* Map for preview page */
export const HEADERS = {
  h1: { name: "H1 — Playfair bold (classic editorial)", Cmp: HeaderH1 },
  h2: { name: "H2 — Playfair italic palm green", Cmp: HeaderH2 },
  h3: { name: "H3 — Caveat handwriting coral", Cmp: HeaderH3 },
  h4: { name: "H4 — Inter ExtraBold uppercase tracked", Cmp: HeaderH4 },
  h5: { name: "H5 — Inter light minimal", Cmp: HeaderH5 },
  h6: { name: "H6 — Two-tone Daniel coral · Jedlička palm", Cmp: HeaderH6 },
  h7: { name: "H7 — Caveat 'Daniel' + Inter 'Jedlička' tag", Cmp: HeaderH7 },
  h8: { name: "H8 — Editorial name + tagline below", Cmp: HeaderH8 },
  h9: { name: "H9 — Playfair black uppercase", Cmp: HeaderH9 },
  h10: { name: "H10 — lowercase indie sans", Cmp: HeaderH10 },
} as const;
