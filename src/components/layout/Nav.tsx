"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/properties", label: "Properties" },
  { href: "/buying",     label: "Buying" },
  { href: "/selling",    label: "Selling" },
  { href: "/leasing",    label: "Leasing" },
  { href: "/about",      label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-deep py-3 shadow-ambient border-b border-secondary/20"
            : "bg-transparent py-5",
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Wordmark */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-serif text-on-surface text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
              Nicole Shlass
            </span>
            <span className="text-label-sm text-outline tracking-widest">
              REAL ESTATE
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map(({ href, label }) => {
              const active = pathname.startsWith(href);
              return (
                <li key={href} className="relative flex flex-col items-center pb-1">
                  <Link
                    href={href}
                    className={cn(
                      "text-label-md transition-colors duration-200",
                      active
                        ? "text-on-surface"
                        : "text-on-surface-variant hover:text-on-surface",
                    )}
                  >
                    {label}
                  </Link>
                  {active && (
                    <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-secondary" />
                  )}
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/concierge"
              className="gradient-cta text-on-secondary text-label-md font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_20px_-4px_rgba(240,185,179,0.5)]"
            >
              Concierge
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden p-2 text-on-surface-variant hover:text-on-surface transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <div
          className="absolute inset-0 bg-surface/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-72 glass-deep flex flex-col pt-24 px-8 pb-10 gap-2 transition-transform duration-300",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          {links.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "py-3 text-title-md border-b border-outline-variant/15 transition-colors",
                  active ? "text-secondary" : "text-on-surface-variant hover:text-on-surface",
                )}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/concierge"
            className="mt-6 gradient-cta text-on-secondary text-label-md font-semibold px-6 py-3.5 rounded-full text-center"
          >
            Concierge
          </Link>
        </div>
      </div>
    </>
  );
}
