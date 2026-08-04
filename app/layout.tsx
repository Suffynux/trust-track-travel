import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://trust-track-xi.vercel.app",
);

const siteDescription =
  "Safe, comfortable travel in Saudi Arabia with airport transfers, Makkah and Madinah Ziyarat, inter-city trips, and 24/7 professional support.";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: "/logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Trust Track Travels",
    title: "Trust Track Travels | Saudi Arabia Transfers & Ziyarat",
    description: siteDescription,
    images: [
      {
        url: "/logo.svg",
        width: 200,
        height: 200,
        alt: "Trust Track Travels logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Trust Track Travels | Saudi Arabia Transfers & Ziyarat",
    description: siteDescription,
    images: ["/logo.svg"],
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
  logo: new URL("/logo.svg", siteUrl).href,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
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
