import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ links, collapsed, onToggle, mobileOpen, onCloseMobile }) {
  const width = collapsed ? 92 : 288;

  return (
    <>
      {mobileOpen ? <button type="button" className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden" onClick={onCloseMobile} /> : null}

      <motion.aside
        initial={false}
        animate={{ width }}
        transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
        className={`fixed bottom-4 left-4 top-4 z-40 rounded-[30px] border border-[var(--line-soft)] bg-[color-mix(in_oklab,var(--surface-card)_88%,transparent)] p-4 shadow-[0_24px_54px_rgba(15,23,42,0.24)] backdrop-blur-2xl transition-transform duration-300 lg:bottom-6 lg:left-6 lg:top-6 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-[110%]'
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--brand-700)] to-[var(--accent-500)] text-white shadow-lg shadow-sky-500/25">
              <Sparkles className="h-4 w-4" />
            </div>
            {!collapsed ? (
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">Feedback Intelligence</p>
                <h1 className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">Campus OS</h1>
              </div>
            ) : null}
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onToggle}
              className="hidden rounded-xl border border-[var(--line-soft)] bg-[var(--surface-card)] p-1.5 text-[var(--text-muted)] transition hover:scale-105 hover:text-[var(--text-primary)] lg:block"
              aria-label="Toggle sidebar"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={onCloseMobile}
              className="rounded-xl border border-[var(--line-soft)] bg-[var(--surface-card)] p-1.5 text-[var(--text-muted)] lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 overflow-hidden rounded-2xl px-3 py-2.5 text-sm font-medium transition duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[var(--brand-700)] to-[var(--accent-500)] text-white shadow-lg shadow-sky-500/25'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={`rounded-xl p-1.5 transition ${isActive ? 'bg-white/20 text-white' : 'text-[var(--text-muted)] group-hover:text-[var(--brand-500)] group-hover:shadow-[0_0_18px_rgba(37,99,235,0.25)]'}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    {!collapsed ? <span className="tracking-wide">{link.label}</span> : null}
                    {isActive ? <motion.span layoutId="active-route-pill" className="absolute left-0 top-2 h-6 w-1 rounded-r-full bg-white/90" /> : null}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </motion.aside>
    </>
  );
}
