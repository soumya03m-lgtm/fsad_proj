export default function Button({ children, className = '', variant = 'primary', ...props }) {
  const variants = {
    primary:
      'bg-gradient-to-r from-[var(--color-primary)] to-[var(--accent-500)] text-white hover:from-[var(--color-primary-hover)] hover:to-[var(--color-primary)]',
    secondary:
      'border border-[var(--line-strong)] bg-[var(--surface-elevated)] text-[var(--color-text-primary)] hover:bg-[var(--surface-card)]',
    ghost: 'bg-transparent text-[var(--color-text-secondary)] hover:bg-[color-mix(in_oklab,var(--surface-card)_65%,transparent)]'
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] disabled:pointer-events-none disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
