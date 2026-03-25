import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Nicole Shlass — Toronto Real Estate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const nicoleData = await readFile(join(process.cwd(), "public/nicole1.jpg"), "base64");
  const nicoleSrc = `data:image/jpeg;base64,${nicoleData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0c0a0f",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Nicole photo — right side, fades left into dark bg */}
        <img
          src={nicoleSrc}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 520,
            height: 630,
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />

        {/* Left-to-right gradient wipe over photo */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 560,
            height: 630,
            background: "linear-gradient(to right, #0c0a0f 0%, rgba(12,10,15,0.6) 50%, transparent 100%)",
            display: "flex",
          }}
        />

        {/* Subtle top+bottom vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(12,10,15,0.5) 0%, transparent 30%, transparent 70%, rgba(12,10,15,0.7) 100%)",
            display: "flex",
          }}
        />

        {/* Left content column */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 700,
            height: 630,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 80px",
          }}
        >
          {/* Gold accent line */}
          <div
            style={{
              width: 48,
              height: 2,
              background: "#c9a96e",
              marginBottom: 22,
              display: "flex",
            }}
          />

          {/* Eyebrow label */}
          <div
            style={{
              color: "#c9a96e",
              fontSize: 13,
              letterSpacing: "0.25em",
              fontWeight: 600,
              marginBottom: 28,
              display: "flex",
              textTransform: "uppercase" as const,
            }}
          >
            TORONTO REAL ESTATE
          </div>

          {/* Name — two lines */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                color: "#f0ece4",
                fontSize: 88,
                fontWeight: 600,
                lineHeight: 1,
                display: "flex",
              }}
            >
              Nicole
            </div>
            <div
              style={{
                color: "#c9a96e",
                fontSize: 88,
                fontWeight: 600,
                lineHeight: 1,
                fontStyle: "italic",
                display: "flex",
              }}
            >
              Shlass
            </div>
          </div>

          {/* Role */}
          <div
            style={{
              color: "rgba(240,236,228,0.5)",
              fontSize: 18,
              letterSpacing: "0.12em",
              marginBottom: 52,
              display: "flex",
            }}
          >
            Sales Representative · Property.ca
          </div>

          {/* Domain stamp */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 36,
                height: 1,
                background: "rgba(201,169,110,0.5)",
                display: "flex",
              }}
            />
            <div
              style={{
                color: "rgba(201,169,110,0.6)",
                fontSize: 13,
                letterSpacing: "0.22em",
                display: "flex",
              }}
            >
              NICOLESHLASS.CA
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
