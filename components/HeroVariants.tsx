import Image from "next/image";
import { dict, type Locale } from "@/lib/i18n";

type Props = { locale: Locale };

/* ──────────────────────────────────────────────
   V1 — current live: photo right, text left
   ────────────────────────────────────────────── */
export function HeroV1({ locale }: Props) {
  const d = dict(locale);
  return (
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
        <a href="https://pdfmetoda.sk/najlepsi-biznis-model" className="inline-block mt-7 px-7 py-4 rounded-chunk bg-coral text-white font-semibold text-lg shadow-chunk hover:translate-y-1 hover:shadow-none transition-all">
          {d.cta_main} →
        </a>
      </div>
      <div className="order-1 md:order-2 relative aspect-square max-w-md mx-auto w-full rounded-chunk overflow-hidden shadow-chunk border-4 border-white">
        <Image src="/photos/dj-pdfmetoda-post4.jpg" alt="Daniel Jedlička" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" priority />
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   V2 — reversed: photo LEFT, text right
   ────────────────────────────────────────────── */
export function HeroV2({ locale }: Props) {
  const d = dict(locale);
  return (
    <section className="max-w-6xl mx-auto px-5 pt-10 md:pt-16 pb-10 grid md:grid-cols-2 gap-10 items-center">
      <div className="relative aspect-[4/5] max-w-md mx-auto w-full rounded-chunk overflow-hidden shadow-chunkCoral border-4 border-white">
        <Image src="/photos/dj-pdfmetoda-post6.jpg" alt="Daniel Jedlička" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" priority />
      </div>
      <div>
        <span className="font-display text-3xl text-coral">Aloha 🌴</span>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-tight mt-2 mb-5">
          <span className="text-palm">Peniaze.</span><br />
          <span className="text-coral italic">Biznis.</span><br />
          Sloboda.
        </h1>
        <p className="text-lg md:text-xl text-ink/75 max-w-xl">
          {locale === "sk"
            ? "Bez bullshitu, bez falošnej motivácie. Iba reálna stratégia ako tvoriť hodnotu, ktorá pracuje za teba."
            : "Bez bullshitu, bez falešné motivace. Jen reálná strategie jak tvořit hodnotu, která pracuje za tebe."}
        </p>
        <a href="https://pdfmetoda.sk/najlepsi-biznis-model" className="inline-block mt-7 px-7 py-4 rounded-chunk bg-coral text-white font-semibold text-lg shadow-chunk hover:translate-y-1 hover:shadow-none transition-all">
          {d.cta_main} →
        </a>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   V3 — wide hero photo with text overlay below
   ────────────────────────────────────────────── */
export function HeroV3({ locale }: Props) {
  const d = dict(locale);
  return (
    <section className="max-w-6xl mx-auto px-5 pt-10 md:pt-16 pb-10">
      <div className="relative w-full aspect-[16/7] rounded-chunk overflow-hidden shadow-chunk border-4 border-white">
        <Image src="/photos/dj-pdfmetoda-post4.jpg" alt="Daniel Jedlička" fill sizes="100vw" className="object-cover" priority />
      </div>
      <div className="text-center mt-12 max-w-3xl mx-auto">
        <span className="font-display text-3xl text-coral block mb-2">Aloha 🌴</span>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-tight mb-5">
          Peniaze, biznis a <span className="text-palm italic">sloboda</span><br />
          bez bullshitu.
        </h1>
        <p className="text-lg md:text-xl text-ink/75 max-w-2xl mx-auto">
          {locale === "sk"
            ? "Som Daniel. Píšem o tom, ako tvoriť hodnotu, ktorá pracuje za teba — bez nudných keců, bez falošnej motivácie. Iba realita peňazí."
            : "Jsem Daniel. Píšu o tom, jak tvořit hodnotu, která pracuje za tebe — bez nudných keců, bez falešné motivace. Jen realita peněz."}
        </p>
        <a href="https://pdfmetoda.sk/najlepsi-biznis-model" className="inline-block mt-7 px-7 py-4 rounded-chunk bg-coral text-white font-semibold text-lg shadow-chunk hover:translate-y-1 hover:shadow-none transition-all">
          {d.cta_main} →
        </a>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   V4 — twin photos right (portrait + landscape)
   ────────────────────────────────────────────── */
export function HeroV4({ locale }: Props) {
  const d = dict(locale);
  return (
    <section className="max-w-6xl mx-auto px-5 pt-10 md:pt-16 pb-10 grid md:grid-cols-2 gap-10 items-center">
      <div className="order-2 md:order-1">
        <span className="font-display text-3xl text-coral">Aloha 🌴</span>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-tight mt-2 mb-5">
          Peniaze, biznis a sloboda<br />
          <span className="text-palm">bez bullshitu.</span>
        </h1>
        <p className="text-lg md:text-xl text-ink/75 max-w-xl">
          {locale === "sk"
            ? "Som Daniel. Píšem o tom, ako tvoriť hodnotu, ktorá pracuje za teba — bez nudných keců, bez falošnej motivácie."
            : "Jsem Daniel. Píšu o tom, jak tvořit hodnotu, která pracuje za tebe — bez nudných keců, bez falešné motivace."}
        </p>
        <a href="https://pdfmetoda.sk/najlepsi-biznis-model" className="inline-block mt-7 px-7 py-4 rounded-chunk bg-coral text-white font-semibold text-lg shadow-chunk hover:translate-y-1 hover:shadow-none transition-all">
          {d.cta_main} →
        </a>
      </div>
      <div className="order-1 md:order-2 grid grid-cols-2 gap-3 max-w-md mx-auto w-full">
        <div className="relative aspect-[4/5] rounded-chunk overflow-hidden shadow-chunk border-4 border-white -rotate-2">
          <Image src="/photos/dj-pdfmetoda-post1.jpg" alt="" fill sizes="25vw" className="object-cover" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="relative aspect-square rounded-chunk overflow-hidden shadow-chunkSun border-4 border-white rotate-2">
            <Image src="/photos/dj-pdfmetoda-post4.jpg" alt="" fill sizes="25vw" className="object-cover" priority />
          </div>
          <div className="relative aspect-square rounded-chunk overflow-hidden shadow-chunkCoral border-4 border-white -rotate-1">
            <Image src="/photos/dj-pdfmetoda-post3.jpg" alt="" fill sizes="25vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   V5 — circle photo + palm leaf SVG accents
   ────────────────────────────────────────────── */
export function HeroV5({ locale }: Props) {
  const d = dict(locale);
  return (
    <section className="relative max-w-6xl mx-auto px-5 pt-10 md:pt-16 pb-10 grid md:grid-cols-2 gap-10 items-center overflow-hidden">
      {/* palm leaf SVG accents */}
      <svg className="absolute -top-8 -left-8 w-40 h-40 text-palm/10 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 5 C 70 25 80 45 60 70 C 50 60 40 50 40 30 Z M50 5 C 30 25 20 45 40 70 C 50 60 60 50 60 30 Z" />
      </svg>
      <svg className="absolute -bottom-8 -right-8 w-48 h-48 text-coral/10 pointer-events-none rotate-180" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 5 C 70 25 80 45 60 70 C 50 60 40 50 40 30 Z M50 5 C 30 25 20 45 40 70 C 50 60 60 50 60 30 Z" />
      </svg>
      <div className="order-2 md:order-1 relative z-10">
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
        <a href="https://pdfmetoda.sk/najlepsi-biznis-model" className="inline-block mt-7 px-7 py-4 rounded-chunk bg-coral text-white font-semibold text-lg shadow-chunk hover:translate-y-1 hover:shadow-none transition-all">
          {d.cta_main} →
        </a>
      </div>
      <div className="order-1 md:order-2 relative w-full max-w-md mx-auto aspect-square">
        {/* sun ring behind */}
        <div className="absolute inset-0 rounded-full bg-sun/40 scale-110 -translate-x-3 translate-y-3"></div>
        <div className="absolute inset-0 rounded-full overflow-hidden border-[6px] border-white shadow-chunk">
          <Image src="/photos/dj-pdfmetoda-post4.jpg" alt="Daniel Jedlička" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" priority />
        </div>
      </div>
    </section>
  );
}
