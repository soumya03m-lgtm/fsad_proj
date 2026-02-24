import Card from './Card';

export default function ChartCard({ title, subtitle, children, className = '' }) {
  return (
    <Card title={title} subtitle={subtitle} className={className} interactive>
      <div className="rounded-2xl border border-[var(--line-soft)] bg-[color-mix(in_oklab,var(--surface-elevated)_88%,transparent)] p-3">
        {children}
      </div>
    </Card>
  );
}
