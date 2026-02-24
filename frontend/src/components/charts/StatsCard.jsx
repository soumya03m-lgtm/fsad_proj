import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import Card from '../ui/Card';

function useCountUp(target, duration = 650) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!Number.isFinite(target)) {
      setValue(target);
      return;
    }

    let frame;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(target * progress);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

export default function StatsCard({ label, value, trend = '+0.0%', delta, icon: Icon, hint }) {
  const numeric = Number(value);
  const isNumeric = Number.isFinite(numeric);
  const decimals = useMemo(() => {
    if (!isNumeric) return 0;
    const raw = String(value);
    return raw.includes('.') ? raw.split('.')[1].length : 0;
  }, [isNumeric, value]);
  const counted = useCountUp(isNumeric ? numeric : 0);

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24 }}>
      <Card interactive className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-[var(--brand-500)]/25 to-[var(--accent-500)]/20 blur-2xl" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-[13px] font-medium tracking-wide text-[var(--text-muted)]">{label}</p>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
              {isNumeric ? counted.toFixed(decimals) : value}
            </h3>
            <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[var(--success-500)]">
              <TrendingUp className="h-3.5 w-3.5" />
              {delta || trend}
            </p>
            {hint ? <p className="mt-1 text-xs text-[var(--text-muted)]">{hint}</p> : null}
          </div>
          {Icon ? (
            <div className="rounded-2xl bg-gradient-to-br from-[var(--brand-700)] to-[var(--accent-500)] p-2.5 text-white shadow-lg shadow-sky-500/25">
              <Icon className="h-5 w-5" />
            </div>
          ) : null}
        </div>
      </Card>
    </motion.div>
  );
}
