import Link from "next/link";
import { dict, type Locale } from "@/lib/i18n";
import NewsletterForm from "./NewsletterForm";

export default function Footer({ locale }: { locale: Locale }) {
  const d = dict(locale);
  return (
    <footer className="mt-24 border-t border-palm/10 bg-sand/50">
      <div className="max-w-6xl mx-auto px-5 py-12 grid md:grid-cols-2 gap-10">
        <div>
          <h3 className="font-serif text-2xl text-palm mb-2">{d.newsletter_title}</h3>
          <p className="text-ink/70 mb-4 max-w-md">{d.newsletter_sub}</p>
          <NewsletterForm locale={locale} />
        </div>
        <div className="text-sm text-ink/60 flex flex-col gap-2">
          <span>© {new Date().getFullYear()} Daniel Jedlička</span>
          <Link href={`/${locale}`} className="hover:text-palm">{d.nav_articles}</Link>
          <a href="https://pdfmetoda.sk" className="hover:text-palm" target="_blank" rel="noreferrer">
            pdfmetoda.sk
          </a>
        </div>
      </div>
    </footer>
  );
}
