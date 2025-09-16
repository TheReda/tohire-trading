import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToHiRe Trading Morocco — Recycling Trading (OCC/NCC)",
  description:
    "Connecting recycling worldwide: Wastepaper OCC/NCC focus, plastics & metals on request. WhatsApp +31 6 21 93 94 20.",
  metadataBase: new URL("https://www.tohire-trading.example"), // TODO change domain
  openGraph: {
    title: "ToHiRe Trading Morocco",
    description: "Recyclables trading — OCC/NCC focus.",
    url: "https://www.tohire-trading.example",
    siteName: "ToHiRe Trading Morocco",
    images: ["/og.png"],
    locale: "en",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ToHiRe Trading Morocco",
    url: "https://www.tohire-trading.example",
    logo: "/logo-dark.svg",
    address: { "@type": "PostalAddress", addressLocality: "Casablanca", addressCountry: "MA" },
    contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: "reda.elhattab@outlook.com", telephone: "+31621939420" }],
    sameAs: []
  };

  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
