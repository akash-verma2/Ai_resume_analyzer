import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';

const RadarScoreChart = ({ breakdown = {} }) => {
  const data = [
    { subject: 'Completeness', score: breakdown.completeness || 85, fullMark: 100 },
    { subject: 'Skills Density', score: breakdown.skillsRepertoire || 80, fullMark: 100 },
    { subject: 'Impact Verbs', score: breakdown.actionVerbs || 75, fullMark: 100 },
    { subject: 'Formatting', score: breakdown.formatting || 90, fullMark: 100 },
  ];

  return (
    <div className="w-full h-64 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#334155" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#64748b', fontSize: 10 }}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.45}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarScoreChart;
