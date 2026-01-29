'use client';

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Activity } from 'lucide-react';

const engagementDurationData = [
  { session: 'S1', duration: 15.7 },
  { session: 'S2', duration: 12.3 },
  { session: 'S3', duration: 8.5 },
  { session: 'S4', duration: 6.2 },
  { session: 'S5', duration: 18.9 },
  { session: 'S6', duration: 11.4 },
];

const intelligenceExtractionData = [
  { time: '00:00', rate: 78 },
  { time: '04:00', rate: 82 },
  { time: '08:00', rate: 85 },
  { time: '12:00', rate: 88 },
  { time: '16:00', rate: 91 },
  { time: '20:00', rate: 89 },
];

const messagesPerEngagementData = [
  { engagement: '1', messages: 23 },
  { engagement: '2', messages: 18 },
  { engagement: '3', messages: 8 },
  { engagement: '4', messages: 12 },
  { engagement: '5', messages: 27 },
  { engagement: '6', messages: 15 },
];

const scamTrendData = [
  { week: 'Week 1', upi: 8, kyc: 5, phishing: 3, job: 2, other: 1 },
  { week: 'Week 2', upi: 9, kyc: 6, phishing: 4, job: 3, other: 2 },
  { week: 'Week 3', upi: 7, kyc: 8, phishing: 5, job: 4, other: 2 },
  { week: 'Week 4', upi: 6, kyc: 9, phishing: 7, job: 5, other: 3 },
];

export default function SystemPerformanceMetrics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Activity className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">System Performance Metrics</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Average Engagement Duration */}
        <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Average Engagement Duration</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementDurationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="session" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f1437', border: '1px solid #1e3a8a' }} />
              <Bar dataKey="duration" fill="#0ea5e9" name="Duration (mins)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Intelligence Extraction Rate */}
        <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Intelligence Extraction Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={intelligenceExtractionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f1437', border: '1px solid #1e3a8a' }} />
              <Area dataKey="rate" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Extraction Rate %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Messages Per Engagement */}
        <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Messages Per Engagement</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={messagesPerEngagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="engagement" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f1437', border: '1px solid #1e3a8a' }} />
              <Line dataKey="messages" stroke="#06b6d4" strokeWidth={2} name="Message Count" dot={{ fill: '#06b6d4' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Scam Type Trend */}
        <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Scam Type Trend Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scamTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="week" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f1437', border: '1px solid #1e3a8a' }} />
              <Legend />
              <Bar dataKey="upi" fill="#ef4444" name="UPI Fraud" />
              <Bar dataKey="kyc" fill="#f59e0b" name="KYC Scam" />
              <Bar dataKey="phishing" fill="#06b6d4" name="Phishing" />
              <Bar dataKey="job" fill="#8b5cf6" name="Job Scam" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Key Performance Indicators</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border/50 bg-muted/20 p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Avg Duration</p>
            <p className="text-2xl font-bold text-cyan-400">12.7 min</p>
          </div>
          <div className="rounded-lg border border-border/50 bg-muted/20 p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Extraction Rate</p>
            <p className="text-2xl font-bold text-green-400">89%</p>
          </div>
          <div className="rounded-lg border border-border/50 bg-muted/20 p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Avg Messages</p>
            <p className="text-2xl font-bold text-purple-400">17.2</p>
          </div>
          <div className="rounded-lg border border-border/50 bg-muted/20 p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Success Rate</p>
            <p className="text-2xl font-bold text-yellow-400">94%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
