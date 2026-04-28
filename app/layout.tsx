import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://danieljedlicka.sk"),
  title: { default: "Daniel Jedlička — peniaze, biznis, sloboda", template: "%s · Daniel Jedlička" },
  description: "Bez bullshitu o peniazoch, biznise a slobode. Reálne stratégie ako tvoriť hodnotu, ktorá pracuje za teba.",
  openGraph: {
    type: "website",
    siteName: "Daniel Jedlička",
    images: ["/photos/dj-pdfmetoda-post4.jpg"],
  },
  alternates: {
    languages: { sk: "/sk", cs: "/cs" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk">
      <body>{children}</body>
    </html>
  );
}
