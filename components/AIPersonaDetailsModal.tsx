'use client';

import { X, MessageCircle, Clock, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  sender: 'scammer' | 'ai_agent';
  message: string;
  timestamp: Date;
}

interface AIPersonaDetailsModalProps {
  personaId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const personaConversations: Record<string, { name: string; style: string; activeSessions: number; messages: Message[] }> = {
  '1': {
    name: 'Elderly User',
    style: 'Vulnerable, needing guidance',
    activeSessions: 8,
    messages: [
      {
        id: '1',
        sender: 'scammer',
        message: 'Hello beta beta, your bank account needs urgent verification. Call this number: 9876543210',
        timestamp: new Date(Date.now() - 10 * 60000),
      },
      {
        id: '2',
        sender: 'ai_agent',
        message: 'I am confused. Why would the bank call me directly? Should I not call the bank myself?',
        timestamp: new Date(Date.now() - 9 * 60000),
      },
      {
        id: '3',
        sender: 'scammer',
        message: 'No beta, this is the official bank line. We need your ATM PIN immediately to protect your account.',
        timestamp: new Date(Date.now() - 8 * 60000),
      },
      {
        id: '4',
        sender: 'ai_agent',
        message: 'That sounds very suspicious. Banks never ask for PIN over phone. This is a scam.',
        timestamp: new Date(Date.now() - 7 * 60000),
      },
      {
        id: '5',
        sender: 'scammer',
        message: 'You are making a mistake! Your account will be frozen in 2 hours if you don\'t act now!',
        timestamp: new Date(Date.now() - 6 * 60000),
      },
      {
        id: '6',
        sender: 'ai_agent',
        message: 'I will not be providing any information. I am reporting this to my actual bank immediately.',
        timestamp: new Date(Date.now() - 5 * 60000),
      },
    ],
  },
  '2': {
    name: 'Tech Beginner',
    style: 'Curious, easily confused',
    activeSessions: 6,
    messages: [
      {
        id: '1',
        sender: 'scammer',
        message: 'Congratulations! Your device has won an Apple iPhone 15. Claim here: https://app-reward-claim.xyz',
        timestamp: new Date(Date.now() - 12 * 60000),
      },
      {
        id: '2',
        sender: 'ai_agent',
        message: 'Oh wow! I did not know I won a phone. But the link looks strange, is this real?',
        timestamp: new Date(Date.now() - 11 * 60000),
      },
      {
        id: '3',
        sender: 'scammer',
        message: 'Yes! Click now and verify with your credit card details to claim. Limited time offer!',
        timestamp: new Date(Date.now() - 10 * 60000),
      },
      {
        id: '4',
        sender: 'ai_agent',
        message: 'Wait, why would I need to give credit card details for a free phone? That does not make sense.',
        timestamp: new Date(Date.now() - 9 * 60000),
      },
      {
        id: '5',
        sender: 'scammer',
        message: 'It is for shipping and processing. Don\'t you want your free iPhone?',
        timestamp: new Date(Date.now() - 8 * 60000),
      },
      {
        id: '6',
        sender: 'ai_agent',
        message: 'No, I will not share my card details. This is clearly a phishing scam.',
        timestamp: new Date(Date.now() - 7 * 60000),
      },
    ],
  },
  '3': {
    name: 'Busy Professional',
    style: 'Time-pressed, impatient',
    activeSessions: 5,
    messages: [
      {
        id: '1',
        sender: 'scammer',
        message: 'Hi! Quick survey - confirm your UPI account details for a ₹10,000 bonus. Link: bit.ly/UPI-Bonus',
        timestamp: new Date(Date.now() - 8 * 60000),
      },
      {
        id: '2',
        sender: 'ai_agent',
        message: 'I do not have time for this. What company is this from?',
        timestamp: new Date(Date.now() - 7 * 60000),
      },
      {
        id: '3',
        sender: 'scammer',
        message: 'Google Play Store rewards. Just confirm your ID and account number quickly!',
        timestamp: new Date(Date.now() - 6 * 60000),
      },
      {
        id: '4',
        sender: 'ai_agent',
        message: 'Google would not ask for this via random links. This is a scam. Not interested.',
        timestamp: new Date(Date.now() - 5 * 60000),
      },
    ],
  },
  '4': {
    name: 'Skeptical User',
    style: 'Questioning, vigilant',
    activeSessions: 3,
    messages: [
      {
        id: '1',
        sender: 'scammer',
        message: 'Your Aadhar is linked to 3 active bank accounts. Confirm identity: https://aadhaar-verify.com',
        timestamp: new Date(Date.now() - 5 * 60000),
      },
      {
        id: '2',
        sender: 'ai_agent',
        message: 'That is immediately suspicious. Who are you and how did you get my number?',
        timestamp: new Date(Date.now() - 4 * 60000),
      },
      {
        id: '3',
        sender: 'scammer',
        message: 'We are from government Aadhar office. Verify immediately or face legal action.',
        timestamp: new Date(Date.now() - 3 * 60000),
      },
      {
        id: '4',
        sender: 'ai_agent',
        message: 'The government never contacts via SMS with links. This is 100% a scam. Blocking you.',
        timestamp: new Date(Date.now() - 2 * 60000),
      },
    ],
  },
};

export default function AIPersonaDetailsModal({ personaId, isOpen, onClose }: AIPersonaDetailsModalProps) {
  if (!isOpen || !personaId) return null;

  const persona = personaConversations[personaId];
  if (!persona) return null;

  const { name, style, activeSessions, messages } = persona;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] rounded-lg border border-border bg-card shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card/50 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{name}</h2>
              <p className="text-sm text-muted-foreground mt-1">{style}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-muted/50 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-muted/20 p-3">
              <MessageCircle className="h-4 w-4 text-cyan-400" />
              <div>
                <p className="text-xs text-muted-foreground">Active Sessions</p>
                <p className="text-sm font-bold text-foreground">{activeSessions}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-muted/20 p-3">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <div>
                <p className="text-xs text-muted-foreground">Detection Rate</p>
                <p className="text-sm font-bold text-foreground">98%</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-muted/20 p-3">
              <Clock className="h-4 w-4 text-orange-400" />
              <div>
                <p className="text-xs text-muted-foreground">Avg Response</p>
                <p className="text-sm font-bold text-foreground">2.3s</p>
              </div>
            </div>
          </div>
        </div>

        {/* Conversation */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'ai_agent' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-xs rounded-lg px-4 py-3 ${
                  msg.sender === 'ai_agent'
                    ? 'bg-muted/30 border border-border text-foreground'
                    : 'bg-primary/20 border border-primary/30 text-primary'
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                <p className="text-xs mt-2 opacity-60">
                  {msg.timestamp.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-card/50 p-4">
          <Button
            onClick={onClose}
            className="w-full bg-primary/20 text-primary hover:bg-primary/30"
            variant="outline"
          >
            Close Conversation
          </Button>
        </div>
      </div>
    </div>
  );
}
