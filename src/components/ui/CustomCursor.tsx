"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const [hoverType, setHoverType] = useState<"link" | "view" | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for raw mouse pos
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for trailing effect
  const springConfig = { stiffness: 800, damping: 28 };
  const springConfigRing = { stiffness: 150, damping: 20 };

  const dotX = useSpring(mouseX, springConfig);
  const dotY = useSpring(mouseY, springConfig);

  const ringX = useSpring(mouseX, springConfigRing);
  const ringY = useSpring(mouseY, springConfigRing);

  useEffect(() => {
    // Hide cursor on touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      return;
    }

    setIsVisible(true);
    document.documentElement.classList.add("cursor-none-all");

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check hover targets
      const target = e.target as HTMLElement;
      if (!target) return;

      const isLink = target.closest("a, button, [data-cursor='link']");
      const isView = target.closest("[data-cursor='view'], .property-card, .service-card");

      if (isLink) {
        setHoverType("link");
        setActive(true);
      } else if (isView) {
        setHoverType("view");
        setActive(true);
      } else {
        setHoverType(null);
        setActive(false);
      }
    };

    const handleMouseDown = () => setActive(true);
    const handleMouseUp = () => setActive(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.classList.remove("cursor-none-all");
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 border-1.5 border-secondary rounded-full flex items-center justify-center pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hoverType === "view" ? 2.2 : hoverType === "link" ? 1.6 : active ? 0.8 : 1,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      >
        <AnimatePresence>
          {hoverType === "view" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[8px] font-bold text-secondary tracking-widest uppercase"
            >
              View
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-secondary rounded-full pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hoverType ? 0 : 1,
          opacity: 1,
        }}
      />
    </div>
  );
}
