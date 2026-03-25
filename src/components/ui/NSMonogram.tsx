export function NSMonogram({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Outer luxury border frame */}
      <rect
        x="1" y="1" width="26" height="26" rx="2"
        stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.45"
      />

      {/* N — left half (x: 5–13) */}
      <line x1="5"  y1="7.5" x2="5"  y2="20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5"  y1="7.5" x2="13" y2="20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13" y1="7.5" x2="13" y2="20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

      {/* S — right half (x: 15–23)
          Three cubic segments:
          1. Top arc  — right → left
          2. Middle   — left  → right  (the characteristic S crossover)
          3. Bottom arc — right → left
      */}
      <path
        d="M 23 10.5
           C 23 7.5, 15 7.5, 15 11
           C 15 14, 23 14, 23 17
           C 23 20.5, 15 20.5, 15 17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
