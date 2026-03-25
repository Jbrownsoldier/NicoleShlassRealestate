"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedStatProps {
  value: string;
  className?: string;
}

export function AnimatedStat({ value, className }: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(value);

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric portion, e.g. "400+" → prefix="", num=400, suffix="+"
    const match = value.match(/^(\D*)(\d+)(\D*)$/);
    if (!match) return; // non-numeric (e.g. "100%") — falls through and just shows value

    const [, prefix, numStr, suffix] = match;
    const target = parseInt(numStr, 10);

    const duration = 1400;
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplayed(`${prefix}${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }, [isInView, value]);

  return (
    <span ref={ref} className={className}>
      {displayed}
    </span>
  );
}
