import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ChartCard from '../ui/ChartCard';
import { useTheme } from '../../hooks/useTheme';

export default function TrendLineChart({ data = [] }) {
  const { theme } = useTheme();
  const axis = theme === 'dark' ? '#94a3b8' : '#64748b';
  const grid = theme === 'dark' ? 'rgba(148,163,184,0.18)' : 'rgba(100,116,139,0.16)';

  return (
    <ChartCard title="Trend Analysis" subtitle="Average score movement over time">
      <div className="h-72">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={grid} strokeDasharray="3 4" vertical={false} />
            <XAxis dataKey="label" stroke={axis} tick={{ fill: axis, fontSize: 12 }} axisLine={false} tickLine={false} />
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
            <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 2 }} activeDot={{ r: 4 }} isAnimationActive animationDuration={760} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
