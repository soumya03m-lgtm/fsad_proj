import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function titleCase(value) {
  return value.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const parts = pathname.split('/').filter(Boolean);

  const crumbs = parts.map((part, index) => ({
    label: titleCase(part),
    to: `/${parts.slice(0, index + 1).join('/')}`
  }));

  return (
    <nav className="flex items-center gap-1 overflow-x-auto rounded-2xl border border-[var(--line-soft)] bg-[color-mix(in_oklab,var(--surface-card)_88%,transparent)] px-3 py-2 text-xs text-[var(--text-muted)] shadow-sm">
      <Link to="/" className="inline-flex items-center gap-1 rounded-lg px-2 py-1 transition hover:bg-[var(--surface-elevated)]">
        <Home className="h-3.5 w-3.5" />
        Home
      </Link>
      {crumbs.map((crumb) => (
        <span key={crumb.to} className="inline-flex items-center gap-1">
          <ChevronRight className="h-3 w-3 opacity-70" />
          <Link to={crumb.to} className="rounded-lg px-2 py-1 transition hover:bg-[var(--surface-elevated)]">
            {crumb.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
