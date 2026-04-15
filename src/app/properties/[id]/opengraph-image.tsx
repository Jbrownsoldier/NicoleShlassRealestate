import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { properties } from "@/data/properties";

export const alt = "Property listing by Nicole Shlass";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);

  let logoSrc = "";
  try {
    const logoData = await readFile(join(process.cwd(), "public/nsre-logo-transparent.png"), "base64");
    logoSrc = `data:image/png;base64,${logoData}`;
  } catch (e) {
    console.error(e);
  }

  if (!property) {
    return new ImageResponse(
      <div style={{ width: "100%", height: "100%", background: "#0E1121", display: "flex" }} />,
      { ...size }
    );
  }

  const formattedPrice = property.priceLabel;
  const bedsLabel = property.bedsLabel ?? `${property.beds}`;
  const statusLabel =
    property.type === "sold" ? "Sold" : property.type === "lease" ? "For Lease" : "For Sale";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(135deg, #0E1121 0%, #161B33 40%, #121628 70%, #0E1121 100%)",
          overflow: "hidden",
        }}
      >
        {/* Subtle gold accent top-left */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(224,173,164,0.08) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Subtle accent bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -80,
            width: 350,
            height: 350,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(224,173,164,0.06) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top-right: logo watermark */}
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 48,
            display: "flex",
            alignItems: "center",
          }}
        >
          {logoSrc ? (
            <img src={logoSrc} width={130} style={{ objectFit: 'contain' }} />
          ) : (
            <div style={{ color: "rgba(224,173,164,0.8)", fontSize: 13, letterSpacing: "0.2em", fontWeight: 600, display: "flex" }}>
              NICOLE SHLASS
            </div>
          )}
        </div>

        {/* Bottom content */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "0 64px 52px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {/* Neighborhood · City */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 24, height: 1.5, background: "#E0ADA4", display: "flex" }} />
            <div style={{ color: "#E0ADA4", fontSize: 14, letterSpacing: "0.18em", fontWeight: 600, display: "flex" }}>
              {property.neighborhood.toUpperCase()} · {property.city.toUpperCase()}
            </div>
          </div>

          {/* Property title */}
          <div
            style={{
              color: "#F6EBEA",
              fontSize: 52,
              fontWeight: 600,
              lineHeight: 1.1,
              display: "flex",
            }}
          >
            {property.title}
          </div>

          {/* Address */}
          <div style={{ color: "rgba(246,235,234,0.6)", fontSize: 20, display: "flex" }}>
            {property.address}
          </div>

          {/* Chips row: price, beds, baths, status */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
            {/* Price chip */}
            <div
              style={{
                background: "rgba(224,173,164,0.15)",
                border: "1px solid rgba(224,173,164,0.35)",
                borderRadius: 99,
                padding: "8px 20px",
                color: "#E0ADA4",
                fontSize: 18,
                fontWeight: 700,
                display: "flex",
              }}
            >
              {formattedPrice}
            </div>

            {/* Beds */}
            <div
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 99,
                padding: "8px 20px",
                color: "rgba(246,235,234,0.8)",
                fontSize: 16,
                display: "flex",
              }}
            >
              {bedsLabel} Beds
            </div>

            {/* Baths */}
            <div
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 99,
                padding: "8px 20px",
                color: "rgba(246,235,234,0.8)",
                fontSize: 16,
                display: "flex",
              }}
            >
              {property.baths} Baths
            </div>

            {/* Status badge */}
            <div
              style={{
                background: property.type === "sold" ? "rgba(180,100,100,0.2)" : "rgba(100,180,100,0.15)",
                border: `1px solid ${property.type === "sold" ? "rgba(180,100,100,0.4)" : "rgba(100,180,100,0.35)"}`,
                borderRadius: 99,
                padding: "8px 20px",
                color: property.type === "sold" ? "rgba(220,150,150,0.9)" : "rgba(150,210,150,0.9)",
                fontSize: 16,
                fontWeight: 600,
                display: "flex",
              }}
            >
              {statusLabel}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
