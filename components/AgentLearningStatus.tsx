'use client';

import { Brain, Zap } from 'lucide-react';

export default function AgentLearningStatus() {
  return (
    <div className="rounded-lg border border-accent bg-card/50 p-6 backdrop-blur-sm glow-cyan">
      <div className="flex items-start gap-4">
        <div className="mt-1">
          <Brain className="h-8 w-8 text-accent animate-pulse" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">Agent Strategy Optimization</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            AI agents are continuously adapting their engagement patterns based on success metrics and real-time threat intelligence. The system learns from every interaction to improve scammer detection and intelligence extraction.
          </p>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
              <span className="text-sm text-muted-foreground">Learning Model Status</span>
              <span className="text-sm font-semibold text-green-400 flex items-center gap-1">
                <Zap className="h-4 w-4" />
                Active
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
              <span className="text-sm text-muted-foreground">Sessions Analyzed Today</span>
              <span className="text-sm font-semibold text-foreground">127</span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
              <span className="text-sm text-muted-foreground">Strategy Improvements</span>
              <span className="text-sm font-semibold text-cyan-300">+12.4%</span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
              <span className="text-sm text-muted-foreground">Next Optimization</span>
              <span className="text-sm font-semibold text-foreground">in 2h 15m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
