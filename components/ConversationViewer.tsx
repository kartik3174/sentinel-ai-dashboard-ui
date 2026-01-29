'use client';

import { formatTime } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';

interface ConversationMessage {
  id: string;
  sender: 'scammer' | 'ai_agent';
  message: string;
  timestamp: Date;
  threatLevel?: 'high' | 'medium' | 'low';
}

interface ConversationViewerProps {
  sessionId: string | null;
}

const sessionConversations: Record<string, ConversationMessage[]> = {
  'SES-20240128-001': [
    {
      id: '1',
      sender: 'scammer',
      message: 'Hello! Your UPI account has been compromised. Click here to verify immediately.',
      timestamp: new Date(Date.now() - 15 * 60000),
      threatLevel: 'high',
    },
    {
      id: '2',
      sender: 'ai_agent',
      message: 'I understand your concern about my UPI account. Could you provide more details about the verification process?',
      timestamp: new Date(Date.now() - 14 * 60000),
    },
    {
      id: '3',
      sender: 'scammer',
      message: 'Visit https://verify-upi-secure.com/login - use your PIN 1234 to confirm identity',
      timestamp: new Date(Date.now() - 13 * 60000),
      threatLevel: 'high',
    },
    {
      id: '4',
      sender: 'ai_agent',
      message: 'That link looks suspicious. Could you verify your official contact information through the bank?',
      timestamp: new Date(Date.now() - 12 * 60000),
    },
    {
      id: '5',
      sender: 'scammer',
      message: 'Look, I need your bank details NOW or your account will be locked!',
      timestamp: new Date(Date.now() - 11 * 60000),
      threatLevel: 'high',
    },
    {
      id: '6',
      sender: 'ai_agent',
      message: 'I understand the urgency. Let me verify this through my bank directly. Can you share the reference number?',
      timestamp: new Date(Date.now() - 10 * 60000),
    },
  ],
  'SES-20240128-002': [
    {
      id: '1',
      sender: 'scammer',
      message: 'Hello, this is HDFC Bank verification. We need your bank details to activate KYC.',
      timestamp: new Date(Date.now() - 12 * 60000),
      threatLevel: 'high',
    },
    {
      id: '2',
      sender: 'ai_agent',
      message: 'I already completed my KYC with the bank. Can you provide the official request reference?',
      timestamp: new Date(Date.now() - 11 * 60000),
    },
    {
      id: '3',
      sender: 'scammer',
      message: 'Reference: KYC-789456. Send your Aadhar number and account PIN immediately or account will be suspended.',
      timestamp: new Date(Date.now() - 10 * 60000),
      threatLevel: 'high',
    },
    {
      id: '4',
      sender: 'ai_agent',
      message: 'The bank never asks for PIN via SMS. This appears to be fraudulent.',
      timestamp: new Date(Date.now() - 9 * 60000),
    },
    {
      id: '5',
      sender: 'scammer',
      message: 'You have 24 hours before suspension. This is urgent!',
      timestamp: new Date(Date.now() - 8 * 60000),
      threatLevel: 'high',
    },
  ],
  'SES-20240128-003': [
    {
      id: '1',
      sender: 'scammer',
      message: 'Congratulations! You have won a prize worth ₹50,000. Click here to claim: https://prize-claim.xyz',
      timestamp: new Date(Date.now() - 8 * 60000),
      threatLevel: 'medium',
    },
    {
      id: '2',
      sender: 'ai_agent',
      message: 'I do not recall entering any contest. What is this about?',
      timestamp: new Date(Date.now() - 7 * 60000),
    },
    {
      id: '3',
      sender: 'scammer',
      message: 'You were selected randomly. Verify your email and credit card to collect prize.',
      timestamp: new Date(Date.now() - 6 * 60000),
      threatLevel: 'high',
    },
    {
      id: '4',
      sender: 'ai_agent',
      message: 'This is a phishing attempt. No legitimate prize requires credit card information.',
      timestamp: new Date(Date.now() - 5 * 60000),
    },
  ],
  'SES-20240128-004': [
    {
      id: '1',
      sender: 'scammer',
      message: 'Hi! Congratulations, you have been selected for a job position. Monthly salary ₹5,00,000.',
      timestamp: new Date(Date.now() - 6 * 60000),
      threatLevel: 'medium',
    },
    {
      id: '2',
      sender: 'ai_agent',
      message: 'That sounds too good to be true. Can you tell me more about the company and role?',
      timestamp: new Date(Date.now() - 5 * 60000),
    },
    {
      id: '3',
      sender: 'scammer',
      message: 'Send ₹5,000 processing fee to activate your account. Bank details: AC-9876543210',
      timestamp: new Date(Date.now() - 4 * 60000),
      threatLevel: 'high',
    },
    {
      id: '4',
      sender: 'ai_agent',
      message: 'Legitimate jobs do not charge processing fees upfront. This is a job scam.',
      timestamp: new Date(Date.now() - 3 * 60000),
    },
  ],
};

export default function ConversationViewer({ sessionId }: ConversationViewerProps) {
  const mockConversation = sessionId && sessionConversations[sessionId] ? sessionConversations[sessionId] : [];

  if (!sessionId) {
    return (
      <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm p-6 text-center">
        <p className="text-muted-foreground">Select a threat session to view conversation details</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm">
      <div className="max-h-[500px] overflow-y-auto space-y-4 p-6">
        {mockConversation.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'scammer' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-xs rounded-lg px-4 py-3 ${
                msg.sender === 'scammer'
                  ? 'bg-red-950/30 border border-red-900/50 text-red-100'
                  : 'bg-blue-950/30 border border-blue-900/50 text-blue-100'
              }`}
            >
              <div className="flex items-start gap-2">
                {msg.threatLevel && (
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                )}
                <div className="flex-1">
                  <p className="break-words text-sm">{msg.message}</p>
                  <p className="mt-1 text-xs opacity-70">
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
