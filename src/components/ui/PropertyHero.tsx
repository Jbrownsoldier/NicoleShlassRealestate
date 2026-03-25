"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";

interface PropertyHeroProps {
  image: string;
  video?: string;
  title: string;
  tag?: string;
  type: string;
}

export function PropertyHero({ image, video, title, tag, type }: PropertyHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-surface-c" style={{ aspectRatio: "16/9" }}>
      {/* Always mount the still image as a fallback beneath */}
      {!video && (
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
        />
      )}

      {/* Video hero — autoplays, muted, looping */}
      {video && (
        <>
          <Image
            src={image}
            alt={title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
            style={{ opacity: 0 }}
          />
          <video
            ref={videoRef}
            src={video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </>
      )}

      {/* Subtle bottom vignette */}
      {video && (
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      )}

      {tag && (
        <span className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-label-sm font-semibold backdrop-blur-sm bg-surface-c/80 text-on-surface ghost-border z-10">
          {tag}
        </span>
      )}
      {type === "sold" && (
        <span className="absolute top-5 right-5 px-3 py-1.5 rounded-full text-label-sm font-semibold backdrop-blur-sm bg-tertiary/20 text-tertiary border border-tertiary/30 z-10">
          Sold
        </span>
      )}
    </div>
  );
}
