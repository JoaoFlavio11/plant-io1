//Sensorchart.tsx
'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type Props = {
  data: { timestamp: string; temperatura: number }[];
};

export const SensorChart = ({ data }: Props) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <XAxis dataKey="timestamp" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="temperatura" stroke="#3b82f6" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
);

export default SensorChart;