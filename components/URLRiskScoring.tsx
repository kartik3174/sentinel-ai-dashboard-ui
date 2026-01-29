'use client';

import { Shield, AlertTriangle } from 'lucide-react';

interface URLRiskScoringProps {
  sessionId?: string | null;
}

interface URLRisk {
  url: string;
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  indicators: string[];
}

const urlRiskData: Record<string, URLRisk[]> = {
  'SES-20240128-001': [
    {
      url: 'verify-upi-secure.com/login',
      riskScore: 95,
      riskLevel: 'High',
      indicators: ['Non-official domain', 'Typosquatting detected', 'Suspicious keywords', 'SSL mismatch'],
    },
    {
      url: 'bank-auth-check.in/user',
      riskScore: 92,
      riskLevel: 'High',
      indicators: ['Domain typosquatting', 'Phishing pattern', 'Authentication bypass', 'Data harvesting'],
    },
  ],
  'SES-20240128-002': [
    {
      url: 'hdfc-kyc-verify.xyz',
      riskScore: 94,
      riskLevel: 'High',
      indicators: ['Non-official TLD', 'HDFC impersonation', 'KYC scam pattern', 'Data extraction intent'],
    },
    {
      url: 'bank-kyc-update.in/security',
      riskScore: 88,
      riskLevel: 'High',
      indicators: ['Fake bank domain', 'KYC exploitation', 'Credential theft setup'],
    },
  ],
  'SES-20240128-003': [
    {
      url: 'prize-claim.xyz',
      riskScore: 87,
      riskLevel: 'High',
      indicators: ['Prize scam pattern', 'Data harvesting', 'Generic domain', 'Phishing infrastructure'],
    },
  ],
  'SES-20240128-004': [
    {
      url: 'job-payment-verify.in',
      riskScore: 85,
      riskLevel: 'High',
      indicators: ['Job scam domain', 'Payment exploitation', 'Credential harvesting', 'Advance fee scam'],
    },
  ],
};

export default function URLRiskScoring({ sessionId }: URLRiskScoringProps) {
  if (!sessionId || !urlRiskData[sessionId] || urlRiskData[sessionId].length === 0) {
    return null;
  }

  const urls = urlRiskData[sessionId];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High':
        return 'border-red-500/30 bg-red-500/10';
      case 'Medium':
        return 'border-orange-500/30 bg-orange-500/10';
      case 'Low':
        return 'border-yellow-500/30 bg-yellow-500/10';
      default:
        return 'border-border bg-card/50';
    }
  };

  const getRiskTextColor = (level: string) => {
    switch (level) {
      case 'High':
        return 'text-red-400';
      case 'Medium':
        return 'text-orange-400';
      case 'Low':
        return 'text-yellow-400';
      default:
        return 'text-foreground';
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
        <Shield className="h-5 w-5 text-cyan-400" />
        Suspicious URL Scoring
      </h3>

      <div className="space-y-3">
        {urls.map((urlItem, idx) => (
          <div key={idx} className={`rounded-lg border p-4 ${getRiskColor(urlItem.riskLevel)}`}>
            <div className="mb-3 flex items-start justify-between">
              <div className="flex-1 break-all">
                <p className="font-mono text-sm text-foreground">{urlItem.url}</p>
              </div>
              <div className="ml-3 flex flex-col items-end flex-shrink-0">
                <div className="text-right">
                  <p className={`text-2xl font-bold ${getRiskTextColor(urlItem.riskLevel)}`}>
                    {urlItem.riskScore}
                  </p>
                  <p className="text-xs text-muted-foreground">Risk Score</p>
                </div>
              </div>
            </div>

            <div className="mb-3 rounded bg-black/20 px-3 py-1 inline-block">
              <p className={`text-xs font-semibold ${getRiskTextColor(urlItem.riskLevel)}`}>
                {urlItem.riskLevel} Risk
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">Risk Indicators:</p>
              <div className="flex flex-wrap gap-2">
                {urlItem.indicators.map((indicator, indicIdx) => (
                  <span
                    key={indicIdx}
                    className="rounded px-2 py-1 text-xs bg-muted/40 text-muted-foreground"
                  >
                    {indicator}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3 w-3 text-cyan-400" />
              <span>Analyzed in Secure Environment</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
