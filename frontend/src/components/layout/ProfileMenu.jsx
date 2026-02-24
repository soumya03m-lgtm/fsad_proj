import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChevronDown, LogOut, UserCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../ui/Dropdown';

export default function ProfileMenu({ name, role, onLogout }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const items = [
    { value: 'profile', label: 'Profile settings' },
    { value: 'logout', label: 'Sign out' }
  ];

  const onSelect = (value) => {
    setOpen(false);
    if (value === 'profile') {
      navigate('/profile');
      return;
    }
    if (value === 'logout') onLogout();
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-card)] px-3 py-2 text-left shadow-sm transition hover:shadow"
      >
        <UserCircle2 className="h-4 w-4 text-[var(--brand-500)]" />
        <div className="hidden sm:block">
          <p className="text-xs font-semibold text-[var(--text-primary)]">{name || 'User'}</p>
          <p className="text-[11px] uppercase tracking-wide text-[var(--text-muted)]">{role || 'member'}</p>
        </div>
        <ChevronDown className="h-4 w-4 text-[var(--text-muted)]" />
      </button>

      <div className="absolute right-0 top-14 z-20">
        <AnimatePresence>
          {open ? (
            <div className="space-y-2">
              <Dropdown items={items} onSelect={onSelect} />
              <button
                type="button"
                onClick={onLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--line-soft)] bg-[var(--surface-card)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)] transition hover:bg-[var(--surface-elevated)]"
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </button>
            </div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
