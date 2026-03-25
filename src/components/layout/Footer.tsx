import Link from "next/link";
import { Phone, Mail, MapPin, Share2, ExternalLink } from "lucide-react";

const services = [
  { href: "/buying",     label: "Buyer Representation" },
  { href: "/selling",    label: "Seller Representation" },
  { href: "/leasing",    label: "Leasing" },
  { href: "/concierge",  label: "Concierge Services" },
  { href: "/properties", label: "Property Search" },
];

const company = [
  { href: "/about",      label: "About Nicole" },
  { href: "/properties", label: "Listings" },
  { href: "/concierge",  label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-surface-c-lowest">
      {/* Gradient top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-secondary/35 to-transparent" />
      <div className="border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <p className="font-serif text-xl font-semibold text-on-surface">Nicole Shlass</p>
              <p className="text-label-sm text-outline tracking-widest mt-0.5">REAL ESTATE</p>
            </div>
            <p className="text-body-md text-on-surface-variant leading-relaxed max-w-xs">
              Residential real estate for first-time buyers, upsizers, and families across Toronto and the GTA.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/nicoleshlass_realestate"
                target="_blank" rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-on-surface-variant hover:text-secondary transition-colors"
              >
                <Share2 size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/nicoleshlass"
                target="_blank" rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-on-surface-variant hover:text-secondary transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-label-lg text-outline mb-5">Services</h4>
            <ul className="space-y-3">
              {services.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-label-lg text-outline mb-5">Company</h4>
            <ul className="space-y-3">
              {company.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-label-lg text-outline mb-5">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+14162716316" className="flex items-start gap-3 text-body-md text-on-surface-variant hover:text-on-surface transition-colors group">
                  <Phone size={15} className="mt-0.5 text-outline group-hover:text-secondary transition-colors shrink-0" />
                  416-271-6316
                </a>
              </li>
              <li>
                <a href="mailto:nicole@nicoleshlassrealestate.ca" className="flex items-start gap-3 text-body-md text-on-surface-variant hover:text-on-surface transition-colors group">
                  <Mail size={15} className="mt-0.5 text-outline group-hover:text-secondary transition-colors shrink-0" />
                  nicole@nicoleshlassrealestate.ca
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-body-md text-on-surface-variant">
                  <MapPin size={15} className="mt-0.5 text-outline shrink-0" />
                  235 Clinton St<br />Toronto, ON M6G 2Y5
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-outline-variant/15 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-label-sm text-outline">
            © {new Date().getFullYear()} Nicole Shlass Real Estate. All rights reserved.
          </p>
          <p className="text-label-sm text-outline/60">
            The Boulevard powered by Property.ca · Equal Housing Opportunity
          </p>
        </div>
      </div>
      </div>
    </footer>
  );
}
