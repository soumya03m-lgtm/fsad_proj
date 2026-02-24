export default function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--line-soft)] bg-[color-mix(in_oklab,var(--brand-500)_12%,transparent)] px-3 py-1 text-xs font-semibold text-[var(--brand-700)] dark:text-[var(--brand-300)]">
      {children}
    </span>
  );
}
