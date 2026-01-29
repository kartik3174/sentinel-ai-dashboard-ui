'use client';

import { Zap, Clock } from 'lucide-react';

export default function HumanSimulationIndicator() {
  return (
    <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-500/20">
          <Zap className="h-5 w-5 text-green-400" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-green-300">Human-Like Response Simulation Enabled</p>
          <div className="mt-1 flex items-center gap-2">
            <Clock className="h-3 w-3 text-green-400" />
            <p className="text-sm text-green-200/70">Natural response delays (0.5-2s) and realistic typing patterns</p>
          </div>
        </div>
        <div className="h-2 w-2 rounded-full bg-green-400 pulsing-status" />
      </div>
    </div>
  );
}
