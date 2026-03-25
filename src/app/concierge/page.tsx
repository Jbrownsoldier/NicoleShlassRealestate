"use client";

import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/ui/ContactForm";
import { RevealOnScroll, StaggerChildren, StaggerItem } from "@/components/ui/RevealOnScroll";
import { Spotlight } from "@/components/ui/Spotlight";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function ConciergePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden min-h-[60vh] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=2000&q=80&auto=format"
          alt="Concierge consultation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-surface/85" />
        <Spotlight />
        <div className="absolute inset-0 gradient-overlay-bottom" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-label-lg text-secondary mb-4 tracking-widest">PRIVATE CONCIERGE</p>
            <h1 className="font-serif text-display-md text-on-surface font-semibold mb-6">
              Let&apos;s Start Your<br />Toronto Story
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              Every masterwork begins with a single line. Reach out — Nicole and her team 
              respond with the personalized attention your journey deserves.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

            {/* Form */}
            <RevealOnScroll>
              <h2 className="font-serif text-headline-lg text-on-surface font-semibold mb-8">
                Request a Consultation
              </h2>
              <ContactForm />
            </RevealOnScroll>

            {/* Contact info */}
            <div className="flex flex-col gap-12">
              <div>
                <RevealOnScroll>
                  <h2 className="font-serif text-headline-lg text-on-surface font-semibold mb-8">
                    Direct Access
                  </h2>
                </RevealOnScroll>
                <StaggerChildren className="space-y-8">
                  <StaggerItem>
                    <a href="tel:+14162716316" className="flex items-start gap-6 group">
                      <MagneticButton strength={20}>
                        <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 group-hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                          <Phone size={22} className="text-secondary" />
                        </div>
                      </MagneticButton>
                      <div>
                        <p className="text-label-md text-outline mb-1">Direct Dial</p>
                        <p className="text-title-lg text-on-surface group-hover:text-secondary transition-colors">416-271-6316</p>
                      </div>
                    </a>
                  </StaggerItem>
                  <StaggerItem>
                    <a href="mailto:nicole@nicoleshlassrealestate.ca" className="flex items-start gap-6 group">
                      <MagneticButton strength={20}>
                        <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 group-hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                          <Mail size={22} className="text-secondary" />
                        </div>
                      </MagneticButton>
                      <div>
                        <p className="text-label-md text-outline mb-1">Email Inquiry</p>
                        <p className="text-title-lg text-on-surface group-hover:text-secondary transition-colors">nicole@nicoleshlassrealestate.ca</p>
                      </div>
                    </a>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex items-start gap-5 group">
                      <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-all duration-300">
                        <MapPin size={20} className="text-secondary" />
                      </div>
                      <div>
                        <p className="text-label-md text-outline mb-1">Our Atelier</p>
                        <p className="text-title-lg text-on-surface">235 Clinton St</p>
                        <p className="text-body-md text-on-surface-variant">Toronto, ON M6G 2Y5</p>
                      </div>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex items-start gap-5 group">
                      <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-all duration-300">
                        <Clock size={20} className="text-secondary" />
                      </div>
                      <div>
                        <p className="text-label-md text-outline mb-1">Availability</p>
                        <p className="text-title-lg text-on-surface">Mon – Sat, 9am – 6pm ET</p>
                        <p className="text-body-md text-on-surface-variant">Urgent inquiries accommodated 7 days</p>
                      </div>
                    </div>
                  </StaggerItem>
                </StaggerChildren>
              </div>

              {/* Promise card */}
              <RevealOnScroll delay={0.2}>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="glass-card rounded-2xl p-10 shadow-ambient border border-outline-variant/10 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-secondary/10 transition-colors" />
                  <p className="text-label-lg text-secondary mb-4 tracking-widest uppercase">THE NICOLE PROMISE</p>
                  <p className="font-serif text-headline-sm text-on-surface font-semibold mb-4 leading-snug">
                    Discretion is a given. Results are the standard.
                  </p>
                  <p className="text-body-lg text-on-surface-variant leading-relaxed">
                    Every inquiry is handled personally and confidentially. You will hear from Nicole
                    directly — providing the boutique level of service that defines her practice.
                  </p>
                </motion.div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
