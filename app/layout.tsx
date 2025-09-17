import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tohiretrading.com"),
  title: {
    default: "ToHiRe Trading Morocco — Recycling",
    template: "%s | TToHiRe Trading Morocco",
  },
  description: "ToHiRe Trading Morocco — your site description goes here.",
  openGraph: {
    title: "ToHiRe Trading Morocco",
    description: "ToHiRe Trading Morocco — your site description goes here.",
    url: "/",
    siteName: "ToHiRe Trading Morocco",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToHiRe Trading Morocco",
    description: "TToHiRe Trading Morocco — your site description goes here.",
  },
  alternates: {
    canonical: "/",
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
