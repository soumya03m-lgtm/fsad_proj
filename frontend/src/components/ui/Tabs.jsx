export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={`rounded-xl px-3 py-2 text-sm ${active === tab ? 'bg-brand-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
