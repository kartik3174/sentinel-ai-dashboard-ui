'use client';

import { RefreshCw, AlertTriangle } from 'lucide-react';

interface RepeatThreatProps {
  sessionId?: string | null;
}

const repeatThreatData: Record<string, any> = {
  'SES-20240128-001': {
    upiIds: [
      { id: 'upi.vpa@okhdfcbank', sessions: 5 },
      { id: 'secure.pay@ybl', sessions: 3 },
      { id: 'fraud.collect@ibl', sessions: 2 },
    ],
    phoneNumbers: [
      { number: '+91-9876543210', sessions: 7 },
      { number: '+91-8765432109', sessions: 4 },
    ],
    phishingDomains: [
      { domain: 'verify-upi-secure.com', sessions: 6 },
      { domain: 'bank-auth-check.in', sessions: 3 },
    ],
  },
  'SES-20240128-002': {
    upiIds: [
      { id: 'secure.pay@ybl', sessions: 3 },
      { id: 'kyc.verify@hdfc', sessions: 4 },
    ],
    phoneNumbers: [
      { number: '+91-9876543210', sessions: 7 },
      { number: '+91-7654321098', sessions: 2 },
    ],
    phishingDomains: [
      { domain: 'bank-auth-check.in', sessions: 3 },
      { domain: 'hdfc-kyc-verify.xyz', sessions: 5 },
    ],
  },
  'SES-20240128-003': {
    upiIds: [],
    phoneNumbers: [
      { number: '+1-234-567-8900', sessions: 2 },
    ],
    phishingDomains: [
      { domain: 'prize-claim.xyz', sessions: 8 },
      { domain: 'winner-verify.com', sessions: 4 },
    ],
  },
  'SES-20240128-004': {
    upiIds: [
      { id: 'job.payments@axis', sessions: 3 },
    ],
    phoneNumbers: [
      { number: '+91-8765432109', sessions: 4 },
    ],
    phishingDomains: [
      { domain: 'job-payment-verify.in', sessions: 2 },
    ],
  },
};

export default function RepeatThreatDetection({ sessionId }: RepeatThreatProps) {
  if (!sessionId || !repeatThreatData[sessionId]) {
    return null;
  }

  const threats = repeatThreatData[sessionId];
  const hasRepeatThreats =
    threats.upiIds.length > 0 || threats.phoneNumbers.length > 0 || threats.phishingDomains.length > 0;

  return (
    <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
        <RefreshCw className="h-5 w-5 text-red-400" />
        Recurring Threat Indicators
      </h3>

      {!hasRepeatThreats ? (
        <p className="text-sm text-muted-foreground">No recurring threats detected in this session</p>
      ) : (
        <div className="space-y-4">
          {threats.upiIds.length > 0 && (
            <div>
              <h4 className="mb-2 font-semibold text-foreground text-sm">UPI IDs Seen Multiple Times</h4>
              <div className="space-y-2">
                {threats.upiIds.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/10 p-3"
                  >
                    <span className="font-mono text-sm text-foreground">{item.id}</span>
                    <span className="rounded-full bg-red-500/30 px-3 py-1 text-xs font-semibold text-red-300">
                      {item.sessions} sessions
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {threats.phoneNumbers.length > 0 && (
            <div>
              <h4 className="mb-2 font-semibold text-foreground text-sm">Reused Phone Numbers</h4>
              <div className="space-y-2">
                {threats.phoneNumbers.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg border border-orange-500/20 bg-orange-500/10 p-3"
                  >
                    <span className="font-mono text-sm text-foreground">{item.number}</span>
                    <span className="rounded-full bg-orange-500/30 px-3 py-1 text-xs font-semibold text-orange-300">
                      {item.sessions} sessions
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {threats.phishingDomains.length > 0 && (
            <div>
              <h4 className="mb-2 font-semibold text-foreground text-sm">Frequently Appearing Phishing Domains</h4>
              <div className="space-y-2">
                {threats.phishingDomains.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg border border-purple-500/20 bg-purple-500/10 p-3"
                  >
                    <span className="font-mono text-sm text-foreground break-all">{item.domain}</span>
                    <span className="rounded-full bg-purple-500/30 px-3 py-1 text-xs font-semibold text-purple-300 flex-shrink-0 ml-2">
                      {item.sessions} sessions
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
