export function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="h-px w-20 bg-gradient-to-r from-transparent to-outline-variant/30" />
      <div
        className="w-1.5 h-1.5 rotate-45 border border-outline-variant/50"
        aria-hidden="true"
      />
      <div className="h-px w-20 bg-gradient-to-l from-transparent to-outline-variant/30" />
    </div>
  );
}
