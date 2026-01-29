'use client';

import { ChevronRight, AlertTriangle, Badge } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Session {
  id: string;
  sessionId: string;
  channel: 'SMS' | 'WhatsApp' | 'Email';
  threatType: string;
  scamType: string;
  messageCount: number;
  duration: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  language: string;
}

const mockSessions: Session[] = [
  {
    id: '1',
    sessionId: 'SES-20240128-001',
    channel: 'WhatsApp',
    threatType: 'UPI Fraud',
    scamType: 'UPI Fraud',
    messageCount: 23,
    duration: '15m 42s',
    riskLevel: 'High',
    language: 'Hindi',
  },
  {
    id: '2',
    sessionId: 'SES-20240128-002',
    channel: 'SMS',
    threatType: 'Bank KYC Scam',
    scamType: 'Bank KYC Scam',
    messageCount: 18,
    duration: '12m 15s',
    riskLevel: 'High',
    language: 'English',
  },
  {
    id: '3',
    sessionId: 'SES-20240128-003',
    channel: 'Email',
    threatType: 'Phishing Attack',
    scamType: 'Phishing Attack',
    messageCount: 8,
    duration: '8m 30s',
    riskLevel: 'Medium',
    language: 'English',
  },
  {
    id: '4',
    sessionId: 'SES-20240128-004',
    channel: 'WhatsApp',
    threatType: 'Social Engineering',
    scamType: 'Job Scam',
    messageCount: 12,
    duration: '6m 20s',
    riskLevel: 'Medium',
    language: 'Tamil',
  },
];

const getRiskLevelStyles = (level: string) => {
  switch (level) {
    case 'High':
      return 'threat-high text-red-400';
    case 'Medium':
      return 'threat-medium text-orange-400';
    case 'Low':
      return 'threat-low text-green-400';
    default:
      return '';
  }
};

const getScamTypeColor = (scamType: string) => {
  switch (scamType) {
    case 'UPI Fraud':
      return 'bg-blue-500/20 text-blue-300';
    case 'Bank KYC Scam':
      return 'bg-purple-500/20 text-purple-300';
    case 'Phishing Attack':
      return 'bg-red-500/20 text-red-300';
    case 'Loan Scam':
      return 'bg-orange-500/20 text-orange-300';
    case 'Job Scam':
      return 'bg-cyan-500/20 text-cyan-300';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

interface LiveThreatsPanelProps {
  onSelectSession: (sessionId: string) => void;
  selectedSession: string | null;
}

export default function LiveThreatsPanel({ onSelectSession, selectedSession }: LiveThreatsPanelProps) {
  return (
    <div className="space-y-3">
      {mockSessions.map((session) => (
        <div
          key={session.id}
          onClick={() => onSelectSession(session.sessionId)}
          className={`cursor-pointer rounded-lg border bg-card/50 p-4 backdrop-blur-sm transition-all hover:bg-card/80 ${
            selectedSession === session.sessionId
              ? 'border-primary bg-card/80 glow-blue'
              : 'border-border'
          }`}
        >
          <div className="mb-3 flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">{session.sessionId}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className={`text-xs font-semibold rounded px-2 py-1 ${getScamTypeColor(session.scamType)}`}>
                  {session.scamType}
                </span>
              </div>
            </div>
            <span className={`rounded px-2 py-1 text-xs font-semibold ${getRiskLevelStyles(session.riskLevel)}`}>
              {session.riskLevel}
            </span>
          </div>

          <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-muted-foreground">Channel</p>
              <p className="font-semibold text-foreground">{session.channel}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Language</p>
              <p className="font-semibold text-foreground">{session.language}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Messages</p>
              <p className="font-semibold text-foreground">{session.messageCount}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Duration</p>
              <p className="font-semibold text-foreground">{session.duration}</p>
            </div>
          </div>

          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onSelectSession(session.sessionId);
            }}
            className="w-full border-primary/30 text-primary hover:bg-primary/10 bg-transparent"
            variant="outline"
          >
            Inspect Session
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
