'use client';

import { Database, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ThreatRecord {
  id: string;
  indicator: string;
  type: 'UPI' | 'Phone' | 'Domain';
  frequency: number;
  lastSeen: string;
}

const knownThreats: ThreatRecord[] = [
  {
    id: '1',
    indicator: 'pay2upi@bankofindia',
    type: 'UPI',
    frequency: 47,
    lastSeen: '2 hours ago',
  },
  {
    id: '2',
    indicator: '+91-987-456-3210',
    type: 'Phone',
    frequency: 34,
    lastSeen: '45 minutes ago',
  },
  {
    id: '3',
    indicator: 'malicious-verify.xyz',
    type: 'Domain',
    frequency: 23,
    lastSeen: '3 hours ago',
  },
  {
    id: '4',
    indicator: 'fraud.secure@upi',
    type: 'UPI',
    frequency: 19,
    lastSeen: '5 hours ago',
  },
  {
    id: '5',
    indicator: '+91-555-123-7890',
    type: 'Phone',
    frequency: 15,
    lastSeen: '1 day ago',
  },
];

export default function KnownThreatDatabase() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'UPI':
        return 'bg-blue-500/20 text-blue-300';
      case 'Phone':
        return 'bg-purple-500/20 text-purple-300';
      case 'Domain':
        return 'bg-red-500/20 text-red-300';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
      <div className="mb-6 flex items-center gap-3">
        <Database className="h-6 w-6 text-accent" />
        <h3 className="text-lg font-semibold text-foreground">Known Threat Indicators</h3>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {knownThreats.map((threat) => (
          <div
            key={threat.id}
            className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/20 p-3 transition-all hover:border-accent/50 hover:bg-muted/40"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-semibold rounded px-2 py-1 ${getTypeColor(threat.type)}`}>
                  {threat.type}
                </span>
                <p className="text-sm font-mono text-foreground truncate">{threat.indicator}</p>
              </div>
              <p className="text-xs text-muted-foreground">Seen {threat.frequency}x • {threat.lastSeen}</p>
            </div>

            <button
              onClick={() => handleCopy(threat.indicator, threat.id)}
              className="ml-2 p-2 rounded transition-colors hover:bg-muted/50 flex-shrink-0"
              title="Copy to clipboard"
            >
              {copiedId === threat.id ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
