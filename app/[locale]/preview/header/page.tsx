import type { Locale } from "@/lib/i18n";
import { HEADERS } from "@/components/HeaderVariants";
import Image from "next/image";

export const metadata = { title: "Header variants · preview" };

export default function HeaderPreview({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const entries = Object.entries(HEADERS) as [keyof typeof HEADERS, (typeof HEADERS)[keyof typeof HEADERS]][];
  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-palm text-white py-3 px-5 text-center text-sm">
        <strong>Header preview · 10 variants</strong> — scroll to compare. Tell me which `Hxx` to ship live.
      </div>
      <div className="max-w-3xl mx-auto px-4 pt-8 pb-20">
        {entries.map(([key, { name, Cmp }], i) => (
          <section key={key} className="mb-10">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-palm mb-2 px-1">
              {String(i + 1).padStart(2, "0")} · {name}
            </div>
            <div className="rounded-2xl overflow-hidden border-2 border-palm/15 shadow-md bg-cream">
              {/* Render the header in isolated wrapper without sticky behavior so each can be seen in sequence */}
              <div className="relative">
                <div className="not-sticky">
                  <Cmp locale={locale} />
                </div>
              </div>
              {/* Sample content snippet under each header to show context */}
              <div className="px-5 pt-6 pb-8 grid md:grid-cols-2 gap-6 items-center bg-cream">
                <div>
                  <span className="font-display text-2xl text-coral">Aloha 🌴</span>
                  <h2 className="font-serif text-2xl md:text-3xl text-ink leading-tight mt-1 mb-3">
                    Peniaze, biznis a <span className="text-palm">sloboda</span>
                  </h2>
                  <p className="text-sm text-ink/70">
                    Krátka ukážka tela stránky pod každým headerom — aby si videl ako to spolu vyzerá.
                  </p>
                </div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-white shadow-sm">
                  <Image src="/photos/dj-pdfmetoda-post4.jpg" alt="" fill sizes="(max-width:768px) 100vw, 320px" className="object-cover" />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
      {/* Override sticky on inner headers within preview */}
      <style>{`.not-sticky header{position:relative !important;top:auto !important}`}</style>
    </div>
  );
}
