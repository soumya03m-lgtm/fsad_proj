import { AlertTriangle } from 'lucide-react';

export default function AppCrashState() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--surface-canvas)] px-6">
      <section className="glass w-full max-w-lg rounded-2xl border border-[var(--line-soft)] p-8 text-center shadow-soft">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h1 className="text-xl font-semibold text-[var(--text-primary)]">Something went wrong</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          The application hit an unexpected error. Please refresh the page and try again.
        </p>
      </section>
    </main>
  );
}
