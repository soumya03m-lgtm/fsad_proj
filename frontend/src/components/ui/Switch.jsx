export default function Switch({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative h-7 w-12 rounded-full border transition-all duration-300 ${
        checked
          ? 'border-transparent bg-gradient-to-r from-[var(--color-primary)] to-[var(--accent-500)]'
          : 'border-[var(--line-soft)] bg-[var(--surface-elevated)]'
      }`}
      type="button"
      aria-label="Toggle theme"
    >
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-[var(--surface-card)] shadow-md transition-all duration-300 ${
          checked ? 'left-[22px]' : 'left-0.5'
        }`}
      />
    </button>
  );
}
