'use client';

import { Network } from 'lucide-react';

interface ThreatNode {
  id: string;
  label: string;
  type: 'UPI' | 'Phone' | 'Domain' | 'Session';
  color: string;
}

interface ThreatConnection {
  from: string;
  to: string;
}

const nodes: ThreatNode[] = [
  { id: '1', label: 'pay2upi@bank', type: 'UPI', color: '#0ea5e9' },
  { id: '2', label: '+91-987-456-3210', type: 'Phone', color: '#8b5cf6' },
  { id: '3', label: 'phish-verify.xyz', type: 'Domain', color: '#ef4444' },
  { id: '4', label: 'SES-20240128-001', type: 'Session', color: '#10b981' },
];

const connections: ThreatConnection[] = [
  { from: '1', to: '2' },
  { from: '2', to: '3' },
  { from: '3', to: '4' },
  { from: '1', to: '4' },
];

export default function ThreatRelationshipGraph() {
  return (
    <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
      <div className="mb-6 flex items-center gap-3">
        <Network className="h-6 w-6 text-secondary" />
        <h3 className="text-lg font-semibold text-foreground">Threat Relationship Graph</h3>
      </div>

      <svg className="w-full" style={{ height: '300px', minHeight: '300px' }} viewBox="0 0 500 300">
        {/* Connections */}
        {connections.map((conn, idx) => {
          const fromNode = nodes.find((n) => n.id === conn.from);
          const toNode = nodes.find((n) => n.id === conn.to);
          if (!fromNode || !toNode) return null;

          const positions: Record<string, [number, number]> = {
            '1': [100, 150],
            '2': [250, 80],
            '3': [250, 220],
            '4': [400, 150],
          };

          const [x1, y1] = positions[fromNode.id] || [0, 0];
          const [x2, y2] = positions[toNode.id] || [0, 0];

          return (
            <line
              key={`conn-${idx}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#1e3a8a"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.6"
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const positions: Record<string, [number, number]> = {
            '1': [100, 150],
            '2': [250, 80],
            '3': [250, 220],
            '4': [400, 150],
          };

          const [x, y] = positions[node.id] || [0, 0];

          return (
            <g key={`node-${node.id}`}>
              <circle
                cx={x}
                cy={y}
                r="30"
                fill={node.color}
                opacity="0.2"
                stroke={node.color}
                strokeWidth="2"
              />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-semibold fill-foreground"
              >
                {node.label.split('-')[0]}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {nodes.map((node) => (
          <div key={`legend-${node.id}`} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: node.color }}
            />
            <span className="text-xs text-muted-foreground">{node.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
