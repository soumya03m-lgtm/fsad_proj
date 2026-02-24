import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--color-bg)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(99,102,241,0.22),transparent_32%),radial-gradient(circle_at_85%_80%,rgba(139,92,246,0.2),transparent_34%),linear-gradient(135deg,#6366F1_0%,#8B5CF6_55%,#4F46E5_100%)] opacity-90" />
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl dark:bg-indigo-300/10" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl dark:bg-violet-400/10" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1300px] items-stretch px-4 py-6 lg:px-8">
        <section className="hidden flex-1 flex-col justify-between rounded-[30px] border border-white/25 bg-white/10 p-10 text-white shadow-[0_24px_60px_rgba(15,23,42,0.2)] backdrop-blur-xl lg:flex">
          <div className="inline-flex w-fit items-center rounded-full border border-white/35 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em]">
            Feedback Intelligence Suite
          </div>

          <div className="space-y-5">
            <h1 className="max-w-xl text-5xl font-semibold leading-tight tracking-tight">
              Better course outcomes start with meaningful feedback loops.
            </h1>
            <p className="max-w-lg text-sm leading-relaxed text-indigo-100/90">
              A modern EdTech analytics platform for institutions that care about clarity, engagement, and measurable teaching quality.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs text-indigo-100/90">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-3">
              <p className="text-lg font-semibold text-white">98%</p>
              <p>Response integrity</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-3">
              <p className="text-lg font-semibold text-white">24/7</p>
              <p>Live insights</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-3">
              <p className="text-lg font-semibold text-white">SOC-ready</p>
              <p>Data safety</p>
            </div>
          </div>
        </section>

        <div className="flex w-full flex-1 items-center justify-center lg:pl-8">
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.28 }}
            className="w-full max-w-md rounded-[30px] border border-white/25 bg-white/70 p-7 shadow-[0_24px_60px_rgba(15,23,42,0.2)] backdrop-blur-2xl dark:border-slate-600/40 dark:bg-slate-800/70 sm:p-8"
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
