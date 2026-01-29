'use client';

import { Bell, Settings, Shield, LogOut, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface NavigationProps {
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
}

export default function Navigation({ onNotificationsClick, onProfileClick }: NavigationProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
    onProfileClick?.();
  };

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm relative z-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="glow-blue rounded-lg bg-card p-2">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold text-foreground">SentinelAI Defense Console</span>
        </div>

        {/* Center Status */}
        <div className="flex items-center gap-2 rounded-full bg-muted/30 px-4 py-2">
          <div className="pulsing-status h-2 w-2 rounded-full bg-green-500" />
          <span className="text-sm font-semibold text-green-400">AI Agents Active</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onNotificationsClick}
            className="relative rounded-lg p-2 transition-colors hover:bg-muted/50"
            title="Notifications"
          >
            <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </button>
          
          <Link href="/settings">
            <button 
              className="rounded-lg p-2 transition-colors hover:bg-muted/50"
              title="Settings"
            >
              <Settings className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </button>
          </Link>

          <div className="relative z-50" ref={profileMenuRef}>
            <button
              onClick={handleProfileClick}
              className="rounded-lg transition-all hover:bg-muted/50"
              title="Profile"
            >
              <Avatar className="h-9 w-9 border border-primary/30 glow-blue cursor-pointer">
                <AvatarFallback className="bg-primary/20 text-primary font-bold">SA</AvatarFallback>
              </Avatar>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card p-2 shadow-lg">
                <div className="px-3 py-2 border-b border-border mb-2">
                  <p className="text-sm font-semibold text-foreground">Admin Account</p>
                  <p className="text-xs text-muted-foreground">sentinel@defense.ai</p>
                </div>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted/50 rounded transition-colors">
                  <User className="h-4 w-4" />
                  My Profile
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded transition-colors">
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
