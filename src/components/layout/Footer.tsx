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
    icon: <img src="https://cdn.simpleicons.org/tiktok/ffffff" alt="TikTok" className="w-[18px] h-[18px] opacity-60 group-hover:opacity-100 transition-opacity" />,
  },
  {
    href: "https://api.whatsapp.com/send?phone=4162716316",
    label: "WhatsApp",
    icon: <img src="https://cdn.simpleicons.org/whatsapp/ffffff" alt="WhatsApp" className="w-[18px] h-[18px] opacity-60 group-hover:opacity-100 transition-opacity" />,
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
    <footer style={{ backgroundColor: "#161b33" }}>
      {/* Mauve top accent line */}
      <div className="h-px" style={{ background: "linear-gradient(to right, transparent, #E0ADA4 30%, #E0ADA4 70%, transparent)" }} />
      <div className="max-w-7xl mx-auto px-6 py-20">
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <StaggerItem className="lg:col-span-1">
            <div className="mb-5">
              <p className="font-serif text-xl font-semibold text-white">Nicole Shlass</p>
              <p className="text-label-sm tracking-widest mt-0.5" style={{ color: "#E0ADA4" }}>REAL ESTATE</p>
            </div>
            <p className="text-body-md leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
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
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 duration-300 group"
                  style={{ border: "1px solid rgba(224,173,164,0.25)", color: "rgba(255,255,255,0.65)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(224,173,164,0.7)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(224,173,164,0.25)")}
                >
                  {icon}
                </a>
              ))}
            </div>
          </StaggerItem>

          {/* Services */}
          <StaggerItem>
            <h4 className="text-label-lg mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>Services</h4>
            <ul className="space-y-3">
              {services.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-body-md transition-colors"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Company */}
          <StaggerItem>
            <h4 className="text-label-lg mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>Company</h4>
            <ul className="space-y-3">
              {company.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-body-md transition-colors"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Contact */}
          <StaggerItem>
            <h4 className="text-label-lg mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+14162716316" className="flex items-start gap-3 text-body-md transition-colors group" style={{ color: "rgba(255,255,255,0.65)" }}>
                  <Phone size={15} className="mt-0.5 shrink-0 transition-colors" style={{ color: "#E0ADA4" }} />
                  416-271-6316
                </a>
              </li>
              <li>
                <a href="mailto:nicole@nicoleshlassrealestate.ca" className="flex items-start gap-3 text-body-md transition-colors group" style={{ color: "rgba(255,255,255,0.65)" }}>
                  <Mail size={15} className="mt-0.5 shrink-0" style={{ color: "#E0ADA4" }} />
                  nicole@nicoleshlassrealestate.ca
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-body-md" style={{ color: "rgba(255,255,255,0.65)" }}>
                  <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: "#E0ADA4" }} />
                  235 Clinton St<br />Toronto, ON M6G 2Y5
                </span>
              </li>
            </ul>
          </StaggerItem>
        </StaggerChildren>

        <div className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}>
          <p className="text-label-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
            © {new Date().getFullYear()} Nicole Shlass Real Estate. All rights reserved.
          </p>
          <p className="text-label-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
            The Boulevard powered by Property.ca · Equal Housing Opportunity
          </p>
        </div>
      </div>
    </footer>
  );
}
