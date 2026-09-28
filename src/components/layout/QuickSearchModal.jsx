import React, { useState, useEffect } from 'react';
import { useSOC } from '../../context/SOCContext';
import { MODULES_CONFIG } from './Sidebar';
import {
  Search,
  X,
  Laptop,
  ShieldAlert,
  ArrowRight,
  Database,
  Hash,
  Globe,
  Bot,
} from 'lucide-react';

export default function QuickSearchModal() {
  const {
    quickSearchOpen,
    setQuickSearchOpen,
    setActiveModule,
    endpoints,
    incidents,
    setSelectedEndpoint,
    addToast,
  } = useSOC();

  const [query, setQuery] = useState('');

  // Handle Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setQuickSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setQuickSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setQuickSearchOpen]);

  if (!quickSearchOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Search Results
  const matchedModules = cleanQuery
    ? MODULES_CONFIG.filter((m) => m.name.toLowerCase().includes(cleanQuery) || m.label.toLowerCase().includes(cleanQuery))
    : MODULES_CONFIG.slice(0, 4);

  const matchedHosts = cleanQuery
    ? endpoints.filter((ep) => ep.hostname.toLowerCase().includes(cleanQuery) || ep.ip.includes(cleanQuery) || ep.assignedUser.toLowerCase().includes(cleanQuery))
    : endpoints.slice(0, 3);

  const matchedIncidents = cleanQuery
    ? incidents.filter((inc) => inc.id.toLowerCase().includes(cleanQuery) || inc.title.toLowerCase().includes(cleanQuery) || inc.affectedAssets.toLowerCase().includes(cleanQuery))
    : incidents.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl glass-panel-glow bg-[#080d19]/95 border border-cyan-500/40 p-4 shadow-2xl animate-in zoom-in-95">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-slate-800 pb-3">
          <Search className="w-5 h-5 text-cyan-400 absolute left-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Host (PC-101), IP, Incident ID, Hash, or Module..."
            className="w-full bg-slate-900/80 rounded-xl pl-11 pr-10 py-3 text-sm font-mono text-white placeholder-slate-500 border border-slate-700/60 focus:outline-none focus:border-cyan-400 transition-colors"
            autoFocus
          />
          <button
            onClick={() => setQuickSearchOpen(false)}
            className="absolute right-3 p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="mt-3 space-y-4 max-h-96 overflow-y-auto pr-1">
          {/* Modules */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5 px-1">
              Modules &amp; Interfaces
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {matchedModules.map((mod) => {
                const Icon = mod.icon;
                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      setActiveModule(mod.id);
                      setQuickSearchOpen(false);
                      addToast('Navigated', `Switched to ${mod.name}`, 'info');
                    }}
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-cyan-400" />
                      <div>
                        <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300">
                          {mod.name}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">{mod.label}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-transform group-hover:translate-x-0.5" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Endpoints */}
          {matchedHosts.length > 0 && (
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5 px-1">
                Endpoints &amp; Forensics Nodes
              </div>
              <div className="space-y-1.5">
                {matchedHosts.map((host) => (
                  <button
                    key={host.hostname}
                    onClick={() => {
                      setSelectedEndpoint(host);
                      setActiveModule('endpoints');
                      setQuickSearchOpen(false);
                      addToast('Forensics Dossier', `Opened deep dive for ${host.hostname}`, 'info');
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 text-left transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Laptop className="w-4 h-4 text-cyan-400" />
                      <div>
                        <div className="text-xs font-bold text-slate-200 font-mono flex items-center gap-2">
                          {host.hostname}
                          <span className="text-[10px] text-slate-400 font-normal">{host.ip}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {host.os} • User: {host.assignedUser}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          host.status === 'Compromised'
                            ? 'bg-red-950 text-red-300 border border-red-500/40'
                            : host.status === 'Suspicious'
                            ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        }`}
                      >
                        Risk {host.riskScore}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Incidents */}
          {matchedIncidents.length > 0 && (
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5 px-1">
                Active Incidents
              </div>
              <div className="space-y-1.5">
                {matchedIncidents.map((inc) => (
                  <button
                    key={inc.id}
                    onClick={() => {
                      setActiveModule('incidents');
                      setQuickSearchOpen(false);
                      addToast('Incident Opened', `Displaying case ${inc.id}`, 'info');
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-red-500/40 text-left transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="w-4 h-4 text-red-400" />
                      <div>
                        <div className="text-xs font-bold text-slate-200 font-mono flex items-center gap-2">
                          {inc.id}
                          <span className="text-[10px] text-slate-400 font-normal">Target: {inc.affectedAssets}</span>
                        </div>
                        <div className="text-[10px] text-slate-400">{inc.title}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-500/40 font-bold">
                      {inc.severity}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Tip: Jump directly using arrow keys or click</span>
          <div className="flex items-center gap-2">
            <span>ESC to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
