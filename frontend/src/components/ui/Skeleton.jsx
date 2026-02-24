export default function Skeleton({ className = '' }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[var(--surface-elevated)] ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-slate-200/10" />
    </div>
  );
}
