"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedStatProps {
  value: string;
  suffix?: string;
  className?: string;
}

export function AnimatedStat({ value, suffix: propSuffix, className }: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(value + (propSuffix || ""));

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric portion from value
    const match = value.match(/^(\D*)(\d+)(\D*)$/);
    if (!match) return;

    const [, prefix, numStr, valSuffix] = match;
    const target = parseInt(numStr, 10);
    const finalSuffix = valSuffix + (propSuffix || "");

    const duration = 1600;
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic for smoother finish
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplayed(`${prefix}${current}${finalSuffix}`);
      if (progress < 1) requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }, [isInView, value, propSuffix]);

  return (
    <span ref={ref} className={className}>
      {displayed}
    </span>
  );
}
