'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Copy, Download, AlertTriangle, Target } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'scammer' | 'system';
  content: string;
  timestamp: Date;
  intelligence?: string[];
}

interface ExtractedIntelligence {
  category: string;
  value: string;
  frequency: number;
}

export default function HoneypotAgentPage() {
  const [conversations, setConversations] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [activeScenario, setActiveScenario] = useState<'upi' | 'job' | 'loan' | 'kyc'>('upi');
  const [isEngaged, setIsEngaged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [intelligence, setIntelligence] = useState<ExtractedIntelligence[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scenarios = {
    upi: {
      name: 'UPI Fraud Engagement',
      description: 'Engage UPI fraud scammers',
      initialResponse: 'Hello! I just got a message about my UPI account. Can you help me understand what is happening?',
    },
    job: {
      name: 'Job Offer Scam Engagement',
      description: 'Engage job scammers',
      initialResponse: 'Hi! I received a job offer message. I am very interested in this position. Can you tell me more about it?',
    },
    loan: {
      name: 'Loan Scam Engagement',
      description: 'Engage loan fraud scammers',
      initialResponse: 'Hello! I received a message about a loan offer. I am interested but have some questions first.',
    },
    kyc: {
      name: 'KYC Scam Engagement',
      description: 'Engage KYC verification scammers',
      initialResponse: 'Hi! I got a message about KYC verification. What documents do you need?',
    },
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations]);

  const generateScammerResponse = (userMessage: string, scenario: string): { response: string; intelligence: string[] } => {
    const lowerMessage = userMessage.toLowerCase();
    const extractedItems: string[] = [];

    let response = '';

    switch (scenario) {
      case 'upi':
        if (lowerMessage.includes('account') || lowerMessage.includes('help')) {
          response = 'Your UPI account has been compromised. You need to verify your identity immediately. Please share your UPI ID and PIN to secure your account.';
          extractedItems.push('Account verification request', 'Credential harvesting', 'Urgency tactic');
        } else if (lowerMessage.includes('pin') || lowerMessage.includes('id')) {
          response = 'Good! Now please click this link to verify: https://verify-upi-secure.com. Also, do you have any bank details linked to this UPI?';
          extractedItems.push('Phishing link', 'Bank details request');
        } else {
          response = 'This is urgent. Your account will be locked in 24 hours if not verified. What is your UPI PIN?';
          extractedItems.push('Account lockout threat', 'PIN request');
        }
        break;

      case 'job':
        if (lowerMessage.includes('position') || lowerMessage.includes('interested')) {
          response = 'Excellent! This is a senior position with ₹5,00,000 monthly salary. We need to process your application. Please send ₹5,000 as registration and processing fee.';
          extractedItems.push('High salary promise', 'Upfront fee request', 'Payment redirection');
        } else if (lowerMessage.includes('fee') || lowerMessage.includes('pay')) {
          response = 'You can transfer to our account: AC-9876543210 (HDFC Bank). After payment, you will receive your offer letter within 2 hours.';
          extractedItems.push('Bank account details', 'Quick turnaround promise');
        } else {
          response = 'This role is perfect for you. What is your current salary? We can offer a 300% increase. A small fee is required to process immediately.';
          extractedItems.push('Too good to be true offer', 'Pressure tactics');
        }
        break;

      case 'loan':
        if (lowerMessage.includes('loan') || lowerMessage.includes('interested')) {
          response = 'We can approve a loan up to ₹10,00,000 with zero interest for 6 months! Just answer a few questions and we will transfer the amount to your account.';
          extractedItems.push('Unrealistic loan terms', 'Quick approval promise');
        } else if (lowerMessage.includes('questions') || lowerMessage.includes('document')) {
          response = 'What is your monthly income? Do you have any other loans? We also need your Aadhar number and PAN to process quickly.';
          extractedItems.push('Personal information request', 'Document request');
        } else {
          response = 'However, before transfer, we need a small insurance fee of ₹2,000. This is standard procedure. Can you send this amount?';
          extractedItems.push('Hidden fee', 'Upfront payment demand');
        }
        break;

      case 'kyc':
        if (lowerMessage.includes('kyc') || lowerMessage.includes('documents')) {
          response = 'Your KYC needs urgent update. Please send clear photos of your Aadhar card (front and back), passport, and a recent bank statement.';
          extractedItems.push('Document request', 'Identity verification', 'Urgency tactic');
        } else if (lowerMessage.includes('aadhar') || lowerMessage.includes('passport')) {
          response = 'Also need your current bank balance, last 3 months statements, and your account PIN for verification. Send to our secure portal: https://kyc-verify.bank.in';
          extractedItems.push('Credential request', 'Phishing link', 'Financial data request');
        } else {
          response = 'Your account will be suspended after 48 hours if KYC is not completed. This is mandatory by RBI. Please verify immediately.';
          extractedItems.push('Authority impersonation', 'Account suspension threat', 'RBI impersonation');
        }
        break;

      default:
        response = 'How can I help you with this offer?';
    }

    return { response, intelligence: extractedItems };
  };

  const startEngagement = () => {
    if (!isEngaged) {
      const scam = scenarios[activeScenario as keyof typeof scenarios];
      setConversations([
        {
          id: '0',
          role: 'system',
          content: `Started engagement scenario: ${scam.name}. The honeypot agent is now active and will attempt to engage the scammer while extracting intelligence.`,
          timestamp: new Date(),
        },
        {
          id: '1',
          role: 'user',
          content: scam.initialResponse,
          timestamp: new Date(),
        },
      ]);
      setIsEngaged(true);
      setIntelligence([]);
    }
  };

  const endEngagement = () => {
    if (isEngaged) {
      setConversations([
        ...conversations,
        {
          id: String(conversations.length),
          role: 'system',
          content: 'Engagement ended. Intelligence extracted and logged for threat analysis.',
          timestamp: new Date(),
        },
      ]);
      setIsEngaged(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !isEngaged) return;

    const userMessage = input.trim();
    const newMessage: Message = {
      id: String(conversations.length),
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };

    setConversations([...conversations, newMessage]);
    setInput('');
    setLoading(true);

    // Simulate scammer response with delay
    setTimeout(() => {
      const { response, intelligence: extractedItems } = generateScammerResponse(
        userMessage,
        activeScenario
      );

      const scammerMessage: Message = {
        id: String(conversations.length + 1),
        role: 'scammer',
        content: response,
        timestamp: new Date(),
        intelligence: extractedItems,
      };

      setConversations([...conversations, newMessage, scammerMessage]);

      // Update intelligence tracking
      extractedItems.forEach((item) => {
        const existing = intelligence.find((i) => i.value === item);
        if (existing) {
          setIntelligence(
            intelligence.map((i) =>
              i.value === item ? { ...i, frequency: i.frequency + 1 } : i
            )
          );
        } else {
          setIntelligence([
            ...intelligence,
            {
              category: activeScenario.toUpperCase(),
              value: item,
              frequency: 1,
            },
          ]);
        }
      });

      setLoading(false);
    }, 1000);
  };

  const exportIntelligence = () => {
    const data = {
      scenario: activeScenario,
      timestamp: new Date().toISOString(),
      conversations,
      extractedIntelligence: intelligence,
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `honeypot-intelligence-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation onNotificationsClick={() => {}} />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/" className="text-sm text-primary hover:underline mb-4 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">Honeypot Engagement Agent</h1>
            <p className="text-muted-foreground">Engage scammers while remaining undercover to extract threat intelligence</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Chat Area */}
            <div className="lg:col-span-2 space-y-4">
              {/* Scenario Selection */}
              {!isEngaged && (
                <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
                  <p className="text-sm font-medium text-muted-foreground mb-4">Select Engagement Scenario:</p>
                  <div className="grid gap-3">
                    {Object.entries(scenarios).map(([key, scenario]) => (
                      <button
                        key={key}
                        onClick={() => setActiveScenario(key as any)}
                        className={`rounded-lg border p-4 text-left transition-all ${
                          activeScenario === key
                            ? 'border-primary bg-primary/10'
                            : 'border-border/50 bg-muted/20 hover:border-primary/50'
                        }`}
                      >
                        <p className="font-semibold text-foreground">{scenario.name}</p>
                        <p className="text-sm text-muted-foreground">{scenario.description}</p>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={startEngagement}
                    className="mt-6 w-full rounded-lg bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
                  >
                    <Target className="inline h-4 w-4 mr-2" />
                    Start Engagement
                  </button>
                </div>
              )}

              {/* Conversation Area */}
              {isEngaged && (
                <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm overflow-hidden flex flex-col h-[600px]">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {conversations.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs rounded-lg p-3 ${
                            msg.role === 'system'
                              ? 'bg-gray-500/20 text-gray-300 w-full text-center text-sm'
                              : msg.role === 'user'
                              ? 'bg-primary/30 text-foreground'
                              : 'bg-red-500/20 text-red-300'
                          }`}
                        >
                          {msg.role === 'scammer' && (
                            <AlertTriangle className="inline h-3 w-3 mr-1" />
                          )}
                          <p>{msg.content}</p>
                          {msg.intelligence && msg.intelligence.length > 0 && (
                            <div className="mt-2 text-xs opacity-75">
                              <p className="font-semibold">Intelligence extracted:</p>
                              {msg.intelligence.map((item, i) => (
                                <p key={i}>• {item}</p>
                              ))}
                            </div>
                          )}
                          <p className="text-xs opacity-50 mt-1">
                            {msg.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="border-t border-border bg-card/30 p-4 space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !loading) sendMessage();
                        }}
                        placeholder="Type your response to engage the scammer..."
                        disabled={loading}
                        className="flex-1 rounded-lg border border-border bg-muted/30 px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                      />
                      <button
                        onClick={sendMessage}
                        disabled={loading || !input.trim()}
                        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={endEngagement}
                      className="w-full rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-2 text-red-300 hover:bg-red-500/20 transition-colors text-sm"
                    >
                      End Engagement & Extract Intelligence
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Intelligence Panel */}
            <div className="lg:col-span-1">
              <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm sticky top-20">
                <h3 className="text-lg font-semibold text-foreground mb-4">Extracted Intelligence</h3>

                {intelligence.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {isEngaged ? 'Intelligence will appear as conversation progresses...' : 'Start engagement to extract intelligence'}
                  </p>
                ) : (
                  <div className="space-y-3">
                    {intelligence.map((item, idx) => (
                      <div key={idx} className="rounded-lg bg-muted/30 border border-border/50 p-3">
                        <p className="text-xs font-semibold text-primary mb-1">{item.category}</p>
                        <p className="text-sm text-foreground">{item.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">Frequency: {item.frequency}</p>
                      </div>
                    ))}

                    {intelligence.length > 0 && isEngaged === false && (
                      <button
                        onClick={exportIntelligence}
                        className="w-full mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary/20 border border-primary/30 px-4 py-2 text-primary hover:bg-primary/30 transition-colors text-sm font-medium"
                      >
                        <Download className="h-4 w-4" />
                        Export Intelligence
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
