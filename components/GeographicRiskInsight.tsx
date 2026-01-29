'use client';

import { Globe, MapPin } from 'lucide-react';

interface GeographicRiskInsightProps {
  sessionId?: string | null;
}

const geoProfiles: Record<string, any> = {
  'SES-20240128-001': {
    region: 'South Asia (India)',
    countryCode: '+91',
    language: 'Hindi',
    riskIndicators: ['Phone code from India', 'Hindi language patterns', 'Indian bank details'],
  },
  'SES-20240128-002': {
    region: 'South Asia (India)',
    countryCode: '+91',
    language: 'English',
    riskIndicators: ['Phone code from India', 'English deception tactics', 'Indian bank details'],
  },
  'SES-20240128-003': {
    region: 'Southeast Asia (Multiple)',
    countryCode: 'International',
    language: 'English',
    riskIndicators: ['Generic phishing domain', 'International indicators', 'Global scam network'],
  },
  'SES-20240128-004': {
    region: 'South Asia (India)',
    countryCode: '+91',
    language: 'Tamil',
    riskIndicators: ['Phone code from India', 'Tamil language usage', 'Regional job scam ring'],
  },
};

export default function GeographicRiskInsight({ sessionId }: GeographicRiskInsightProps) {
  if (!sessionId || !geoProfiles[sessionId]) {
    return null;
  }

  const geo = geoProfiles[sessionId];

  return (
    <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
        <Globe className="h-5 w-5 text-cyan-400" />
        Geographic Risk Insight
      </h3>

      <div className="mb-4 rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-4">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm font-semibold text-cyan-300">Probable Scam Origin Region</p>
            <p className="text-lg font-bold text-foreground mt-1">{geo.region}</p>
            <p className="text-xs text-muted-foreground mt-2">Based on phone country code, language patterns, and behavioral indicators</p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border/50 bg-muted/20 p-3">
          <p className="text-xs font-semibold text-muted-foreground mb-1">Country Code</p>
          <p className="font-mono text-sm text-foreground">{geo.countryCode}</p>
        </div>
        <div className="rounded-lg border border-border/50 bg-muted/20 p-3">
          <p className="text-xs font-semibold text-muted-foreground mb-1">Language Detected</p>
          <p className="font-mono text-sm text-foreground">{geo.language}</p>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="mb-2 text-sm font-semibold text-foreground">Risk Indicators</h4>
        <div className="space-y-2">
          {geo.riskIndicators.map((indicator: string, idx: number) => (
            <div key={idx} className="flex items-start gap-2 text-sm">
              <div className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
              <span className="text-muted-foreground">{indicator}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
