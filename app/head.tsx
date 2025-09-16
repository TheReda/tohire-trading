export default function Head() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ToHiRe Trading Morocco",
    url: "https://www.tohire-trading.local",
    logo: "/logo-dark.svg",
    address: { "@type": "PostalAddress", addressLocality: "Casablanca", addressCountry: "MA" },
    contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: "reda.elhattab@outlook.com", telephone: "+31621939420" }]
  };
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}