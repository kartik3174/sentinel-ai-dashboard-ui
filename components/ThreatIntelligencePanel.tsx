'use client';

import { Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface ThreatIntelligencePanelProps {
  sessionId?: string | null;
}

interface ThreatData {
  category: string;
  icon: string;
  items: string[];
  color: string;
}

const mockIntelligence: ThreatData[] = [
  {
    category: 'UPI IDs',
    icon: '💳',
    items: ['upi.vpa@okhdfcbank', 'secure.pay@ybl', 'fraud.collect@ibl'],
    color: 'border-orange-900/50',
  },
  {
    category: 'Phone Numbers',
    icon: '📱',
    items: ['+91-9876543210', '+91-8765432109', '+91-7654321098'],
    color: 'border-red-900/50',
  },
  {
    category: 'Bank Accounts',
    icon: '🏦',
    items: ['AC: 1234567890123456', 'AC: 9876543210987654', 'AC: 5555444433332222'],
    color: 'border-pink-900/50',
  },
  {
    category: 'Phishing URLs',
    icon: '🔗',
    items: ['verify-upi-secure.com/login', 'bank-auth-check.in/user', 'secure-confirm-identity.xyz'],
    color: 'border-red-900/50',
  },
  {
    category: 'Suspicious Keywords',
    icon: '🔑',
    items: ['Compromised', 'Verify immediately', 'Account locked', 'Click here', 'Urgent action required'],
    color: 'border-yellow-900/50',
  },
];

export default function ThreatIntelligencePanel({ sessionId }: ThreatIntelligencePanelProps) {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const copyToClipboard = (text: string, index: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!sessionId) {
    return (
      <div className="rounded-lg border border-border bg-card/50 p-6 text-center backdrop-blur-sm">
        <p className="text-muted-foreground">Select a session to view extracted threat intelligence</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {mockIntelligence.map((intel, idx) => (
        <div
          key={intel.category}
          className={`rounded-lg border bg-card/50 p-4 backdrop-blur-sm ${intel.color}`}
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="text-lg">{intel.icon}</span>
            <h3 className="font-semibold text-foreground">{intel.category}</h3>
            <span className="ml-auto rounded-full bg-muted/50 px-2 py-1 text-xs font-medium text-muted-foreground">
              {intel.items.length}
            </span>
          </div>

          <div className="space-y-2">
            {intel.items.map((item, itemIdx) => (
              <div
                key={`${intel.category}-${itemIdx}`}
                className="flex items-center justify-between rounded bg-muted/30 p-2 text-sm"
              >
                <code className="flex-1 font-mono text-xs text-foreground">{item}</code>
                <button
                  onClick={() =>
                    copyToClipboard(item, `${intel.category}-${itemIdx}`)
                  }
                  className="ml-2 rounded p-1 hover:bg-muted/50"
                  title="Copy"
                >
                  {copiedIndex === `${intel.category}-${itemIdx}` ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
