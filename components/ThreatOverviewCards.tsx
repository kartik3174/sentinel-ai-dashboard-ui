import { BarChart3, Zap, AlertTriangle, Shield, Activity } from 'lucide-react';

const cards = [
  {
    title: 'Active Scam Engagements',
    value: '24',
    icon: Activity,
    color: 'text-cyan-400',
    glow: 'glow-cyan',
  },
  {
    title: 'Total Messages Analyzed',
    value: '12,847',
    icon: Zap,
    color: 'text-green-400',
    glow: 'glow-green',
  },
  {
    title: 'Threat Indicators Captured',
    value: '1,293',
    icon: AlertTriangle,
    color: 'text-orange-400',
    glow: 'threat-medium',
  },
  {
    title: 'Phishing Links Detected',
    value: '487',
    icon: Shield,
    color: 'text-red-400',
    glow: 'threat-high',
  },
];

export default function ThreatOverviewCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className={`rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:bg-card/80 ${card.glow}`}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">{card.title}</h3>
              <Icon className={`h-5 w-5 ${card.color}`} />
            </div>
            <div className="text-3xl font-bold text-foreground">{card.value}</div>
          </div>
        );
      })}
    </div>
  );
}
