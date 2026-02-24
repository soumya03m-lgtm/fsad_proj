export default function AppBootLoader() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--surface-canvas)] px-6">
      <div className="glass w-full max-w-sm rounded-2xl border border-[var(--line-soft)] p-6 shadow-soft">
        <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--line-soft)]">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-[var(--brand-500)] to-[var(--brand-300)]" />
        </div>
        <p className="mt-4 text-sm text-[var(--text-muted)]">Loading workspace...</p>
      </div>
    </main>
  );
}
