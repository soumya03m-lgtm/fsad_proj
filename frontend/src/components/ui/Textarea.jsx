export default function Textarea(props) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-2xl border border-[var(--line-soft)] bg-[color-mix(in_oklab,var(--surface-card)_90%,transparent)] px-4 py-2.5 text-sm text-[var(--text-primary)] shadow-sm outline-none transition focus:border-[var(--brand-500)] focus:ring-2 focus:ring-[color-mix(in_oklab,var(--brand-500)_25%,transparent)] ${
        props.className || ''
      }`}
    />
  );
}
