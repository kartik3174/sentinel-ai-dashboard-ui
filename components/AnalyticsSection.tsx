'use client';

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface AnalyticsSectionProps {
  sessionId?: string | null;
}

const sessionAnalyticsData: Record<string, any> = {
  'SES-20240128-001': {
    engagementDuration: [
      { name: 'Session 1', duration: 15.7 },
    ],
    messagesPerConversation: [
      { name: '00:00', messages: 5 },
      { name: '00:05', messages: 8 },
      { name: '00:10', messages: 6 },
      { name: '00:15', messages: 4 },
    ],
    threatType: [
      { name: 'UPI Fraud', value: 100, color: '#ef4444' },
    ],
    intelligenceCapture: [
      { category: 'UPI IDs', rate: 99 },
      { category: 'Phone #', rate: 92 },
      { category: 'Bank Acc', rate: 88 },
      { category: 'URLs', rate: 100 },
      { category: 'Keywords', rate: 95 },
    ],
  },
  'SES-20240128-002': {
    engagementDuration: [
      { name: 'Session 2', duration: 12.3 },
    ],
    messagesPerConversation: [
      { name: '00:00', messages: 4 },
      { name: '00:05', messages: 6 },
      { name: '00:10', messages: 5 },
      { name: '00:15', messages: 3 },
    ],
    threatType: [
      { name: 'Bank KYC Scam', value: 100, color: '#f59e0b' },
    ],
    intelligenceCapture: [
      { category: 'UPI IDs', rate: 85 },
      { category: 'Phone #', rate: 90 },
      { category: 'Bank Acc', rate: 95 },
      { category: 'URLs', rate: 88 },
      { category: 'Keywords', rate: 92 },
    ],
  },
  'SES-20240128-003': {
    engagementDuration: [
      { name: 'Session 3', duration: 8.5 },
    ],
    messagesPerConversation: [
      { name: '00:00', messages: 3 },
      { name: '00:05', messages: 2 },
      { name: '00:10', messages: 2 },
      { name: '00:15', messages: 1 },
    ],
    threatType: [
      { name: 'Phishing', value: 100, color: '#06b6d4' },
    ],
    intelligenceCapture: [
      { category: 'UPI IDs', rate: 0 },
      { category: 'Phone #', rate: 75 },
      { category: 'Bank Acc', rate: 0 },
      { category: 'URLs', rate: 100 },
      { category: 'Keywords', rate: 80 },
    ],
  },
  'SES-20240128-004': {
    engagementDuration: [
      { name: 'Session 4', duration: 6.2 },
    ],
    messagesPerConversation: [
      { name: '00:00', messages: 2 },
      { name: '00:05', messages: 2 },
      { name: '00:10', messages: 0 },
      { name: '00:15', messages: 0 },
    ],
    threatType: [
      { name: 'Job Scam', value: 100, color: '#8b5cf6' },
    ],
    intelligenceCapture: [
      { category: 'UPI IDs', rate: 0 },
      { category: 'Phone #', rate: 85 },
      { category: 'Bank Acc', rate: 90 },
      { category: 'URLs', rate: 0 },
      { category: 'Keywords', rate: 88 },
    ],
  },
};

const defaultData = {
  engagementDuration: [
    { name: 'Session 1', duration: 15.7 },
    { name: 'Session 2', duration: 12.3 },
    { name: 'Session 3', duration: 8.5 },
    { name: 'Session 4', duration: 6.2 },
    { name: 'Session 5', duration: 18.9 },
    { name: 'Session 6', duration: 11.4 },
  ],
  messagesPerConversation: [
    { name: 'Hour 1', messages: 45 },
    { name: 'Hour 2', messages: 52 },
    { name: 'Hour 3', messages: 38 },
    { name: 'Hour 4', messages: 61 },
    { name: 'Hour 5', messages: 55 },
    { name: 'Hour 6', messages: 48 },
  ],
  threatType: [
    { name: 'UPI Fraud', value: 35, color: '#ef4444' },
    { name: 'Bank Scam', value: 28, color: '#f59e0b' },
    { name: 'Phishing', value: 22, color: '#06b6d4' },
    { name: 'Social Eng.', value: 15, color: '#8b5cf6' },
  ],
  intelligenceCapture: [
    { category: 'UPI IDs', rate: 94 },
    { category: 'Phone #', rate: 88 },
    { category: 'Bank Acc', rate: 91 },
    { category: 'URLs', rate: 97 },
    { category: 'Keywords', rate: 86 },
  ],
};

export default function AnalyticsSection({ sessionId }: AnalyticsSectionProps) {
  const data = sessionId && sessionAnalyticsData[sessionId] ? sessionAnalyticsData[sessionId] : defaultData;
  
  const engagementDurationData = data.engagementDuration;
  const messagesPerConversationData = data.messagesPerConversation;
  const threatTypeData = data.threatType;
  const intelligenceCaptureData = data.intelligenceCapture;
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Engagement Duration Chart */}
      <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm glow-cyan">
        <h3 className="mb-4 font-semibold text-foreground">Engagement Duration per Session</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={engagementDurationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: '12px' }} />
            <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f1437',
                border: '1px solid #1e3a8a',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#e0e7ff' }}
            />
            <Bar dataKey="duration" fill="#06b6d4" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Messages Per Conversation Chart */}
      <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm glow-green">
        <h3 className="mb-4 font-semibold text-foreground">Messages per Conversation</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={messagesPerConversationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: '12px' }} />
            <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f1437',
                border: '1px solid #1e3a8a',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#e0e7ff' }}
            />
            <Line type="monotone" dataKey="messages" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Threat Type Distribution */}
      <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm glow-blue">
        <h3 className="mb-4 font-semibold text-foreground">Threat Type Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={threatTypeData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {threatTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f1437',
                border: '1px solid #1e3a8a',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#e0e7ff' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Intelligence Capture Rate */}
      <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm glow-cyan">
        <h3 className="mb-4 font-semibold text-foreground">Intelligence Capture Rate</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={intelligenceCaptureData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis type="number" stroke="#64748b" style={{ fontSize: '12px' }} />
            <YAxis dataKey="category" type="category" stroke="#64748b" style={{ fontSize: '12px' }} width={80} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f1437',
                border: '1px solid #1e3a8a',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#e0e7ff' }}
            />
            <Bar dataKey="rate" fill="#0ea5e9" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
