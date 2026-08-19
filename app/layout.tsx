import type { Metadata } from "next";
import { Archivo, Fraunces, JetBrains_Mono, Jost } from "next/font/google";
import "./globals.css";
import { FareBar, JourneyProvider } from "./components/journey";
import { Footer, Masthead } from "./components/site-chrome";
import { RevealObserver } from "./components/reveal";

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://trust-track-xi.vercel.app",
);

const siteDescription =
  "Fixed-fare chauffeur transport for pilgrims arriving from the UK, the US and Pakistan. Jeddah and Madinah airport transfers, Makkah–Madinah intercity travel, and Ziyarat touring, priced per vehicle and held from quote to drop-off.";

/**
 * Four faces, four fixed roles.
 * Jost is the display voice: light, wide, architectural — the same register as
 * the wordmark in the logo. Fraunces is the secondary voice, carrying the lede
 * under every headline; a warm variable serif, so the sentence that has to
 * persuade no longer looks like the sentence that merely informs. Archivo does
 * the plain running text. JetBrains Mono is the instrument: fares, route codes,
 * distances, durations.
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  // Variable font: `axes` requires the weight axis stay variable too.
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Trust Track Travels | Saudi Arabia Transfers & Ziyarat",
    template: "%s | Trust Track Travels",
  },
  description: siteDescription,
  applicationName: "Trust Track Travels",
  authors: [{ name: "Trust Track Travels" }],
  creator: "Trust Track Travels",
  publisher: "Trust Track Travels",
  keywords: [
    "Saudi Arabia airport transfer",
    "Makkah transfer",
    "Madinah transfer",
    "Makkah Ziyarat",
    "Madinah Ziyarat",
    "Umrah transport",
    "pilgrimage transport Saudi Arabia",
    "Jeddah airport transfer",
    "Saudi inter-city transport",
    "Trust Track Travels",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Trust Track Travels",
    title: "Trust Track Travels | Saudi Arabia Transfers & Ziyarat",
    description: siteDescription,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Trust Track Travels",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Trust Track Travels | Saudi Arabia Transfers & Ziyarat",
    description: siteDescription,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Trust Track Travels",
  url: siteUrl.href,
  logo: new URL("/logo.png", siteUrl).href,
  description: siteDescription,
  areaServed: {
    "@type": "Country",
    name: "Saudi Arabia",
  },
  knowsAbout: [
    "Airport transfers",
    "Makkah and Madinah Ziyarat",
    "Umrah transportation",
    "Inter-city travel in Saudi Arabia",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${fraunces.variable} ${archivo.variable} ${jetbrains.variable} antialiased`}
    >
      <body>
        <RevealObserver />
        <JourneyProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Masthead />
          <main id="main">{children}</main>
          <Footer />
          <FareBar />
        </JourneyProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
