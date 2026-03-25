"use client";

import { useEffect } from "react";
import { motion, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";

export function Spotlight({ className = "", color = "rgba(193, 197, 229, 0.12)" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 25 };
  const sX = useSpring(mouseX, springConfig);
  const sY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const background = useMotionTemplate`radial-gradient(800px circle at ${sX}px ${sY}px, ${color}, transparent 80%)`;

  return (
    <motion.div
      className={`pointer-events-none fixed inset-0 z-30 opacity-100 ${className}`}
      style={{ background }}
    />
  );
}
