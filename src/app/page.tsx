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
  title: "Nicole Shlass — Toronto Real Estate Agent",
  description:
    "Toronto real estate agent helping first-time buyers, upsizers, and families find homes that fit their life. Buying, selling, and leasing exclusively across Toronto.",
  alternates: { canonical: "https://nicoleshlass.ca" },
  openGraph: {
    title: "Nicole Shlass — Toronto Real Estate Agent",
    description:
      "Responsive, honest, and committed to finding you a home that truly fits your life. Browse exclusive listings across Toronto.",
    url: "https://nicoleshlass.ca",
  },
  twitter: {
    title: "Nicole Shlass — Toronto Real Estate Agent",
    description:
      "Responsive, honest, and committed to finding you a home that truly fits your life. Browse exclusive listings across Toronto.",
  },
};

const stats = [
  { icon: Award,      value: "14",   suffix: " Yrs", label: "Of Experience" },
  { icon: TrendingUp, value: "416",                  label: "Area Specialist" },
  { icon: Star,       value: "100%",                 label: "Client Satisfaction" },
];

export default function HomePage() {
  return (
    <>
      {/* Preload hero video so it's ready before the component hydrates */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <link rel="preload" as="video" href="/video/hero.mp4" type="video/mp4" />

      {/* ─── Hero (client — parallax) ────────────────────────────────────────── */}
      <HeroSection />

      {/* ─── Stats Bar ─────────────────────────────────────────────────────── */}
      <section className="bg-primary-container border-y border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <StaggerItem
                key={label}
                className={`flex items-center gap-4 py-4 px-6 md:justify-center ${
                  i < 2 ? "md:border-r md:border-outline-variant/20" : ""
                } ${i < 2 ? "border-b md:border-b-0 border-outline-variant/20" : ""}`}
              >
                <div className="relative w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full bg-gold/5 scale-[1.6] blur-sm pointer-events-none" />
                  <div className="absolute inset-0 rounded-full border border-gold/15 scale-[1.3] pointer-events-none" />
                  <Icon size={18} className="text-gold relative z-10" />
                </div>
                <div>
                  <AnimatedStat
                    value={value}
                    className="font-serif text-headline-lg text-gradient-gold font-semibold"
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
                numeral: "01",
                desc: "Access off-market inventory and strategic negotiation to secure your ideal property at the right price.",
              },
              {
                href: "/selling",
                label: "Selling",
                numeral: "02",
                desc: "Commanding marketing, precise pricing, and an elite buyer network to close above asking — consistently.",
              },
              {
                href: "/leasing",
                label: "Leasing",
                numeral: "03",
                desc: "Lease representation for both tenants and landlords across Toronto's best neighbourhoods.",
              },
            ].map(({ href, label, numeral, desc }) => (
              <StaggerItem key={href}>
                <Link
                  href={href}
                  className="group glass-card rounded-2xl pt-12 pb-10 px-8 flex flex-col items-center text-center gap-5 hover:bg-surface-c-highest/80 transition-all duration-300 hover:-translate-y-1 shadow-card h-full"
                >
                  <span className="font-serif text-[4rem] leading-none font-semibold text-gradient-gold opacity-50 group-hover:opacity-80 transition-opacity duration-300">{numeral}</span>
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
            {/* Photos */}
            <RevealOnScroll>
              <div className="relative w-full aspect-square lg:aspect-[4/5] min-h-[500px]">
                {/* Main Photo */}
                <div className="absolute top-0 left-0 w-[80%] h-[85%] p-3 rounded-2xl border border-secondary/15 shadow-ambient z-10 bg-surface">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src="/nicole1.jpg"
                      alt="Nicole Shlass, Toronto Real Estate Agent"
                      fill
                      priority
                      sizes="(max-width: 1024px) 80vw, 40vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                
                {/* Secondary Photo */}
                <div className="absolute bottom-0 right-0 w-[60%] h-[65%] p-3 rounded-2xl border border-secondary/15 shadow-2xl z-20 bg-surface">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src="/nicole-homepage.jpg"
                      alt="Nicole Shlass Real Estate"
                      fill
                      sizes="(max-width: 1024px) 60vw, 30vw"
                      className="object-cover object-center"
                    />
                    <div className="absolute bottom-4 left-4">
                      <div className="glass rounded-xl px-4 py-3 scale-90 origin-bottom-left">
                        <p className="font-serif text-title-md text-on-surface font-semibold">Nicole Shlass</p>
                        <p className="text-label-sm text-outline mt-0.5">Sales Representative</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Text — slide in from left */}
            <RevealOnScroll direction="left">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3 mb-1">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                    <rect x="4" y="0" width="5.66" height="5.66" rx="0.5" transform="rotate(45 4 0)" fill="var(--color-gold)" fillOpacity="0.6" />
                  </svg>
                  <p className="text-label-lg text-gold">THE AGENT BEHIND THE BRAND</p>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                    <rect x="4" y="0" width="5.66" height="5.66" rx="0.5" transform="rotate(45 4 0)" fill="var(--color-gold)" fillOpacity="0.6" />
                  </svg>
                </div>
                <h2 className="font-serif text-display-md text-on-surface font-semibold">
                  Precision.<br />Discretion.<br />Results.
                </h2>
                <p className="text-body-lg text-on-surface-variant leading-relaxed">
                  I&rsquo;m driven by curiosity and fueled by connection, and I approach every client 
                  relationship with intention. I listen deeply, think ahead, and stay fully committed 
                  to delivering outcomes that align with both your lifestyle and long-term vision.
                </p>
                <p className="text-body-lg text-on-surface-variant leading-relaxed">
                  I prioritize transparency, dependability, and a genuine commitment to setting you up for 
                  success — whether you&apos;re a first-time buyer or moving into the next chapter 
                  of your Toronto story.
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
