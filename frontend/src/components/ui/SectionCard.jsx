import Card from './Card';

export default function SectionCard({ title, subtitle, action, children, className = '' }) {
  return (
    <Card className={className} interactive>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">{title}</h3>
          {subtitle ? <p className="text-sm text-[var(--text-muted)]">{subtitle}</p> : null}
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      {children}
    </Card>
  );
}
