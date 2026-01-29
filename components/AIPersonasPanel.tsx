'use client';

import { Bot, Users, ChevronRight } from 'lucide-react';

interface Persona {
  id: string;
  name: string;
  style: string;
  activeSessions: number;
  status: 'active' | 'idle';
}

interface AIPersonasPanelProps {
  onPersonaClick?: (personaId: string) => void;
}

const personas: Persona[] = [
  {
    id: '1',
    name: 'Elderly User',
    style: 'Vulnerable, needing guidance',
    activeSessions: 8,
    status: 'active',
  },
  {
    id: '2',
    name: 'Tech Beginner',
    style: 'Curious, easily confused',
    activeSessions: 6,
    status: 'active',
  },
  {
    id: '3',
    name: 'Busy Professional',
    style: 'Time-pressed, impatient',
    activeSessions: 5,
    status: 'active',
  },
  {
    id: '4',
    name: 'Skeptical User',
    style: 'Questioning, vigilant',
    activeSessions: 3,
    status: 'idle',
  },
];

export default function AIPersonasPanel({ onPersonaClick }: AIPersonasPanelProps) {
  return (
    <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
      <div className="mb-6 flex items-center gap-3">
        <Bot className="h-6 w-6 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Multi-Persona AI System</h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {personas.map((persona) => (
          <button
            key={persona.id}
            onClick={() => onPersonaClick?.(persona.id)}
            className="rounded-lg border border-border/50 bg-muted/20 p-4 transition-all hover:border-primary/50 hover:bg-muted/40 hover:shadow-lg cursor-pointer text-left"
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex-1">
                <p className="font-semibold text-foreground">{persona.name}</p>
                <p className="text-sm text-muted-foreground">{persona.style}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${persona.status === 'active' ? 'bg-green-500 pulsing-status' : 'bg-gray-500'}`} />
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-medium text-foreground">{persona.activeSessions} active</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
