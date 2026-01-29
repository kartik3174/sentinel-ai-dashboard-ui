'use client';

import { TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const scamEvolutionData = [
  { date: 'Jan 1', financial: 45, credential: 30, social: 15, other: 10 },
  { date: 'Jan 8', financial: 48, credential: 32, social: 18, other: 12 },
  { date: 'Jan 15', financial: 50, credential: 38, social: 22, other: 15 },
  { date: 'Jan 22', financial: 52, credential: 45, social: 28, other: 18 },
  { date: 'Jan 29', financial: 48, credential: 52, social: 35, other: 22 },
];

export default function ScamEvolutionTracking() {
  return (
    <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
      <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-foreground">
        <TrendingUp className="h-5 w-5 text-yellow-400" />
        Emerging Scam Trends
      </h3>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={scamEvolutionData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="date" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip contentStyle={{ backgroundColor: '#0f1437', border: '1px solid #1e3a8a' }} />
          <Legend />
          <Line dataKey="financial" stroke="#ef4444" strokeWidth={2} name="Financial Fraud" />
          <Line dataKey="credential" stroke="#f59e0b" strokeWidth={2} name="Credential Theft" />
          <Line dataKey="social" stroke="#06b6d4" strokeWidth={2} name="Social Engineering" />
          <Line dataKey="other" stroke="#8b5cf6" strokeWidth={2} name="Other Scams" />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3">
          <p className="text-xs font-semibold text-red-300 mb-1">Financial Fraud</p>
          <p className="text-2xl font-bold text-red-400">↓ 8%</p>
          <p className="text-xs text-red-200/60 mt-1">Decreasing trend</p>
        </div>
        <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-3">
          <p className="text-xs font-semibold text-orange-300 mb-1">Credential Theft</p>
          <p className="text-2xl font-bold text-orange-400">↑ 15%</p>
          <p className="text-xs text-orange-200/60 mt-1">Rising threat</p>
        </div>
        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-3">
          <p className="text-xs font-semibold text-cyan-300 mb-1">Social Engineering</p>
          <p className="text-2xl font-bold text-cyan-400">↑ 22%</p>
          <p className="text-xs text-cyan-200/60 mt-1">Emerging threat</p>
        </div>
        <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-3">
          <p className="text-xs font-semibold text-purple-300 mb-1">Other Scams</p>
          <p className="text-2xl font-bold text-purple-400">↑ 12%</p>
          <p className="text-xs text-purple-200/60 mt-1">New variants</p>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
        <p className="text-sm font-semibold text-amber-300 mb-2">Threat Evolution Insights</p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-amber-400 mt-0.5">•</span>
            <span>Credential theft attacks have increased 15% - new focus on data harvesting</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 mt-0.5">•</span>
            <span>Social engineering evolving to use AI-generated voices and personalized messages</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 mt-0.5">•</span>
            <span>Multi-channel attacks combining SMS, WhatsApp, and email for higher success rates</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
