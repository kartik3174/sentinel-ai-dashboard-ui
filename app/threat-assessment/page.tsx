'use client';

import { useState } from 'react';
import { Send, AlertTriangle, CheckCircle, AlertCircle, Copy, Maximize2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

interface ThreatAnalysis {
  scamDetected: boolean;
  scamType: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  threatSignals: string[];
  explanation: string;
  safetyAdvice: string;
}

export default function ThreatAssessmentPage() {
  const [input, setInput] = useState('');
  const [analyses, setAnalyses] = useState<Array<{ text: string; analysis: ThreatAnalysis }>>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const analyzeThreat = async () => {
    if (!input.trim()) return;

    setLoading(true);
    
    // Simulate API call - in production, call actual threat analysis API
    setTimeout(() => {
      const mockAnalysis: ThreatAnalysis = generateMockAnalysis(input);
      setAnalyses([{ text: input, analysis: mockAnalysis }, ...analyses]);
      setInput('');
      setLoading(false);
    }, 1500);
  };

  const generateMockAnalysis = (text: string): ThreatAnalysis => {
    const lowerText = text.toLowerCase();
    
    // UPI Fraud Detection
    if (lowerText.includes('upi') || lowerText.includes('verify') || lowerText.includes('compromised')) {
      return {
        scamDetected: true,
        scamType: 'UPI Fraud',
        riskLevel: 'High',
        threatSignals: ['Urgency language', 'Account verification request', 'Link provided', 'Pressure tactics'],
        explanation: 'This message exhibits classic UPI fraud patterns. It creates urgency around account compromise and requests immediate verification through a suspicious link. Banks never ask for account details via unsolicited messages.',
        safetyAdvice: 'Do not click any links. Do not share your PIN or UPI details. Contact your bank directly using the official number on your debit card. Report the message as spam.',
      };
    }
    
    // Bank KYC Scam
    if (lowerText.includes('kyc') || lowerText.includes('aadhar') || lowerText.includes('bank')) {
      return {
        scamDetected: true,
        scamType: 'Bank KYC Verification Scam',
        riskLevel: 'High',
        threatSignals: ['Fake authority claim', 'Document request', 'Account suspension threat', 'Urgency imposed'],
        explanation: 'This is a bank KYC impersonation scam. Scammers impersonate bank officials and request personal documents. Banks conduct KYC through secure portals, never via SMS or email.',
        safetyAdvice: 'Never share Aadhar, PAN, or bank documents via SMS/email. Visit your bank branch in person or use their official app for KYC verification. Do not click links from unsolicited messages.',
      };
    }
    
    // Job Scam
    if (lowerText.includes('job') || lowerText.includes('hiring') || lowerText.includes('salary')) {
      return {
        scamDetected: true,
        scamType: 'Job Offer Scam',
        riskLevel: 'High',
        threatSignals: ['Too-good-to-be-true salary', 'Upfront fee requested', 'Minimal qualifications', 'Fast hiring process'],
        explanation: 'This is a job offer scam. Scammers promise attractive salaries and fast hiring but require upfront payment. Legitimate companies do not charge processing fees from candidates.',
        safetyAdvice: 'Do not send money for processing fees. Verify the company through official website. Apply only through official job portals. Never pay for job applications.',
      };
    }
    
    // Phishing
    if (lowerText.includes('click') || lowerText.includes('link') || lowerText.includes('verify') || lowerText.includes('confirm')) {
      return {
        scamDetected: true,
        scamType: 'Phishing Attempt',
        riskLevel: 'Medium',
        threatSignals: ['Suspicious link provided', 'Account verification request', 'Urgency tactics', 'Generic greeting'],
        explanation: 'This message contains phishing indicators. It requests you to click a link for verification, which is a common tactic to steal credentials. Legitimate services do not ask for verification via links.',
        safetyAdvice: 'Do not click the link. Never enter credentials on unverified pages. Hover over links to see the actual URL. Access services through official apps or website directly.',
      };
    }
    
    // Lottery Scam
    if (lowerText.includes('win') || lowerText.includes('prize') || lowerText.includes('congratulation')) {
      return {
        scamDetected: true,
        scamType: 'Lottery/Prize Scam',
        riskLevel: 'Medium',
        threatSignals: ['Unexpected prize claim', 'Too good to be true', 'Verification fee requested', 'Pressure to act quickly'],
        explanation: 'This is a lottery scam. You likely did not enter any contest, yet you are told you won. These scams require verification fees or personal information before "releasing" the prize.',
        safetyAdvice: 'Do not send money or personal information. If you did not enter a contest, you cannot win it. Report as spam. Remember: legitimate lotteries do not contact via unsolicited messages.',
      };
    }
    
    // Low risk - likely legitimate
    return {
      scamDetected: false,
      scamType: 'None',
      riskLevel: 'Low',
      threatSignals: [],
      explanation: 'This message does not exhibit typical scam indicators. However, always verify sender identity and avoid clicking unsolicited links.',
      safetyAdvice: 'Stay cautious. If you initiated contact with this sender, it is likely legitimate. Always verify URLs before clicking.',
    };
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'High':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Medium':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'Low':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'High':
        return <AlertTriangle className="h-5 w-5" />;
      case 'Medium':
        return <AlertCircle className="h-5 w-5" />;
      case 'Low':
        return <CheckCircle className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(JSON.stringify(text, null, 2));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation onNotificationsClick={() => {}} />
      
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/" className="text-sm text-primary hover:underline mb-4 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">Threat Assessment Assistant</h1>
            <p className="text-muted-foreground">Analyze messages, emails, or chat content to detect scam patterns and threats</p>
          </div>

          {/* Input Section */}
          <div className="mb-8 rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
            <label className="block text-sm font-medium text-foreground mb-3">Submit content for analysis:</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  analyzeThreat();
                }
              }}
              placeholder="Paste a suspicious message, email, or chat conversation here... (Press Ctrl+Enter to analyze)"
              className="w-full h-32 rounded-lg border border-border bg-muted/30 p-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
            <div className="mt-4 flex gap-3">
              <button
                onClick={analyzeThreat}
                disabled={loading || !input.trim()}
                className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
                {loading ? 'Analyzing...' : 'Analyze'}
              </button>
              <button
                onClick={() => setInput('')}
                className="rounded-lg border border-border bg-transparent px-6 py-2 text-foreground hover:bg-muted/50 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="space-y-6">
            {analyses.length === 0 ? (
              <div className="rounded-lg border border-border/50 bg-card/30 p-12 text-center">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">No analyses yet. Submit content above to get started.</p>
              </div>
            ) : (
              analyses.map((item, idx) => (
                <div key={idx} className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
                  {/* Original Input */}
                  <div className="mb-6 pb-6 border-b border-border/50">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Submitted Content:</p>
                    <p className="text-foreground bg-muted/20 rounded p-3 max-h-24 overflow-y-auto">{item.text}</p>
                  </div>

                  {/* Analysis Results */}
                  <div className="space-y-4">
                    {/* Risk Level */}
                    <div className="flex items-center gap-3">
                      <div className={`rounded-lg border p-3 ${getRiskLevelColor(item.analysis.riskLevel)}`}>
                        {getRiskIcon(item.analysis.riskLevel)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Risk Level</p>
                        <p className={`text-lg font-bold ${item.analysis.riskLevel === 'High' ? 'text-red-400' : item.analysis.riskLevel === 'Medium' ? 'text-orange-400' : 'text-green-400'}`}>
                          {item.analysis.riskLevel}
                        </p>
                      </div>
                    </div>

                    {/* Scam Type */}
                    {item.analysis.scamDetected && (
                      <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-4">
                        <p className="text-sm font-medium text-red-300">Threat Detected</p>
                        <p className="text-foreground font-semibold mt-1">{item.analysis.scamType}</p>
                      </div>
                    )}

                    {/* Threat Signals */}
                    {item.analysis.threatSignals.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Threat Indicators:</p>
                        <div className="flex flex-wrap gap-2">
                          {item.analysis.threatSignals.map((signal, i) => (
                            <span key={i} className="inline-block rounded-full bg-red-500/20 px-3 py-1 text-sm text-red-300">
                              {signal}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Explanation */}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Analysis:</p>
                      <p className="text-foreground leading-relaxed">{item.analysis.explanation}</p>
                    </div>

                    {/* Safety Advice */}
                    <div className="rounded-lg bg-green-500/10 border border-green-500/30 p-4">
                      <p className="text-sm font-medium text-green-300 mb-2">Safety Advice:</p>
                      <p className="text-foreground">{item.analysis.safetyAdvice}</p>
                    </div>

                    {/* Copy Button */}
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(item.analysis, null, 2), idx)}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                      {copiedId === idx ? 'Copied!' : 'Copy Analysis'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
