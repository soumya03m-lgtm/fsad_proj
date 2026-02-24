import { forwardRef } from 'react';

const Select = forwardRef(function Select({ className = '', ...props }, ref) {
  return (
    <select
      ref={ref}
      {...props}
      className={`w-full rounded-2xl border border-[var(--line-soft)] bg-[color-mix(in_oklab,var(--surface-card)_90%,transparent)] px-4 py-2.5 text-sm text-[var(--color-text-primary)] shadow-sm outline-none transition duration-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[color-mix(in_oklab,var(--color-primary)_25%,transparent)] ${className}`}
    />
  );
});

export default Select;
