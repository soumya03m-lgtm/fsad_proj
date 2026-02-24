import { motion } from 'framer-motion';

export default function Dropdown({ items, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.98 }}
      transition={{ duration: 0.18 }}
      className="w-52 rounded-2xl border border-[var(--line-soft)] bg-[color-mix(in_oklab,var(--surface-card)_92%,transparent)] p-2 shadow-soft backdrop-blur"
    >
      {items.map((item) => (
        <button
          key={item.value}
          className="block w-full rounded-xl px-3 py-2 text-left text-sm text-[var(--text-secondary)] transition hover:bg-[var(--surface-elevated)]"
          onClick={() => onSelect(item.value)}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </motion.div>
  );
}
