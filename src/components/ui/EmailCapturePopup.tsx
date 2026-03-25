"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, TrendingUp, Bell } from "lucide-react";

const STORAGE_KEY = "ns_popup_dismissed_at";
const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function shouldShow(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;
    return Date.now() - Number(raw) >= TTL_MS;
  } catch {
    return true;
  }
}

function markDismissed() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {}
}

export function EmailCapturePopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Delay appearance by 2 s so the page has time to settle
  useEffect(() => {
    const t = setTimeout(() => {
      if (shouldShow()) setVisible(true);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    markDismissed();
    setVisible(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address.");
      return;
    }
    // TODO: wire to your email provider / CRM
    console.log("Email captured:", email);
    setSubmitted(true);
    markDismissed();
    setTimeout(() => setVisible(false), 3000);
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9000] bg-black/60 backdrop-blur-sm"
            onClick={dismiss}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Stay informed about Toronto real estate"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed inset-0 z-[9001] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-md pointer-events-auto glass-deep shadow-ambient rounded-2xl overflow-hidden">

              {/* Gold top bar */}
              <div
                className="h-[2px] w-full"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #C9A96E 25%, #F0B9B3 65%, transparent)",
                }}
              />

              {/* Dismiss button */}
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="px-8 pb-8 pt-6">
                {!submitted ? (
                  <>
                    {/* Header */}
                    <p className="text-label-md text-[#C9A96E] mb-3 tracking-widest">
                      Toronto Real Estate
                    </p>
                    <h2 className="font-serif text-headline-md text-on-surface leading-snug mb-3">
                      The best homes sell
                      <br />
                      <span className="text-gradient-gold">before they're listed.</span>
                    </h2>
                    <p className="text-body-md text-on-surface-variant mb-6">
                      Join Nicole's inner circle and get exclusive early access to
                      off-market listings, neighbourhood market reports, and curated
                      buying guides — straight to your inbox.
                    </p>

                    {/* Perks */}
                    <ul className="space-y-2 mb-7">
                      {[
                        { icon: Bell,       text: "Off-market alerts before they hit MLS" },
                        { icon: TrendingUp, text: "Monthly GTA market intelligence" },
                        { icon: MapPin,     text: "Hyper-local neighbourhood snapshots" },
                      ].map(({ icon: Icon, text }) => (
                        <li key={text} className="flex items-center gap-3 text-sm text-on-surface-variant">
                          <Icon size={14} className="text-[#C9A96E] shrink-0" />
                          {text}
                        </li>
                      ))}
                    </ul>

                    {/* Form */}
                    <form onSubmit={handleSubmit} noValidate>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setError(""); }}
                          placeholder="your@email.com"
                          className="
                            flex-1 bg-surface-c-low border border-outline-variant rounded-lg
                            px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50
                            focus:outline-none focus:border-[#C9A96E] transition-colors
                          "
                          required
                          aria-label="Email address"
                        />
                        <button
                          type="submit"
                          className="
                            shimmer gradient-cta text-on-secondary font-semibold text-sm
                            px-5 py-2.5 rounded-lg whitespace-nowrap
                            hover:opacity-90 active:scale-95 transition-all
                          "
                        >
                          Get Access
                        </button>
                      </div>
                      {error && (
                        <p className="mt-2 text-xs text-error">{error}</p>
                      )}
                    </form>

                    {/* Skip */}
                    <button
                      onClick={dismiss}
                      className="mt-4 w-full text-center text-xs text-on-surface-variant/50 hover:text-on-surface-variant transition-colors"
                    >
                      No thanks, I'll find my home the slow way
                    </button>
                  </>
                ) : (
                  /* Success state */
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-4"
                  >
                    <div
                      className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.3)" }}
                    >
                      <span className="text-[#C9A96E] text-xl">✓</span>
                    </div>
                    <h3 className="font-serif text-headline-sm text-on-surface mb-2">
                      You're in the loop.
                    </h3>
                    <p className="text-sm text-on-surface-variant">
                      Expect your first market insight from Nicole shortly.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
