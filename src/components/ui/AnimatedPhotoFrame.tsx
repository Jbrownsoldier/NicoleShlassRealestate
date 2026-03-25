"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface AnimatedPhotoFrameProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}

export function AnimatedPhotoFrame({
  src,
  alt,
  sizes,
  className,
}: AnimatedPhotoFrameProps) {
  return (
    <motion.div
      className={className ?? "relative aspect-[3/4] rounded-2xl overflow-hidden shadow-ambient"}
      initial={{ scale: 0.97, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes={sizes}
        className="object-cover object-top"
      />
    </motion.div>
  );
}
