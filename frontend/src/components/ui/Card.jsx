export default function Card({ title, subtitle, children, className = '', interactive = false }) {
  return (
    <section className={`group relative ${className}`}>
      <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-[color-mix(in_oklab,var(--brand-300)_32%,transparent)] via-transparent to-[color-mix(in_oklab,var(--accent-500)_24%,transparent)] opacity-70" />
      <div
        className={`relative rounded-[26px] border border-[var(--line-soft)] bg-[color-mix(in_oklab,var(--surface-card)_92%,transparent)] p-5 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 ${
          interactive ? 'hover:-translate-y-1 hover:shadow-[0_18px_46px_rgba(15,23,42,0.18)]' : ''
        }`}
      >
        {(title || subtitle) && (
          <header className="mb-4 space-y-1">
            {title ? <h3 className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">{title}</h3> : null}
            {subtitle ? <p className="text-sm leading-relaxed text-[var(--text-muted)]">{subtitle}</p> : null}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
