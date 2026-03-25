import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#0c0a0f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
        }}
      >
        {/* NS monogram — larger canvas for Apple touch icon */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 28 28"
          fill="none"
        >
          <rect
            x="1" y="1" width="26" height="26" rx="2"
            stroke="#c9a96e" strokeWidth="0.75" strokeOpacity="0.45"
          />
          <line x1="5"  y1="7.5" x2="5"  y2="20.5" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="5"  y1="7.5" x2="13" y2="20.5" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="13" y1="7.5" x2="13" y2="20.5" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" />
          <path
            d="M 23 10.5 C 23 7.5, 15 7.5, 15 11 C 15 14, 23 14, 23 17 C 23 20.5, 15 20.5, 15 17.5"
            stroke="#c9a96e"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
