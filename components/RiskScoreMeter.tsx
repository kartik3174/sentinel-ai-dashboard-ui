'use client';

import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface RiskScoreMeterProps {
  score: number; // 0-100
  urgencyTactics: number;
  paymentRequest: number;
  linkSharing: number;
  threatLanguage: number;
}

export default function RiskScoreMeter({
  score,
  urgencyTactics,
  paymentRequest,
  linkSharing,
  threatLanguage,
}: RiskScoreMeterProps) {
  const getRiskLevel = (score: number) => {
    if (score < 33) return { level: 'Low', color: 'bg-green-500', textColor: 'text-green-400', icon: CheckCircle };
    if (score < 66) return { level: 'Medium', color: 'bg-orange-500', textColor: 'text-orange-400', icon: AlertCircle };
    return { level: 'High', color: 'bg-red-500', textColor: 'text-red-400', icon: AlertTriangle };
  };

  const risk = getRiskLevel(score);
  const Icon = risk.icon;

  return (
    <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
      <div className="mb-6 flex items-center gap-3">
        <AlertTriangle className="h-6 w-6 text-orange-400" />
        <h3 className="text-lg font-semibold text-foreground">Threat Risk Score</h3>
      </div>

      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Overall Risk Assessment</span>
          <div className="flex items-center gap-2">
            <Icon className={`h-5 w-5 ${risk.textColor}`} />
            <span className={`font-semibold ${risk.textColor}`}>{risk.level}</span>
          </div>
        </div>

        <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full ${risk.color} transition-all duration-500`}
            style={{ width: `${score}%` }}
          />
        </div>
        <p className="mt-2 text-right text-sm font-semibold text-foreground">{score}/100</p>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Risk Factors</h4>
        
        <div className="space-y-2">
          <RiskFactor label="Urgency Tactics" value={urgencyTactics} />
          <RiskFactor label="Payment Request" value={paymentRequest} />
          <RiskFactor label="Link Sharing" value={linkSharing} />
          <RiskFactor label="Threat Language" value={threatLanguage} />
        </div>
      </div>
    </div>
  );
}

interface RiskFactorProps {
  label: string;
  value: number;
}

function RiskFactor({ label, value }: RiskFactorProps) {
  const getBarColor = (val: number) => {
    if (val < 33) return 'bg-green-500/30';
    if (val < 66) return 'bg-orange-500/30';
    return 'bg-red-500/30';
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground w-28">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full ${getBarColor(value)} transition-all duration-300`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-medium text-foreground w-10 text-right">{value}%</span>
    </div>
  );
}
