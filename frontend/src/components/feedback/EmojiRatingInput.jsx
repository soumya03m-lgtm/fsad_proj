const faces = ['😡', '😕', '😐', '🙂', '🤩'];

export default function EmojiRatingInput({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {faces.map((face, index) => (
        <button
          key={face}
          type="button"
          className={`rounded-xl border px-3 py-2 text-xl transition ${
            value === index + 1
              ? 'border-[var(--brand-500)] bg-[color-mix(in_oklab,var(--brand-500)_15%,transparent)]'
              : 'border-[var(--line-soft)] bg-[var(--surface-card)] hover:border-[var(--brand-300)]'
          }`}
          onClick={() => onChange(index + 1)}
        >
          {face}
        </button>
      ))}
    </div>
  );
}
