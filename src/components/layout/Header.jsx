import React, { useState, useEffect } from 'react';
import { useSOC } from '../../context/SOCContext';
import {
  Shield,
  Radio,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Zap,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  UserCheck,
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

export default function Header() {
  const {
    theme,
    toggleTheme,
    soundEnabled,
    toggleSound,
    simulationActive,
    toggleSimulation,
    triggerAttackSurge,
    metrics,
    alerts,
    remediateAlert,
    setActiveModule,
    setQuickSearchOpen,
  } = useSOC();

  const [time, setTime] = useState(new Date());
  const [alertsDropdownOpen, setAlertsDropdownOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedUtc = time.toISOString().substring(11, 19) + ' UTC';
  const formattedIst = time.toLocaleTimeString('en-IN', { hour12: false }) + ' IST';

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-cyan-500/20 bg-[#070b14]/90 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 lg:px-6 h-16 gap-3">
        {/* Left: Brand & DEFCON */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-purple-600/30 to-blue-600/20 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.35)]">
            <Shield className="w-5 h-5 text-cyan-400" />
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-cyan-400 via-purple-300 to-blue-400 bg-clip-text text-transparent font-cyber">
                JOCKY
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] uppercase tracking-widest font-mono font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 rounded">
                NTRO SOC v4.2
              </span>
            </div>
            <p className="hidden md:block text-[10px] text-slate-400 font-mono tracking-tight">
              Enterprise Digital Forensics &amp; Threat Intelligence
            </p>
          </div>

          {/* DEFCON Status */}
          <div className="hidden xl:flex items-center gap-2 ml-3 px-2.5 py-1 rounded-full bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>{metrics.socStatus}</span>
          </div>
        </div>

        {/* Center: Live Ticking Clocks */}
        <div className="hidden lg:flex items-center gap-4 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-1.5 text-cyan-300">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>{formattedIst}</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">{formattedUtc}</span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Search */}
          <button
            onClick={() => setQuickSearchOpen(true)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 text-xs font-mono transition-all hover:border-cyan-500/40"
            title="Search hosts, IPs, incidents (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden md:inline px-1 py-0.2 text-[10px] bg-slate-800 border border-slate-700 rounded text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Attack Surge Simulator Button */}
          <button
            onClick={triggerAttackSurge}
            className="group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 border border-red-500/50 text-red-200 text-xs font-mono font-semibold transition-all hover:shadow-[0_0_12px_rgba(239,68,68,0.4)]"
            title="Inject simulated threat wave for presentation demo"
          >
            <Zap className="w-3.5 h-3.5 text-red-400 animate-bounce" />
            <span className="hidden sm:inline">Simulate Threat Surge</span>
          </button>

          {/* 5-sec Simulation Toggle */}
          <button
            onClick={toggleSimulation}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all ${
              simulationActive
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
            }`}
            title="Toggle live telemetry simulation (5s updates)"
          >
            {simulationActive ? (
              <>
                <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                <span className="hidden sm:inline">Live 5s</span>
              </>
            ) : (
              <>
                <Pause className="w-3 h-3 text-amber-400" />
                <span className="hidden sm:inline">Paused</span>
              </>
            )}
          </button>

          {/* Sound Mute/Unmute */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
            title={soundEnabled ? 'Mute SOC Audio FX' : 'Enable SOC Audio FX'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
            title="Toggle Dark SOC / Light Mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </button>

          {/* Alerts Bell with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setAlertsDropdownOpen(!alertsDropdownOpen)}
              className="relative p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
              title="Critical Alerts Feed"
            >
              <Bell className="w-4 h-4 text-slate-300" />
              {alerts.length > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-600 text-[10px] font-bold text-white font-mono animate-pulse">
                  {alerts.length}
                </span>
              )}
            </button>

            {/* Dropdown Menu */}
            {alertsDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl glass-panel-glow bg-[#0b101c]/95 border border-cyan-500/30 p-3 shadow-2xl z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                    <span className="text-xs font-semibold text-slate-100 uppercase tracking-wider font-mono">
                      Active Critical Alerts ({alerts.length})
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setAlertsDropdownOpen(false);
                      setActiveModule('dashboard');
                    }}
                    className="text-[10px] text-cyan-400 hover:underline font-mono"
                  >
                    View All
                  </button>
                </div>

                <div className="mt-2 space-y-2 max-h-72 overflow-y-auto pr-1">
                  {alerts.length === 0 ? (
                    <p className="text-xs text-slate-400 py-4 text-center">No active critical alerts.</p>
                  ) : (
                    alerts.slice(0, 5).map((alert) => (
                      <div
                        key={alert.id}
                        className="p-2.5 rounded-lg bg-slate-900/80 border border-red-500/20 hover:border-red-500/40 transition-all text-xs"
                      >
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-mono font-bold text-red-400">{alert.id}</span>
                          <span className="font-mono text-slate-400">{alert.timestamp}</span>
                        </div>
                        <p className="font-medium text-slate-200 line-clamp-1">{alert.title}</p>
                        <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-800 text-[10px] text-slate-400 font-mono">
                          <span>Target: <strong className="text-cyan-300">{alert.host}</strong></span>
                          <button
                            onClick={() => remediateAlert(alert.id)}
                            className="px-2 py-0.5 rounded bg-red-950 text-red-300 hover:bg-red-900 transition-colors"
                          >
                            Drop / Remediate
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Badge */}
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold border border-cyan-400/40">
              RS
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                Rahul Shah
                <UserCheck className="w-3 h-3 text-cyan-400" />
              </div>
              <div className="text-[10px] text-cyan-400 font-mono">Lead SOC / NTRO</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
