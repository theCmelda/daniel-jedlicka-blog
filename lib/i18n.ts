export const locales = ["sk", "cs"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "sk";

export const t = {
  sk: {
    nav_articles: "Články",
    nav_about: "O Danielovi",
    nav_join: "Pripojiť sa",
    cta_main: "Pozri si stratégiu",
    newsletter_title: "Dostávaj nové články",
    newsletter_sub: "Bez spamu. Iba reálne stratégie ako sa robia peniaze.",
    newsletter_placeholder: "tvoj@email.sk",
    newsletter_submit: "Prihlásiť sa",
    newsletter_thanks: "Hotovo. Skontroluj si email.",
    comments_title: "Komentáre",
    comments_placeholder: "Napíš svoj komentár…",
    comments_name: "Tvoje meno",
    comments_submit: "Odoslať",
    comments_pending: "Ďakujem. Tvoj komentár čaká na schválenie.",
    read_more: "Čítať ďalej",
    minutes_read: "min čítania",
    locale_switch: "Čeština",
    locale_switch_to: "cs",
  },
  cs: {
    nav_articles: "Články",
    nav_about: "O Danielovi",
    nav_join: "Připojit se",
    cta_main: "Podívej se na strategii",
    newsletter_title: "Dostávej nové články",
    newsletter_sub: "Bez spamu. Jen reálné strategie jak se dělají peníze.",
    newsletter_placeholder: "tvuj@email.cz",
    newsletter_submit: "Přihlásit se",
    newsletter_thanks: "Hotovo. Zkontroluj si email.",
    comments_title: "Komentáře",
    comments_placeholder: "Napiš svůj komentář…",
    comments_name: "Tvoje jméno",
    comments_submit: "Odeslat",
    comments_pending: "Děkuji. Tvůj komentář čeká na schválení.",
    read_more: "Číst dál",
    minutes_read: "min čtení",
    locale_switch: "Slovenčina",
    locale_switch_to: "sk",
  },
} as const;

export function dict(locale: Locale) {
  return t[locale] ?? t[defaultLocale];
}
