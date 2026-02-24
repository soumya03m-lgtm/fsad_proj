import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ChartCard from '../ui/ChartCard';
import { useTheme } from '../../hooks/useTheme';

export default function RatingBarChart({ data = [], onBucketSelect, activeBucket = '' }) {
  const { theme } = useTheme();
  const axis = theme === 'dark' ? '#94a3b8' : '#64748b';
  const grid = theme === 'dark' ? 'rgba(148,163,184,0.18)' : 'rgba(100,116,139,0.16)';

  return (
    <ChartCard title="Rating Distribution" subtitle="Click a bar to inspect details">
      <div className="h-72">
        <ResponsiveContainer>
          <BarChart data={data} barCategoryGap={18}>
            <CartesianGrid stroke={grid} strokeDasharray="3 4" vertical={false} />
            <XAxis dataKey="bucket" stroke={axis} tick={{ fill: axis, fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis stroke={axis} tick={{ fill: axis, fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                borderRadius: '14px',
                border: '1px solid rgba(148,163,184,0.25)',
                background: theme === 'dark' ? '#121826' : '#ffffff',
                color: theme === 'dark' ? '#e2e8f0' : '#0f172a',
                boxShadow: '0 14px 30px rgba(15,23,42,0.18)'
              }}
            />
            <Bar dataKey="count" radius={[12, 12, 6, 6]} isAnimationActive animationDuration={760} onClick={(entry) => onBucketSelect?.(String(entry.bucket))}>
              {data.map((item) => (
                <Cell key={item.bucket} cursor="pointer" fill={String(item.bucket) === String(activeBucket) ? '#0ea5e9' : '#2563eb'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
