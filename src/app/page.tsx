import Link from "next/link";
import { ArrowRight, Award, TrendingUp, Users, Star } from "lucide-react";
import Image from "next/image";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { featuredProperties } from "@/data/properties";
import { HeroSection } from "@/components/sections/HeroSection";
import { RevealOnScroll, StaggerChildren, StaggerItem } from "@/components/ui/RevealOnScroll";
import { AnimatedStat } from "@/components/ui/AnimatedStat";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nicole Shlass — Real Estate Toronto",
  description:
    "Toronto real estate agent helping first-time buyers, upsizers, and families find homes that fit their life. Buying, selling, and leasing across Toronto and the GTA.",
};

const stats = [
  { icon: Award,      value: "14",   suffix: " Yrs", label: "Of Experience" },
  { icon: Users,      value: "400+",                 label: "Clients Served" },
  { icon: TrendingUp, value: "416",                  label: "Area Specialist" },
  { icon: Star,       value: "100%",                 label: "Client Satisfaction" },
];

export default function HomePage() {
  return (
    <>
      {/* ─── Hero (client — parallax) ────────────────────────────────────────── */}
      <HeroSection />

      {/* ─── Stats Bar ─────────────────────────────────────────────────────── */}
      <section className="bg-primary-container border-y border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <StaggerItem
                key={label}
                className={`flex items-center gap-4 py-4 px-6 ${
                  i < 3 ? "lg:border-r lg:border-outline-variant/20" : ""
                } ${i < 2 ? "border-b lg:border-b-0 border-outline-variant/20" : ""}`}
              >
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-gold" />
                </div>
                <div>
                  <AnimatedStat
                    value={value}
                    className="font-serif text-headline-lg text-gold font-semibold"
                  />
                  <p className="text-label-md text-outline">{label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── Featured Properties ─────────────────────────────────────────────── */}
      <section className="py-36 bg-surface grain-overlay">
        <div className="max-w-7xl mx-auto px-6">
          <RevealOnScroll className="flex items-end justify-between mb-14">
            <div>
              <p className="text-label-lg text-gold mb-3">EXCLUSIVE LISTINGS</p>
              <h2 className="font-serif text-display-md text-on-surface font-semibold">
                Featured Properties
              </h2>
            </div>
            <Link
              href="/properties"
              className="hidden md:inline-flex items-center gap-2 text-label-md text-on-surface-variant hover:text-on-surface transition-colors group"
            >
              All Properties
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </RevealOnScroll>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <StaggerItem key={property.id}>
                <PropertyCard property={property} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── Services ───────────────────────────────────────────────────────── */}
      <section className="py-36 bg-surface-c-low">
        <div className="max-w-7xl mx-auto px-6">
          <RevealOnScroll className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-label-lg text-gold mb-3">FULL-SPECTRUM EXPERTISE</p>
            <h2 className="font-serif text-display-md text-on-surface font-semibold">
              How Nicole Can Help
            </h2>
          </RevealOnScroll>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                href: "/buying",
                label: "Buying",
                icon: "🏡",
                desc: "Access off-market inventory and strategic negotiation to secure your ideal property at the right price.",
              },
              {
                href: "/selling",
                label: "Selling",
                icon: "🏛",
                desc: "Commanding marketing, precise pricing, and an elite buyer network to close above asking — consistently.",
              },
              {
                href: "/leasing",
                label: "Leasing",
                icon: "🗝",
                desc: "Lease representation for both tenants and landlords across Toronto's best neighbourhoods.",
              },
            ].map(({ href, label, icon, desc }) => (
              <StaggerItem key={href}>
                <Link
                  href={href}
                  className="group glass-card rounded-2xl pt-12 pb-10 px-8 flex flex-col items-center text-center gap-5 hover:bg-surface-c-highest/80 transition-all duration-300 hover:-translate-y-1 shadow-card h-full"
                >
                  <span className="text-6xl block">{icon}</span>
                  <div>
                    <h3 className="font-serif text-headline-sm text-on-surface font-semibold mb-3 group-hover:text-primary transition-colors">
                      {label}
                    </h3>
                    <p className="text-body-md text-on-surface-variant leading-relaxed">{desc}</p>
                  </div>
                  <span className="mt-auto text-label-md text-secondary flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Learn More <ArrowRight size={13} />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── About Nicole ─────────────────────────────────────────────────── */}
      <section className="py-36 bg-surface grain-overlay">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Photo */}
            <RevealOnScroll>
              <div className="relative p-4 rounded-2xl border border-secondary/15 shadow-ambient">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80&auto=format"
                    alt="Nicole Shlass, Toronto Real Estate Agent"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute bottom-6 left-6">
                    <div className="glass rounded-xl px-5 py-4">
                      <p className="font-serif text-title-lg text-on-surface font-semibold">Nicole Shlass</p>
                      <p className="text-label-md text-outline mt-0.5">Sales Representative</p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Text — slide in from left */}
            <RevealOnScroll direction="left">
              <div className="flex flex-col gap-6">
                <p className="text-label-lg text-gold">THE AGENT BEHIND THE BRAND</p>
                <h2 className="font-serif text-display-md text-on-surface font-semibold">
                  Precision.<br />Discretion.<br />Results.
                </h2>
                <p className="text-body-lg text-on-surface-variant leading-relaxed">
                  Since 2011, Nicole Shlass has been helping Toronto buyers, sellers, and
                  families navigate one of Canada&apos;s most dynamic real estate markets.
                  She&apos;s known for her honesty, her responsiveness, and her ability to
                  truly listen to what clients need.
                </p>
                <p className="text-body-lg text-on-surface-variant leading-relaxed">
                  Whether you&apos;re a first-time buyer, a growing family looking to upsize,
                  or someone ready for the next chapter — Nicole brings transparency,
                  dependability, and a personalized approach to every transaction.
                </p>
                <Link
                  href="/about"
                  className="self-start inline-flex items-center gap-2 text-label-lg text-secondary hover:text-on-surface transition-colors group mt-2"
                >
                  Read Nicole&apos;s Story
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=2000&q=80&auto=format"
          alt="Luxury property"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(12,10,15,0.75)" }} />
        <div className="absolute inset-0 gradient-overlay-full" />

        <RevealOnScroll className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-label-lg text-secondary mb-5">BEGIN YOUR SEARCH</p>
          <h2 className="font-serif text-display-md text-on-surface font-semibold mb-6">
            Ready to Find Your Next Home?
          </h2>
          <p className="text-body-lg text-on-surface-variant mb-10 max-w-xl mx-auto leading-relaxed">
            Let Nicole&apos;s concierge team handle every detail — from first showing to closing day.
            Private, discreet, and entirely tailored to you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/concierge"
              className="gradient-cta text-on-secondary font-semibold text-label-lg px-9 py-4 rounded-full inline-flex items-center gap-2 hover:opacity-90 transition-opacity shadow-ambient"
            >
              Request Private Consultation <ArrowRight size={16} />
            </Link>
            <Link
              href="/properties"
              className="glass text-on-surface font-medium text-label-md px-8 py-4 rounded-full inline-flex items-center gap-2 hover:bg-surface-c/80 transition-all"
            >
              Browse Properties
            </Link>
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
