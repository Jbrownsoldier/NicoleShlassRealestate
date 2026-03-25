import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import { StaggerChildren, StaggerItem } from "@/components/ui/RevealOnScroll";

// Social Links data
const socialLinks = [
  {
    href: "https://www.instagram.com/nicoleshlass_realestate",
    label: "Instagram",
    icon: <Instagram size={18} />,
  },
  {
    href: "https://www.facebook.com/profile.php?id=61563966463865",
    label: "Facebook",
    icon: <Facebook size={18} />,
  },
  {
    href: "https://www.linkedin.com/in/nicoleshlass/",
    label: "LinkedIn",
    icon: <Linkedin size={18} />,
  },
  {
    href: "https://www.tiktok.com/@nicoletorontorealtor",
    label: "TikTok",
    icon: <img src="https://cdn.simpleicons.org/tiktok/CECDD5" alt="TikTok" className="w-[18px] h-[18px] opacity-70 group-hover:opacity-100 transition-opacity" />,
  },
  {
    href: "https://api.whatsapp.com/send?phone=4162716316",
    label: "WhatsApp",
    icon: <img src="https://cdn.simpleicons.org/whatsapp/CECDD5" alt="WhatsApp" className="w-[18px] h-[18px] opacity-70 group-hover:opacity-100 transition-opacity" />,
  },
];

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
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <StaggerItem className="lg:col-span-1">
            <div className="mb-5">
              <p className="font-serif text-xl font-semibold text-on-surface">Nicole Shlass</p>
              <p className="text-label-sm text-outline tracking-widest mt-0.5">REAL ESTATE</p>
            </div>
            <p className="text-body-md text-on-surface-variant leading-relaxed max-w-xs">
              Residential real estate for first-time buyers, upsizers, and families across Toronto and the GTA.
            </p>
            <div className="flex flex-wrap gap-3.5 mt-8">
              {socialLinks.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-on-surface-variant hover:text-secondary hover:border-secondary/40 transition-all hover:scale-110 duration-300 group"
                >
                  {icon}
                </a>
              ))}
            </div>
          </StaggerItem>

          {/* Services */}
          <StaggerItem>
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
          </StaggerItem>

          {/* Company */}
          <StaggerItem>
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
          </StaggerItem>

          {/* Contact */}
          <StaggerItem>
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
          </StaggerItem>
        </StaggerChildren>

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
