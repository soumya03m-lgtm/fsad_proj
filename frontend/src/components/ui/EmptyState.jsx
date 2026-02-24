import Button from './Button';

export default function EmptyState({
  title = 'Nothing here yet',
  description,
  ctaLabel,
  onCta,
  icon: Icon
}) {
  return (
    <div className="rounded-[26px] border border-dashed border-[var(--line-strong)] bg-[color-mix(in_oklab,var(--surface-elevated)_85%,transparent)] p-10 text-center">
      {Icon ? (
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--brand-500)]/20 to-[var(--accent-500)]/20 text-[var(--brand-500)]">
          <Icon className="h-6 w-6" />
        </div>
      ) : null}
      <h4 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h4>
      {description ? <p className="mx-auto mt-2 max-w-md text-sm text-[var(--text-muted)]">{description}</p> : null}
      {ctaLabel ? (
        <Button type="button" className="mt-5" onClick={onCta}>
          {ctaLabel}
        </Button>
      ) : null}
    </div>
  );
}
