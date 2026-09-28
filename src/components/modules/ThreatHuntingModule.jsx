import React, { useState } from 'react';
import { useSOC } from '../../context/SOCContext';
import { THREAT_HUNTING_DATA } from '../../data/mockData';
import {
  Crosshair,
  Search,
  Terminal,
  ShieldAlert,
  Flame,
  FileCode2,
  Database,
  Globe,
  Hash,
  User,
  Cpu,
  Layers,
  CheckCircle2,
  ExternalLink,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { triggerConfetti, downloadMockFile } from '../../utils/cyberEffects';

export default function ThreatHuntingModule() {
  const { addToast, endpoints, setSelectedEndpoint, setActiveModule } = useSOC();

  const [activeCategory, setActiveCategory] = useState('All');
  const [huntQuery, setHuntQuery] = useState('');
  const [customKqlQuery, setCustomKqlQuery] = useState(
    'process.name: "powershell.exe" AND process.command_line: (*-enc* OR *IEX*)'
  );
  const [isExecutingQuery, setIsExecutingQuery] = useState(false);

  // Filtered IOC Matches
  const filteredIocs = THREAT_HUNTING_DATA.iocMatches.filter((ioc) => {
    const matchesCategory =
      activeCategory === 'All' ||
      (activeCategory === 'IP' && ioc.type.includes('IP')) ||
      (activeCategory === 'Domain' && ioc.type.includes('Domain')) ||
      (activeCategory === 'Hash' && ioc.type.includes('Hash')) ||
      (activeCategory === 'Driver' && ioc.type.includes('Driver'));

    const matchesSearch =
      ioc.value.toLowerCase().includes(huntQuery.toLowerCase()) ||
      ioc.threat.toLowerCase().includes(huntQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleExecuteKql = () => {
    setIsExecutingQuery(true);
    addToast('Executing Fleet Hunt', `Broadcasting query [${customKqlQuery}] across 532 EDR agents...`, 'info');
    setTimeout(() => {
      setIsExecutingQuery(false);
      triggerConfetti();
      addToast('Hunt Completed', 'Query matched 2 endpoints: PC-101 (PID 4812) and SRV-FIN-04.', 'success');
    }, 1800);
  };

  const handlePivotToHost = (hostname) => {
    const target = endpoints.find((e) => e.hostname === hostname) || endpoints[0];
    setSelectedEndpoint(target);
    setActiveModule('endpoints');
    addToast('Host Pivoted', `Switched to deep dive for ${target.hostname}`, 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl glass-panel-glow border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-[#0b1424]/90 to-purple-950/40">
        <div>
          <div className="flex items-center gap-2">
            <Crosshair className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold font-cyber tracking-wide text-white">
              CYBER THREAT HUNTING &amp; INTELLIGENCE ENGINE
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Correlated indicator search, YARA signature engine &amp; Sigma rule behavioral queries across 532 fleet nodes
          </p>
        </div>

        <button
          onClick={() => {
            downloadMockFile('JOCKY_Threat_Intel_Bundle.json', JSON.stringify(THREAT_HUNTING_DATA, null, 2));
            addToast('Intel Bundle Saved', 'YARA, Sigma, and IOC feeds exported.', 'success');
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-xs font-mono transition-colors"
        >
          <Database className="w-3.5 h-3.5" />
          Export Threat Intel Feed
        </button>
      </div>

      {/* Required Search Interface: IP, Domain, Hash, Username, Process, Driver */}
      <div className="p-4 rounded-2xl glass-panel border-cyan-500/20 space-y-4">
        {/* Category Filter Pills */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-mono text-slate-400 font-semibold mr-1">Search By:</span>
            {[
              { id: 'All', label: 'All Indicators', icon: Search },
              { id: 'IP', label: 'IP Address', icon: Globe },
              { id: 'Domain', label: 'Domain', icon: Globe },
              { id: 'Hash', label: 'Hash (SHA256/MD5)', icon: Hash },
              { id: 'Username', label: 'Username', icon: User },
              { id: 'Process', label: 'Process', icon: Terminal },
              { id: 'Driver', label: 'Driver', icon: Cpu },
            ].map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (cat.id === 'IP') setHuntQuery('104.26.2.33');
                    else if (cat.id === 'Domain') setHuntQuery('update-microsoft-cloud.net');
                    else if (cat.id === 'Hash') setHuntQuery('e3b0c442');
                    else if (cat.id === 'Username') setHuntQuery('vikram.admin');
                    else if (cat.id === 'Process') setHuntQuery('powershell.exe');
                    else if (cat.id === 'Driver') setHuntQuery('RTCore64.sys');
                    else setHuntQuery('');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    activeCategory === cat.id
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Hits: <strong className="text-cyan-300">{filteredIocs.length}</strong> IOC Matches
          </div>
        </div>

        {/* Dynamic Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={huntQuery}
            onChange={(e) => setHuntQuery(e.target.value)}
            placeholder="Enter search target (e.g. 104.26.2.33, update-microsoft-cloud.net, RTCore64.sys, powershell.exe)..."
            className="w-full bg-slate-900/90 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-white placeholder-slate-500 border border-slate-700/60 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Quick Pivot Presets */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-mono text-slate-400">
          <span>Quick Pivots:</span>
          {['104.26.2.33', 'update-microsoft-cloud.net', 'RTCore64.sys', 'powershell.exe', 'vikram.admin'].map((qp) => (
            <button
              key={qp}
              onClick={() => setHuntQuery(qp)}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-950 text-cyan-300 border border-slate-700 hover:border-cyan-500/40 transition-colors"
            >
              {qp}
            </button>
          ))}
        </div>
      </div>

      {/* Row 2: Dynamic Search Results Table & Custom KQL Query Runner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dynamic IOC Matches Table */}
        <div className="lg:col-span-2 p-5 rounded-2xl glass-panel border-cyan-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <h2 className="text-sm font-bold text-white font-cyber uppercase tracking-wider">
                Correlated Indicator (IOC) Matches
              </h2>
            </div>
            <span className="text-[10px] font-mono text-cyan-400">AlienVault OTX &amp; MISP</span>
          </div>

          <div className="space-y-2.5">
            {filteredIocs.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center font-mono">No matching IOCs for current filter.</p>
            ) : (
              filteredIocs.map((ioc, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all font-mono text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-bold text-[10px]">
                        {ioc.type}
                      </span>
                      <span className="font-bold text-white max-w-sm truncate">{ioc.value}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/40 font-bold uppercase">
                        {ioc.status}
                      </span>
                      <span className="text-[10px] text-purple-300 font-bold">
                        {ioc.confidence}% Conf.
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                    <div>
                      Threat: <strong className="text-slate-200">{ioc.threat}</strong> • Source: {ioc.source}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400">{ioc.hits} Fleet Hits</span>
                      <button
                        onClick={() => handlePivotToHost('PC-101')}
                        className="px-2 py-0.5 rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-[10px] font-semibold transition-colors"
                      >
                        Pivot to PC-101
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Custom Query Console (KQL / Sigma / Lucene) */}
        <div className="p-5 rounded-2xl glass-panel-glow border-purple-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-purple-400" />
                <h2 className="text-sm font-bold text-white font-cyber uppercase tracking-wider">
                  Threat Query Console
                </h2>
              </div>
              <span className="text-[10px] font-mono text-purple-300">KQL / Sigma</span>
            </div>
            <p className="text-xs text-slate-400 font-mono mb-3">
              Execute live behavioral threat hunting queries across 532 EDR sensors
            </p>

            {/* Query TextArea */}
            <div className="relative">
              <textarea
                rows={4}
                value={customKqlQuery}
                onChange={(e) => setCustomKqlQuery(e.target.value)}
                className="w-full bg-slate-950/90 rounded-xl p-3 text-xs font-mono text-emerald-400 border border-slate-700/60 focus:outline-none focus:border-purple-400 leading-relaxed resize-none"
              />
            </div>

            {/* Query Helper Presets */}
            <div className="mt-3 space-y-1.5 text-[11px] font-mono">
              <span className="text-slate-400 block text-[10px]">Quick Query Presets:</span>
              <button
                onClick={() => setCustomKqlQuery('process.name: "rundll32.exe" AND process.command_line: *comsvcs.dll*#24*')}
                className="w-full text-left p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors truncate block"
              >
                1. Detect LSASS Dump via comsvcs.dll
              </button>
              <button
                onClick={() => setCustomKqlQuery('driver.name: (*RTCore64.sys* OR *gdrv.sys*) AND action: "load"')}
                className="w-full text-left p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors truncate block"
              >
                2. BYOVD Vulnerable Driver Load
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800">
            <button
              onClick={handleExecuteKql}
              disabled={isExecutingQuery}
              className="w-full py-2.5 rounded-xl bg-purple-950 hover:bg-purple-900 text-purple-200 border border-purple-500/50 text-xs font-mono font-bold transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2"
            >
              <Play className={`w-3.5 h-3.5 text-purple-300 ${isExecutingQuery ? 'animate-spin' : ''}`} />
              {isExecutingQuery ? 'Scanning 532 Nodes...' : 'Execute Fleet Hunt'}
            </button>
          </div>
        </div>
      </div>

      {/* Row 3: Threat Intelligence Panel (YARA Matches & Sigma Rule Matches) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* YARA Matches Panel */}
        <div className="p-5 rounded-2xl glass-panel border-cyan-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileCode2 className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold text-white font-cyber uppercase tracking-wider">
                YARA Signature Matches
              </h2>
            </div>
            <span className="text-[10px] font-mono text-cyan-400">NTRO Signature Engine</span>
          </div>

          <div className="space-y-3">
            {THREAT_HUNTING_DATA.yaraRules.map((yara, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-all font-mono text-xs"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white font-bold">{yara.ruleName}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/40 font-bold uppercase">
                    {yara.severity} ({yara.matches} Hits)
                  </span>
                </div>
                <p className="text-slate-300 mb-2">{yara.description}</p>
                <div className="p-2 rounded bg-black/50 border border-slate-800 text-[10px] text-cyan-300">
                  Matched On: {yara.matchedOn.join(' • ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sigma Rule Matches Panel */}
        <div className="p-5 rounded-2xl glass-panel border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              <h2 className="text-sm font-bold text-white font-cyber uppercase tracking-wider">
                Sigma Behavioral Rule Matches
              </h2>
            </div>
            <span className="text-[10px] font-mono text-purple-400">SigmaHQ Detection</span>
          </div>

          <div className="space-y-3">
            {THREAT_HUNTING_DATA.sigmaRules.map((sigma, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/30 transition-all font-mono text-xs"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white font-bold">{sigma.id} • {sigma.tactic}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40 font-bold">
                    {sigma.matches} Detections
                  </span>
                </div>
                <p className="text-slate-200 mb-2 font-medium">{sigma.title}</p>
                <div className="p-2 rounded bg-black/50 border border-slate-800 text-[10px] text-emerald-400 truncate">
                  Query: {sigma.query}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
