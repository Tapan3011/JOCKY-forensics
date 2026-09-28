import React, { useState } from 'react';
import { useSOC } from '../../context/SOCContext';
import {
  LayoutDashboard,
  Laptop,
  Cpu,
  Network,
  Crosshair,
  Bot,
  GitCommit,
  ShieldAlert,
  Grid,
  Archive,
  BarChart3,
  Sliders,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Activity,
  Layers,
} from 'lucide-react';

export const MODULES_CONFIG = [
  { id: 'dashboard', name: 'Executive Dashboard', label: 'SOC Overview', icon: LayoutDashboard, badge: 'LIVE' },
  { id: 'endpoints', name: 'Endpoint Forensics', label: '532 Nodes', icon: Laptop, badge: '17 Threat' },
  { id: 'memory', name: 'Memory Forensic Center', label: 'RAM Analysis', icon: Cpu, badge: 'VAD Tree' },
  { id: 'network', name: 'Network Forensics', label: 'Topology & Maps', icon: Network, badge: 'Live Pkts' },
  { id: 'hunting', name: 'Threat Hunting', label: 'IOC & YARA', icon: Crosshair, badge: 'Sigma' },
  { id: 'ai', name: 'AI Investigator', label: 'JOCKY AI Assist', icon: Bot, badge: 'AI-LLM' },
  { id: 'timeline', name: 'Attack Timeline', label: 'Kill Chain Flow', icon: GitCommit, badge: 'Reconstruct' },
  { id: 'incidents', name: 'Incident Management', label: 'Case Management', icon: ShieldAlert, badge: '5 Open' },
  { id: 'mitre', name: 'MITRE ATT&CK Matrix', label: '10 Tactics', icon: Grid, badge: 'Heatmap' },
  { id: 'evidence', name: 'Evidence Repository', label: 'Chain of Custody', icon: Archive, badge: 'HMAC' },
  { id: 'analytics', name: 'Analytics Center', label: 'Telemetry & Graphs', icon: BarChart3, badge: 'Deep Data' },
  { id: 'settings', name: 'Platform Settings', label: 'RBAC & Agents', icon: Sliders, badge: 'Admin' },
];

export default function Sidebar() {
  const { activeModule, setActiveModule, metrics } = useSOC();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`relative z-30 transition-all duration-300 ease-in-out shrink-0 glass-panel border-r border-cyan-500/15 bg-[#060911]/95 flex flex-col justify-between ${
        collapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* Top Header / Collapser */}
      <div className="p-3 border-b border-slate-800/80 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2 px-1">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-slate-300 tracking-wider uppercase font-mono">
              Operations Center
            </span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors ${
            collapsed ? 'mx-auto' : ''
          }`}
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Modules List */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {MODULES_CONFIG.map((mod) => {
          const Icon = mod.icon;
          const isActive = activeModule === mod.id;

          return (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              className={`w-full group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-950/80 via-purple-950/40 to-slate-900 border border-cyan-500/50 text-white shadow-[0_0_15px_rgba(6,182,212,0.25)] font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
              }`}
              title={collapsed ? mod.name : undefined}
            >
              {/* Active vertical pill indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              )}

              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' : 'text-slate-500 group-hover:text-slate-300'
                }`}
              />

              {!collapsed && (
                <div className="flex-1 flex items-center justify-between min-w-0">
                  <div className="truncate">
                    <div className="text-xs font-medium tracking-tight truncate leading-tight">
                      {mod.name}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono truncate">
                      {mod.label}
                    </div>
                  </div>

                  {mod.badge && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider shrink-0 ml-1 ${
                        isActive
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                      }`}
                    >
                      {mod.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Health & Compliance Card */}
      {!collapsed && (
        <div className="p-3 border-t border-slate-800/80 bg-[#070b13]/80">
          <div className="p-2.5 rounded-xl bg-slate-900/70 border border-cyan-500/20">
            <div className="flex items-center justify-between mb-1.5 text-[11px] font-mono">
              <span className="text-slate-400 flex items-center gap-1">
                <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
                Fleet Health
              </span>
              <span className="text-cyan-400 font-bold">94.8%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-purple-500 rounded-full"
                style={{ width: '94.8%' }}
              />
            </div>
            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-800 text-[10px] text-slate-400 font-mono">
              <span>Nodes: {metrics.activeSystems}/{metrics.totalEndpoints}</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                <ShieldCheck className="w-3 h-3" /> CERT-In
              </span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
