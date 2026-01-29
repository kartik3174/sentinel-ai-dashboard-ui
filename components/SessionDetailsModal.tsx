'use client';

import { X, Globe, Zap, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RiskScoreMeter from './RiskScoreMeter';
import ScammerBehaviorProfiling from './ScammerBehaviorProfiling';
import GeographicRiskInsight from './GeographicRiskInsight';
import ThreatReportGenerator from './ThreatReportGenerator';
import RepeatThreatDetection from './RepeatThreatDetection';
import URLRiskScoring from './URLRiskScoring';
import HumanSimulationIndicator from './HumanSimulationIndicator';

interface SessionDetailsModalProps {
  sessionId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

interface SessionData {
  [key: string]: {
    id: string;
    threatType: string;
    language: string;
    riskScore: number;
    urgencyTactics: number;
    paymentRequest: number;
    linkSharing: number;
    threatLanguage: number;
    engagementStatus: 'Active' | 'Intelligence Complete' | 'Terminated Safely';
    startTime: string;
    duration: string;
    messages: number;
  };
}

const sessionData: SessionData = {
  'SES-20240128-001': {
    id: 'SES-20240128-001',
    threatType: 'UPI Fraud',
    language: 'Hindi',
    riskScore: 92,
    urgencyTactics: 95,
    paymentRequest: 88,
    linkSharing: 85,
    threatLanguage: 90,
    engagementStatus: 'Active',
    startTime: '2024-01-28 14:32:15',
    duration: '15m 42s',
    messages: 23,
  },
  'SES-20240128-002': {
    id: 'SES-20240128-002',
    threatType: 'Bank KYC Scam',
    language: 'English',
    riskScore: 88,
    urgencyTactics: 90,
    paymentRequest: 85,
    linkSharing: 80,
    threatLanguage: 88,
    engagementStatus: 'Intelligence Complete',
    startTime: '2024-01-28 13:15:40',
    duration: '12m 15s',
    messages: 18,
  },
  'SES-20240128-003': {
    id: 'SES-20240128-003',
    threatType: 'Phishing Attack',
    language: 'English',
    riskScore: 72,
    urgencyTactics: 75,
    paymentRequest: 65,
    linkSharing: 85,
    threatLanguage: 70,
    engagementStatus: 'Active',
    startTime: '2024-01-28 12:45:20',
    duration: '8m 30s',
    messages: 8,
  },
  'SES-20240128-004': {
    id: 'SES-20240128-004',
    threatType: 'Social Engineering',
    language: 'Tamil',
    riskScore: 65,
    urgencyTactics: 70,
    paymentRequest: 60,
    linkSharing: 55,
    threatLanguage: 72,
    engagementStatus: 'Terminated Safely',
    startTime: '2024-01-28 11:20:10',
    duration: '6m 20s',
    messages: 12,
  },
};

export default function SessionDetailsModal({ sessionId, isOpen, onClose }: SessionDetailsModalProps) {
  if (!isOpen || !sessionId || !sessionData[sessionId]) {
    return null;
  }

  const session = sessionData[sessionId];

  const getEngagementStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/20 text-green-300';
      case 'Intelligence Complete':
        return 'bg-blue-500/20 text-blue-300';
      case 'Terminated Safely':
        return 'bg-orange-500/20 text-orange-300';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-border bg-card p-8 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{session.id}</h2>
            <p className="mt-1 text-sm text-muted-foreground">Started: {session.startTime}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-muted/50 transition-colors"
          >
            <X className="h-6 w-6 text-muted-foreground" />
          </button>
        </div>

        {/* Session Overview */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border/50 bg-muted/20 p-4">
            <p className="text-xs text-muted-foreground mb-1">Threat Type</p>
            <p className="font-semibold text-foreground">{session.threatType}</p>
          </div>
          <div className="rounded-lg border border-border/50 bg-muted/20 p-4">
            <p className="text-xs text-muted-foreground mb-1">Language</p>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-accent" />
              <p className="font-semibold text-foreground">{session.language}</p>
            </div>
          </div>
          <div className="rounded-lg border border-border/50 bg-muted/20 p-4">
            <p className="text-xs text-muted-foreground mb-1">Duration</p>
            <p className="font-semibold text-foreground">{session.duration}</p>
          </div>
          <div className="rounded-lg border border-border/50 bg-muted/20 p-4">
            <p className="text-xs text-muted-foreground mb-1">Messages</p>
            <p className="font-semibold text-foreground">{session.messages}</p>
          </div>
        </div>

        {/* Engagement Status */}
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-border/50 bg-muted/20 p-4">
          <Zap className="h-5 w-5 text-yellow-400" />
          <div>
            <p className="text-xs text-muted-foreground">Smart Engagement Status</p>
            <div className={`inline-block mt-1 px-3 py-1 rounded text-sm font-semibold ${getEngagementStatusColor(session.engagementStatus)}`}>
              {session.engagementStatus}
            </div>
          </div>
        </div>

        {/* Risk Score */}
        <div className="mb-6">
          <RiskScoreMeter
            score={session.riskScore}
            urgencyTactics={session.urgencyTactics}
            paymentRequest={session.paymentRequest}
            linkSharing={session.linkSharing}
            threatLanguage={session.threatLanguage}
          />
        </div>

        {/* Advanced Threat Intelligence Sections */}
        <div className="mb-6 space-y-6">
          {/* Scammer Behavior Profiling */}
          <ScammerBehaviorProfiling sessionId={sessionId} />

          {/* Geographic Risk Insight */}
          <GeographicRiskInsight sessionId={sessionId} />

          {/* URL Risk Scoring */}
          <URLRiskScoring sessionId={sessionId} />

          {/* Repeat Threat Detection */}
          <RepeatThreatDetection sessionId={sessionId} />

          {/* Threat Report Generator */}
          <ThreatReportGenerator sessionId={sessionId} />
        </div>

        {/* Close Button */}
        <Button
          onClick={onClose}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Close Details
        </Button>
      </div>
    </div>
  );
}
