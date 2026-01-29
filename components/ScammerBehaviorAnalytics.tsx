'use client';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Zap, MessageCircle } from 'lucide-react';

const messageFrequencyData = [
  { time: '14:00', messages: 2 },
  { time: '14:15', messages: 5 },
  { time: '14:30', messages: 8 },
  { time: '14:45', messages: 6 },
  { time: '15:00', messages: 9 },
  { time: '15:15', messages: 7 },
  { time: '15:30', messages: 4 },
];

const responseDelayData = [
  { session: 'Session 1', delay: 8 },
  { session: 'Session 2', delay: 12 },
  { session: 'Session 3', delay: 5 },
  { session: 'Session 4', delay: 15 },
  { session: 'Session 5', delay: 10 },
];

const commonKeywords = [
  { keyword: 'verify', frequency: 24 },
  { keyword: 'urgent', frequency: 19 },
  { keyword: 'payment', frequency: 22 },
  { keyword: 'confirm', frequency: 18 },
  { keyword: 'link', frequency: 16 },
  { keyword: 'account', frequency: 15 },
];

export default function ScammerBehaviorAnalytics() {
  return (
    <div className="space-y-6">
      {/* Message Frequency */}
      <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
        <div className="mb-6 flex items-center gap-3">
          <MessageCircle className="h-6 w-6 text-secondary" />
          <h3 className="text-lg font-semibold text-foreground">Message Frequency Over Time</h3>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={messageFrequencyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" />
            <XAxis dataKey="time" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f1437',
                border: '1px solid #1e3a8a',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#e0e7ff' }}
            />
            <Line
              type="monotone"
              dataKey="messages"
              stroke="#10b981"
              dot={{ fill: '#10b981', r: 4 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Response Delay */}
      <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
        <div className="mb-6 flex items-center gap-3">
          <Zap className="h-6 w-6 text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Average Response Delay (seconds)</h3>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={responseDelayData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" />
            <XAxis dataKey="session" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f1437',
                border: '1px solid #1e3a8a',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#e0e7ff' }}
            />
            <Bar dataKey="delay" fill="#06b6d4" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Common Keywords */}
      <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
        <div className="mb-6 flex items-center gap-3">
          <Activity className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Most Common Keywords Used</h3>
        </div>

        <div className="space-y-3">
          {commonKeywords.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="w-24 text-sm font-medium text-foreground">{item.keyword}</span>
              <div className="flex-1 h-6 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
                  style={{ width: `${(item.frequency / 24) * 100}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-muted-foreground">{item.frequency}x</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
