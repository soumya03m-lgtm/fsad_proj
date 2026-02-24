export default function LikertScaleInput({ options = [], value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
            value === option
              ? 'border-[var(--brand-500)] bg-[color-mix(in_oklab,var(--brand-500)_15%,transparent)] text-[var(--brand-700)] dark:text-[var(--brand-300)]'
              : 'border-[var(--line-soft)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:border-[var(--brand-300)]'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
