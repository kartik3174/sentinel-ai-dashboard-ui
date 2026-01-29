'use client';

import { AlertTriangle, Clock, MessageSquare, Zap } from 'lucide-react';

interface BehaviorProfilingProps {
  sessionId?: string | null;
}

const behaviorProfiles: Record<string, any> = {
  'SES-20240128-001': {
    profileType: 'High-Pressure UPI Fraud Pattern',
    pressureTactics: [
      'Immediate action required',
      'Account will be locked',
      'Verify within 5 minutes',
      'Click link now',
    ],
    messageFrequency: 'High (4-6 messages per minute)',
    activeWindow: '2:00 PM - 4:00 PM IST',
    repeatedPhrases: [
      'Verify immediately',
      'Click here',
      'Your account',
      'Secure verification',
    ],
  },
  'SES-20240128-002': {
    profileType: 'Authority-Based Bank Scam Pattern',
    pressureTactics: [
      'Official bank mandate',
      'Security protocol required',
      'Compliance verification',
      'Account suspension threat',
    ],
    messageFrequency: 'Medium (2-3 messages per minute)',
    activeWindow: '9:00 AM - 11:00 AM IST',
    repeatedPhrases: [
      'HDFC Bank',
      'KYC verification',
      'Account suspended',
      'Urgent action',
    ],
  },
  'SES-20240128-003': {
    profileType: 'Phishing Campaign Pattern',
    pressureTactics: [
      'Prize claim urgency',
      'Limited time offer',
      'Verification required',
      'Personal information request',
    ],
    messageFrequency: 'Low (1-2 messages per minute)',
    activeWindow: '1:00 PM - 5:00 PM IST',
    repeatedPhrases: [
      'Congratulations',
      'Claim prize',
      'Verify email',
      'Click here',
    ],
  },
  'SES-20240128-004': {
    profileType: 'Opportunity-Based Job Scam Pattern',
    pressureTactics: [
      'Attractive salary promise',
      'Quick hiring process',
      'Upfront payment request',
      'False urgency',
    ],
    messageFrequency: 'Low (1-2 messages per minute)',
    activeWindow: '10:00 AM - 3:00 PM IST',
    repeatedPhrases: [
      'High salary',
      'Process fee',
      'Immediate joining',
      'Bank details',
    ],
  },
};

export default function ScammerBehaviorProfiling({ sessionId }: BehaviorProfilingProps) {
  if (!sessionId || !behaviorProfiles[sessionId]) {
    return null;
  }

  const profile = behaviorProfiles[sessionId];

  return (
    <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
        <AlertTriangle className="h-5 w-5 text-orange-400" />
        Scammer Behavioral Profile
      </h3>

      <div className="mb-4 rounded-lg border border-orange-500/30 bg-orange-500/10 p-3">
        <p className="text-sm font-semibold text-orange-300">
          Profile Type: {profile.profileType}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Zap className="h-4 w-4 text-red-400" />
            Typical Pressure Tactics
          </h4>
          <div className="flex flex-wrap gap-2">
            {profile.pressureTactics.map((tactic: string, idx: number) => (
              <span
                key={idx}
                className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-medium text-red-300"
              >
                {tactic}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
            <MessageSquare className="h-4 w-4 text-cyan-400" />
            Message Frequency Pattern
          </h4>
          <p className="text-sm text-muted-foreground">{profile.messageFrequency}</p>
        </div>

        <div>
          <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Clock className="h-4 w-4 text-green-400" />
            Active Time Window
          </h4>
          <p className="text-sm text-muted-foreground">{profile.activeWindow}</p>
        </div>

        <div>
          <h4 className="mb-2 text-sm font-semibold text-foreground">Repeated Phrases Detected</h4>
          <div className="flex flex-wrap gap-2">
            {profile.repeatedPhrases.map((phrase: string, idx: number) => (
              <span
                key={idx}
                className="rounded bg-muted/40 px-2 py-1 text-xs text-muted-foreground"
              >
                "{phrase}"
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
