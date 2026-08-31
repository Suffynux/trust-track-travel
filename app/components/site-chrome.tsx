import Image from "next/image";
import Link from "next/link";
import { CurrencySelect, WhatsAppButton } from "./journey";
import { MobileNav } from "./mobile-nav";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export const navLinks = [
  { href: "/fleet", label: "Fleet" },
  { href: "/ziyarat", label: "Ziyarat" },
  { href: "/#hotels", label: "Hotels" },
  { href: "/fares", label: "Fares" },
] as const;

const mobileItems = [
  { href: "/", label: "Home", note: "Fare ledger" },
  { href: "/fleet", label: "Fleet", note: "Four tiers" },
  { href: "/ziyarat", label: "Ziyarat", note: "Two routes" },
  { href: "/#hotels", label: "Hotels", note: "Makkah & Madinah" },
  { href: "/fares", label: "Fares", note: "Full tariff" },
  ...routes.map((r) => ({
    href: `/routes/${r.slug}`,
    label: r.title,
    note: r.duration,
  })),
  { href: "/#contact", label: "Contact", note: "WhatsApp" },
];

export function Masthead() {
  return (
    <header className="masthead on-field">
      <div className="shell masthead-inner">
        <Link className="masthead-mark" href="/" aria-label={`${site.name}, home`}>
          <Image
            src="/logo.png"
            alt={site.name}
            width={592}
            height={247}
            priority
          />
        </Link>
        <nav className="masthead-nav" aria-label="Main">
          {navLinks.map((l) => (
            <Link key={l.href} className="masthead-link" href={l.href}>
              {l.label}
            </Link>
          ))}
          <Link className="masthead-link" href="/#contact">
            Contact
          </Link>
        </nav>
        <MobileNav items={mobileItems} />
        <WhatsAppButton size="sm">WhatsApp us</WhatsAppButton>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer on-field">
      <div className="shell">
        <div className="footer-grid">
          <div>
            <Image
              className="footer-mark"
              src="/logo.png"
              alt={site.name}
              width={592}
              height={247}
            />
            <p className="prose footer-blurb">
              Ground transport and Ziyarat touring for pilgrims travelling to
              Makkah and Madinah from the UK, the US and Pakistan. Fixed fares,
              per vehicle, every leg.
            </p>
          </div>
          <div>
            <p className="eyebrow footer-head">Pages</p>
            <ul className="footer-list">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/#contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow footer-head">Routes</p>
            <ul className="footer-list">
              {routes.map((r) => (
                <li key={r.slug}>
                  <Link href={`/routes/${r.slug}`}>{r.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow footer-head">Reach us</p>
            <ul className="footer-list">
              <li>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <span>{site.cities}</span>
              </li>
            </ul>
            <CurrencySelect className="footer-currency-select" />
          </div>
        </div>
        <div className="footer-base">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>TGA &amp; Nusuk-registered ground transport</span>
        </div>
      </div>
    </footer>
  );
}
