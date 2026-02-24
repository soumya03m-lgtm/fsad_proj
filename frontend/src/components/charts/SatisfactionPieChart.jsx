import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import ChartCard from '../ui/ChartCard';
import { useTheme } from '../../hooks/useTheme';

export default function SatisfactionPieChart({ data = [] }) {
  const { theme } = useTheme();
  const colors = ['#2563eb', '#38bdf8', '#10b981', '#f59e0b'];

  return (
    <ChartCard title="Satisfaction Split" subtitle="Distribution of sentiment buckets">
      <div className="h-72">
        <ResponsiveContainer>
          <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={96} innerRadius={56} isAnimationActive animationDuration={760}>
              {data.map((item, index) => (
                <Cell key={item.name} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: '14px',
                border: '1px solid rgba(148,163,184,0.25)',
                background: theme === 'dark' ? '#121826' : '#ffffff',
                color: theme === 'dark' ? '#e2e8f0' : '#0f172a',
                boxShadow: '0 14px 30px rgba(15,23,42,0.18)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
