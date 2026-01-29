'use client';

import { useState } from 'react';
import { ChevronLeft, Bell, Lock, Database, Shield, Users, LogOut } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general');
  const [threatSensitivity, setThreatSensitivity] = useState('Medium (Balanced)');
  const [dataRetention, setDataRetention] = useState('90 Days');

  const settingsSections = [
    { id: 'general', label: 'General Settings', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security & Access', icon: Lock },
    { id: 'database', label: 'Database & Logs', icon: Database },
    { id: 'users', label: 'User Management', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Button variant="outline" size="icon" className="border-primary/30 text-primary hover:bg-primary/10 bg-transparent">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">System Settings</h1>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="space-y-2 rounded-lg border border-border bg-card/50 p-4 backdrop-blur-sm">
              {settingsSections.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-all ${
                    activeSection === id
                      ? 'bg-primary/20 border border-primary/30 text-primary'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {activeSection === 'general' && (
              <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm glow-blue space-y-6">
                <h2 className="text-xl font-bold">General Settings</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">System Name</label>
                    <input
                      type="text"
                      defaultValue="SentinelAI Defense Console"
                      className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Threat Detection Sensitivity</label>
                    <select 
                      value={threatSensitivity}
                      onChange={(e) => setThreatSensitivity(e.target.value)}
                      className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option>High (Strict)</option>
                      <option>Medium (Balanced)</option>
                      <option>Low (Permissive)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Auto-Archive Sessions After (hours)</label>
                    <input
                      type="number"
                      defaultValue="24"
                      className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/20 p-4">
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                    <label className="text-sm font-medium text-foreground">Enable Real-time Threat Alerts</label>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/20 p-4">
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                    <label className="text-sm font-medium text-foreground">Enable AI Agent Learning Optimization</label>
                  </div>
                </div>

                <Button className="bg-primary text-primary-foreground hover:bg-primary/80">Save Settings</Button>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm glow-green space-y-6">
                <h2 className="text-xl font-bold">Notification Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/20 p-4">
                    <div>
                      <p className="font-medium text-foreground">High-Risk Threat Alerts</p>
                      <p className="text-sm text-muted-foreground">Notify when threat risk exceeds 80%</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-5 w-5" />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/20 p-4">
                    <div>
                      <p className="font-medium text-foreground">New Intelligence Extracted</p>
                      <p className="text-sm text-muted-foreground">Notify when new threat indicators are captured</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-5 w-5" />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/20 p-4">
                    <div>
                      <p className="font-medium text-foreground">AI Agent Status Changes</p>
                      <p className="text-sm text-muted-foreground">Notify when agent status or learning improves</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-5 w-5" />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/20 p-4">
                    <div>
                      <p className="font-medium text-foreground">Daily Summary Report</p>
                      <p className="text-sm text-muted-foreground">Receive daily threat summary at 08:00 AM</p>
                    </div>
                    <input type="checkbox" className="h-5 w-5" />
                  </div>
                </div>

                <Button className="bg-primary text-primary-foreground hover:bg-primary/80">Save Preferences</Button>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm glow-cyan space-y-6">
                <h2 className="text-xl font-bold">Security & Access</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Session Timeout (minutes)</label>
                    <input
                      type="number"
                      defaultValue="30"
                      className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/20 p-4">
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                    <label className="text-sm font-medium text-foreground">Require Two-Factor Authentication</label>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/20 p-4">
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                    <label className="text-sm font-medium text-foreground">Enable IP Whitelist</label>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/20 p-4">
                    <input type="checkbox" className="h-4 w-4" />
                    <label className="text-sm font-medium text-foreground">Enable Audit Logging</label>
                  </div>

                  <div className="rounded-lg border border-red-900/30 bg-red-950/20 p-4">
                    <h3 className="font-semibold text-red-400 mb-3">Danger Zone</h3>
                    <Button variant="outline" className="border-red-900/50 text-red-400 hover:bg-red-950/50 bg-transparent">
                      <LogOut className="mr-2 h-4 w-4" />
                      Force Logout All Sessions
                    </Button>
                  </div>
                </div>

                <Button className="bg-primary text-primary-foreground hover:bg-primary/80">Save Changes</Button>
              </div>
            )}

            {activeSection === 'database' && (
              <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm glow-blue space-y-6">
                <h2 className="text-xl font-bold">Database & Logs</h2>
                
                <div className="space-y-4">
                  <div className="rounded-lg border border-border/50 bg-muted/20 p-4">
                    <p className="font-medium text-foreground">Database Status</p>
                    <p className="text-sm text-green-400 mt-1">Connected - PostgreSQL v14.2</p>
                  </div>

                  <div className="rounded-lg border border-border/50 bg-muted/20 p-4">
                    <p className="font-medium text-foreground">Data Retention Policy</p>
                    <select 
                      value={dataRetention}
                      onChange={(e) => setDataRetention(e.target.value)}
                      className="w-full mt-2 rounded-lg border border-border bg-muted/30 px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option>30 Days</option>
                      <option>90 Days</option>
                      <option>1 Year</option>
                      <option>Unlimited</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/20 p-4">
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                    <label className="text-sm font-medium text-foreground">Automatic Daily Backup at 02:00 AM</label>
                  </div>

                  <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted/50 bg-transparent">
                    Export Session Data
                  </Button>
                </div>

                <Button className="bg-primary text-primary-foreground hover:bg-primary/80">Save Database Settings</Button>
              </div>
            )}

            {activeSection === 'users' && (
              <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm glow-green space-y-6">
                <h2 className="text-xl font-bold">User Management</h2>
                
                <div className="space-y-4">
                  <Button className="w-full border-primary/30 text-primary hover:bg-primary/10 bg-transparent border" variant="outline">
                    Invite New Admin User
                  </Button>

                  <div className="rounded-lg border border-border/50 bg-muted/20 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">sentinel@defense.ai</p>
                        <p className="text-sm text-muted-foreground">Admin - System Owner</p>
                      </div>
                      <span className="text-xs font-semibold rounded-full bg-green-500/20 text-green-400 px-3 py-1">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
