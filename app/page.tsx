'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Zap, Target } from 'lucide-react';
import Navigation from '@/components/Navigation';
import ThreatOverviewCards from '@/components/ThreatOverviewCards';
import LiveThreatsPanel from '@/components/LiveThreatsPanel';
import ConversationViewer from '@/components/ConversationViewer';
import ThreatIntelligencePanel from '@/components/ThreatIntelligencePanel';
import AnalyticsSection from '@/components/AnalyticsSection';
import AIPersonasPanel from '@/components/AIPersonasPanel';
import KnownThreatDatabase from '@/components/KnownThreatDatabase';
import ThreatRelationshipGraph from '@/components/ThreatRelationshipGraph';
import ScammerBehaviorAnalytics from '@/components/ScammerBehaviorAnalytics';
import AgentLearningStatus from '@/components/AgentLearningStatus';
import SessionDetailsModal from '@/components/SessionDetailsModal';
import AIPersonaDetailsModal from '@/components/AIPersonaDetailsModal';
import SystemPerformanceMetrics from '@/components/SystemPerformanceMetrics';
import ScamEvolutionTracking from '@/components/ScamEvolutionTracking';

export default function Home() {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [showSessionDetails, setShowSessionDetails] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [showPersonaDetails, setShowPersonaDetails] = useState(false);
  const [showSettings, setShowSettings] = useState(false); // Declare showSettings and setShowSettings

  const handleSelectSession = (sessionId: string) => {
    setSelectedSession(sessionId);
    setShowSessionDetails(true);
  };

  const handlePersonaClick = (personaId: string) => {
    setSelectedPersona(personaId);
    setShowPersonaDetails(true);
  };

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  }; // Declare handleSettingsClick function

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation 
        onNotificationsClick={handleNotificationsClick}
      />
      
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Threat Overview Cards */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-foreground">Threat Overview</h2>
            <ThreatOverviewCards />
          </section>

          {/* Agent Learning Status */}
          <section className="mb-8">
            <AgentLearningStatus />
          </section>

          {/* AI Assistant Tools */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-foreground">AI Assistant Tools</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link href="/threat-assessment">
                <button className="w-full rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card/80 hover:shadow-lg text-left">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary/20 p-3">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">Threat Assessment Assistant</h3>
                      <p className="text-sm text-muted-foreground mt-1">Analyze messages, emails, and chats to detect scams and threats</p>
                    </div>
                  </div>
                </button>
              </Link>
              
              <Link href="/honeypot-agent">
                <button className="w-full rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card/80 hover:shadow-lg text-left">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-cyan-500/20 p-3">
                      <Target className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">Honeypot Engagement Agent</h3>
                      <p className="text-sm text-muted-foreground mt-1">Engage scammers undercover and extract threat intelligence</p>
                    </div>
                  </div>
                </button>
              </Link>
            </div>
          </section>

          {/* AI Personas Panel */}
          <section className="mb-8">
            <AIPersonasPanel onPersonaClick={handlePersonaClick} />
          </section>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Live Threats */}
            <div className="lg:col-span-1">
              <h2 className="mb-4 text-xl font-bold text-foreground">Live Threat Sessions</h2>
              <LiveThreatsPanel 
                onSelectSession={handleSelectSession}
                selectedSession={selectedSession}
              />
            </div>

            {/* Middle/Right Column - Conversation and Intelligence */}
            <div className="lg:col-span-2 space-y-8">
              {selectedSession && (
                <div>
                  <h2 className="mb-4 text-xl font-bold text-foreground">Conversation Intelligence</h2>
                  <ConversationViewer sessionId={selectedSession} />
                </div>
              )}

              <div>
                <h2 className="mb-4 text-xl font-bold text-foreground">Extracted Threat Intelligence</h2>
                <ThreatIntelligencePanel sessionId={selectedSession} />
              </div>

              <div>
                <h2 className="mb-4 text-xl font-bold text-foreground">Engagement Analytics</h2>
                <AnalyticsSection sessionId={selectedSession} />
              </div>
            </div>
          </div>

          {/* Advanced Threat Intelligence Sections */}
          <section className="mt-12 space-y-8">
            <h2 className="text-2xl font-bold text-foreground">Advanced Threat Intelligence</h2>

            {/* Threat Relationship Graph and Known Threat Database */}
            <div className="grid gap-8 lg:grid-cols-2">
              <ThreatRelationshipGraph />
              <KnownThreatDatabase />
            </div>

            {/* Scammer Behavior Analytics */}
            <div>
              <h3 className="mb-4 text-xl font-bold text-foreground">Scammer Behavior Analytics</h3>
              <ScammerBehaviorAnalytics />
            </div>
          </section>

          {/* System Performance Metrics */}
          <section className="mt-12">
            <SystemPerformanceMetrics />
          </section>

          {/* Scam Evolution Tracking */}
          <section className="mt-12">
            <ScamEvolutionTracking />
          </section>
        </div>
      </main>

      {/* Session Details Modal */}
      <SessionDetailsModal
        sessionId={selectedSession}
        isOpen={showSessionDetails}
        onClose={() => setShowSessionDetails(false)}
      />

      {/* AI Persona Details Modal */}
      <AIPersonaDetailsModal
        personaId={selectedPersona}
        isOpen={showPersonaDetails}
        onClose={() => setShowPersonaDetails(false)}
      />

      {/* Notifications Notification */}
      {showNotifications && (
        <div className="fixed bottom-4 right-4 rounded-lg border border-border bg-card p-4 backdrop-blur-sm z-40">
          <p className="text-sm font-semibold text-foreground">3 New Notifications</p>
          <p className="text-xs text-muted-foreground mt-1">High-risk threat detected in Session 5</p>
          <p className="text-xs text-muted-foreground">New intelligence indicators captured</p>
        </div>
      )}
    </div>
  );
}
