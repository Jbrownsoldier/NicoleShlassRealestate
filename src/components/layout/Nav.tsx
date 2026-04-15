"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

const PHONE_DISPLAY = "416-271-6316";
const PHONE_HREF    = "tel:4162716316";

// ── NavLink — distinctive mixed-case nav item with animated underline ──────────

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link relative flex flex-col items-center px-3.5 py-2 rounded-lg",
        "text-[0.95rem] font-medium tracking-[0.015em]",
        "transition-colors duration-200",
        active
          ? "text-on-surface"
          : "text-on-surface-variant/70 hover:text-on-surface",
      )}
    >
      {children}

      {/* Hover underline — sweeps from left */}
      <span
        className={cn(
          "absolute inset-x-3 -bottom-px h-px rounded-full origin-left",
          "transition-transform duration-300 ease-out",
          active
            ? "scale-x-0"                          // active uses the layoutId pill instead
            : "scale-x-0 group-hover/link:scale-x-100",
        )}
        style={{ background: "rgba(240,185,179,0.45)" }}
      />

      {/* Active indicator — gold → secondary gradient */}
      {active && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-x-3 -bottom-px h-[1.5px] rounded-full"
          style={{
            background: "linear-gradient(to right, var(--color-gold), var(--color-secondary))",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}
    </Link>
  );
}

const links = [
  { href: "/properties", label: "Properties" },
  { href: "/buying",     label: "Buying"     },
  { href: "/selling",    label: "Selling"    },
  { href: "/leasing",    label: "Leasing"    },
  { href: "/about",      label: "About"      },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled]   = useState(false);
  const [hidden,   setHidden]     = useState(false);
  const [open,     setOpen]       = useState(false);
  const lastY = useRef(0);

  // Track scroll position + direction
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);

      if (y < 80) {
        setHidden(false);
      } else if (y > lastY.current + 6) {
        setHidden(true);  // scrolling down — hide
      } else if (y < lastY.current - 6) {
        setHidden(false); // scrolling up  — reveal
      }
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Main header ────────────────────────────────────────────────────────── */}
      <motion.header
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 will-change-transform",
          scrolled
            ? "glass-deep shadow-ambient border-b border-outline-variant/15 nav-accent-scrolled"
            : "bg-transparent",
        )}
      >
        <nav className={cn(
          "max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300",
          scrolled ? "py-3" : "py-5",
        )}>

          {/* ── Brand ── */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <Link href="/" className="flex items-center leading-none group shrink-0 hover:opacity-80 transition-opacity">
              <Image
                src="/nsre-logo-transparent.png"
                alt="Nicole Shlass Real Estate"
                width={240}
                height={90}
                className="object-contain w-auto h-16 md:h-20"
                priority
              />
            </Link>
          </motion.div>

          {/* ── Desktop nav links ── */}
          <ul className="hidden md:flex items-center gap-0.5">
            {links.map(({ href, label }, i) => {
              const active = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.055, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <NavLink href={href} active={active}>
                    {label}
                  </NavLink>
                </motion.li>
              );
            })}
          </ul>

          {/* ── Desktop right cluster ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.38 }}
            className="hidden md:flex items-center gap-4"
          >
            {/* Phone — subtle, shows on scroll */}
            <AnimatePresence>
              {scrolled && (
                <motion.a
                  href={PHONE_HREF}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-1.5 text-outline hover:text-on-surface-variant transition-colors text-[0.72rem] tracking-wide font-medium"
                >
                  <Phone size={11} strokeWidth={2.2} />
                  {PHONE_DISPLAY}
                </motion.a>
              )}
            </AnimatePresence>

            {/* Concierge CTA */}
            <Link
              href="/concierge"
              className="shimmer gradient-cta text-on-secondary text-label-md font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_24px_-4px_rgba(240,185,179,0.55)]"
            >
              Concierge
            </Link>
          </motion.div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-white/[0.06] transition-all"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -45, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      {/* ── Mobile drawer ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 md:hidden bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 z-50 h-full w-[min(320px,85vw)] md:hidden glass-deep flex flex-col"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-outline-variant/12">
                <Link href="/" onClick={() => setOpen(false)} className="flex items-center group hover:opacity-80 transition-opacity">
                  <Image
                    src="/nsre-logo-transparent.png"
                    alt="Nicole Shlass Real Estate"
                    width={200}
                    height={75}
                    className="object-contain w-auto h-14"
                  />
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-white/[0.06] transition-all"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 flex flex-col px-4 py-4 gap-1 overflow-y-auto">
                {links.map(({ href, label }, i) => {
                  const active = pathname === href || (href !== "/" && pathname.startsWith(href));
                  return (
                    <motion.div
                      key={href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + i * 0.04, ease: "easeOut" }}
                    >
                      <Link
                        href={href}
                        className={cn(
                          "flex items-center justify-between px-4 py-3.5 rounded-xl text-title-md transition-all duration-200",
                          active
                            ? "bg-white/[0.06] text-on-surface"
                            : "text-on-surface-variant hover:bg-white/[0.04] hover:text-on-surface",
                        )}
                      >
                        {label}
                        {active && (
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: "linear-gradient(135deg, var(--color-gold), var(--color-secondary))" }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Bottom cluster */}
              <div className="px-5 pb-8 pt-4 border-t border-outline-variant/12 flex flex-col gap-3">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 }}
                >
                  <Link
                    href="/concierge"
                    className="shimmer gradient-cta text-on-secondary text-label-md font-semibold px-6 py-3.5 rounded-full text-center block hover:opacity-90 transition-opacity"
                  >
                    Book a Consultation
                  </Link>
                </motion.div>
                <motion.a
                  href={PHONE_HREF}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.34 }}
                  className="flex items-center justify-center gap-2 py-3 rounded-full border border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:border-outline-variant/40 transition-all text-label-md"
                >
                  <Phone size={13} strokeWidth={2} />
                  {PHONE_DISPLAY}
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
