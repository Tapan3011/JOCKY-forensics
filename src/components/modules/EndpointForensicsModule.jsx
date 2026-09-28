import React, { useState } from 'react';
import { useSOC } from '../../context/SOCContext';
import {
  Laptop,
  Search,
  Filter,
  ShieldAlert,
  ShieldCheck,
  Cpu,
  HardDrive,
  Terminal,
  Activity,
  User,
  Radio,
  Download,
  AlertTriangle,
  X,
  FileCode,
  Layers,
  FileSpreadsheet,
  Eye,
  KeyRound,
  Usb,
  Database,
  Globe,
  ScrollText,
} from 'lucide-react';
import { triggerConfetti, downloadMockFile } from '../../utils/cyberEffects';

export default function EndpointForensicsModule() {
  const {
    endpoints,
    selectedEndpoint,
    setSelectedEndpoint,
    isolateEndpoint,
    dumpEndpointMemory,
    addToast,
    setActiveModule,
  } = useSOC();

  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeForensicTab, setActiveForensicTab] = useState('processes');

  // Filtered Endpoints
  const filteredEndpoints = endpoints.filter((ep) => {
    const matchesStatus = statusFilter === 'All' || ep.status === statusFilter || (statusFilter === 'Isolated' && ep.isolationStatus === 'Isolated');
    const matchesSearch =
      ep.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ep.ip.includes(searchTerm) ||
      ep.assignedUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ep.os.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleExportForensicReport = (ep) => {
    const report = {
      platform: 'JOCKY Enterprise Forensics',
      classification: 'NTRO SOC CONFIDENTIAL',
      target: ep.hostname,
      ip: ep.ip,
      os: ep.os,
      riskScore: ep.riskScore,
      isolationStatus: ep.isolationStatus,
      forensics: ep.forensics,
      exportedAt: new Date().toISOString(),
    };
    downloadMockFile(`Forensic_Dossier_${ep.hostname}_${Date.now()}.json`, JSON.stringify(report, null, 2));
    addToast('Dossier Exported', `Full forensic report for ${ep.hostname} downloaded.`, 'success');
  };

  const handleKillProcess = (proc) => {
    triggerConfetti();
    addToast('Process Terminated', `Killed PID ${proc.pid} (${proc.name}) via JOCKY Remote Agent.`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl glass-panel-glow border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-[#0b1220]/90 to-blue-950/40">
        <div>
          <div className="flex items-center gap-2">
            <Laptop className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold font-cyber tracking-wide text-white">
              ENDPOINT FORENSICS &amp; HOST SURVEILLANCE
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-time process telemetry, kernel modules, driver verification &amp; memory hooks across 532 workstations
          </p>
        </div>

        {/* Global Summary Badge */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Total Nodes: </span>
            <span className="text-cyan-400 font-bold">{endpoints.length} Listed / 532 Total</span>
          </div>
          <button
            onClick={() => {
              const csv = 'HOSTNAME,IP,OS,MEMORY,CPU,RISK,STATUS\n' + endpoints.map((e) => `${e.hostname},${e.ip},"${e.os}",${e.memory},"${e.cpu}",${e.riskScore},${e.status}`).join('\n');
              downloadMockFile('JOCKY_Fleet_Endpoints.csv', csv);
              addToast('CSV Exported', 'Endpoint inventory saved to CSV.', 'success');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-xs font-mono transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export Fleet CSV
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-3 rounded-xl glass-panel border-cyan-500/20">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {['All', 'Compromised', 'Suspicious', 'Healthy', 'Isolated'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                statusFilter === status
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search host, IP, OS, user..."
            className="w-full bg-slate-900/80 rounded-xl pl-9 pr-3 py-1.5 text-xs font-mono text-white placeholder-slate-500 border border-slate-700/60 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Main Endpoints Table (Exact Columns Required) */}
      <div className="rounded-2xl glass-panel border-cyan-500/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/90 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">HOSTNAME</th>
                <th className="py-3.5 px-4 font-semibold">IP ADDRESS</th>
                <th className="py-3.5 px-4 font-semibold">OS VERSION</th>
                <th className="py-3.5 px-4 font-semibold">MEMORY</th>
                <th className="py-3.5 px-4 font-semibold">CPU</th>
                <th className="py-3.5 px-4 font-semibold text-center">RISK SCORE</th>
                <th className="py-3.5 px-4 font-semibold">STATUS</th>
                <th className="py-3.5 px-4 font-semibold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredEndpoints.map((ep) => {
                const isCompromised = ep.status === 'Compromised';
                const isSuspicious = ep.status === 'Suspicious';
                const isIsolated = ep.isolationStatus === 'Isolated';

                return (
                  <tr
                    key={ep.hostname}
                    className={`hover:bg-cyan-950/20 transition-colors group ${
                      isCompromised ? 'bg-red-950/10' : ''
                    }`}
                  >
                    {/* HOSTNAME */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${
                            isCompromised
                              ? 'bg-red-500 animate-ping'
                              : isSuspicious
                              ? 'bg-amber-400'
                              : 'bg-emerald-400'
                          }`}
                        />
                        <div>
                          <div className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {ep.hostname}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {ep.assignedUser} ({ep.department})
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* IP ADDRESS */}
                    <td className="py-3.5 px-4 text-cyan-300 font-semibold">{ep.ip}</td>

                    {/* OS VERSION */}
                    <td className="py-3.5 px-4 text-slate-300 max-w-[200px] truncate" title={ep.os}>
                      {ep.os}
                    </td>

                    {/* MEMORY */}
                    <td className="py-3.5 px-4 text-slate-300">{ep.memory}</td>

                    {/* CPU */}
                    <td className="py-3.5 px-4 text-slate-300 max-w-[180px] truncate" title={ep.cpu}>
                      {ep.cpu}
                    </td>

                    {/* RISK SCORE */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex flex-col items-center">
                        <span
                          className={`font-cyber font-bold text-sm ${
                            ep.riskScore >= 80
                              ? 'text-red-400'
                              : ep.riskScore >= 50
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          {ep.riskScore}
                        </span>
                        <div className="w-12 h-1 bg-slate-800 rounded-full overflow-hidden mt-1">
                          <div
                            className={`h-full rounded-full ${
                              ep.riskScore >= 80
                                ? 'bg-red-500'
                                : ep.riskScore >= 50
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${ep.riskScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isCompromised
                            ? 'bg-red-950/80 text-red-300 border border-red-500/40'
                            : isSuspicious
                            ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                            : isIsolated
                            ? 'bg-purple-950/80 text-purple-300 border border-purple-500/40'
                            : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                        }`}
                      >
                        {isCompromised && <AlertTriangle className="w-3 h-3 text-red-400" />}
                        {ep.status}
                      </span>
                      {isIsolated && (
                        <div className="text-[9px] text-purple-400 font-bold mt-0.5">QUARANTINED</div>
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Endpoint Details */}
                        <button
                          onClick={() => {
                            setSelectedEndpoint(ep);
                            setActiveForensicTab('processes');
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-all hover:shadow-[0_0_10px_rgba(6,182,212,0.3)] flex items-center gap-1"
                          title="Open Deep Forensics Dossier"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Investigate
                        </button>

                        {/* Isolate / Reconnect */}
                        <button
                          onClick={() => isolateEndpoint(ep.hostname)}
                          className={`px-2 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            isIsolated
                              ? 'bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border-emerald-500/40'
                              : 'bg-red-950/70 hover:bg-red-900 text-red-300 border-red-500/40'
                          }`}
                          title={isIsolated ? 'Restore Network Connectivity' : 'Quarantine Node from Network'}
                        >
                          {isIsolated ? 'Restore' : 'Isolate'}
                        </button>

                        {/* Dump RAM */}
                        <button
                          onClick={() => dumpEndpointMemory(ep.hostname)}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
                          title="Dump Volatile Memory"
                        >
                          <Cpu className="w-3.5 h-3.5 text-purple-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* DEEP DIVE FORENSIC MODAL / DOSSIER (TRIGGERED WHEN CLICKING ENDPOINT) */}
      {selectedEndpoint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl glass-panel-glow bg-[#080d19]/98 border border-cyan-500/40 shadow-2xl overflow-hidden animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
                  <Laptop className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold font-cyber text-white">
                      FORENSIC DOSSIER: {selectedEndpoint.hostname}
                    </h2>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        selectedEndpoint.status === 'Compromised'
                          ? 'bg-red-950 text-red-300 border border-red-500/40'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {selectedEndpoint.status} (Risk {selectedEndpoint.riskScore})
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5 flex flex-wrap items-center gap-3">
                    <span>IP: <strong className="text-cyan-300">{selectedEndpoint.ip}</strong></span>
                    <span>OS: <strong className="text-slate-200">{selectedEndpoint.os}</strong></span>
                    <span>User: <strong className="text-purple-300">{selectedEndpoint.assignedUser}</strong></span>
                    <span>Isolation: <strong className={selectedEndpoint.isolationStatus === 'Isolated' ? 'text-red-400' : 'text-emerald-400'}>{selectedEndpoint.isolationStatus}</strong></span>
                  </div>
                </div>
              </div>

              {/* Top Controls in Modal */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => isolateEndpoint(selectedEndpoint.hostname)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all ${
                    selectedEndpoint.isolationStatus === 'Isolated'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                      : 'bg-red-950 text-red-300 border-red-500/40'
                  }`}
                >
                  {selectedEndpoint.isolationStatus === 'Isolated' ? 'Restore Connection' : 'Quarantine Host'}
                </button>

                <button
                  onClick={() => dumpEndpointMemory(selectedEndpoint.hostname)}
                  className="px-3 py-1.5 rounded-lg bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-500/40 text-xs font-mono font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  Dump RAM
                </button>

                <button
                  onClick={() => handleExportForensicReport(selectedEndpoint)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Export Dossier JSON"
                >
                  <Download className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setSelectedEndpoint(null)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-red-900/60 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 8 FORENSIC TABS (EXACT REQUIREMENT) */}
            <div className="flex items-center gap-1 px-4 py-2 border-b border-slate-800 bg-slate-900/50 overflow-x-auto text-xs font-mono">
              {[
                { id: 'processes', label: 'Running Processes', icon: Terminal, count: selectedEndpoint.forensics?.processes?.length || 0 },
                { id: 'modules', label: 'Loaded Modules', icon: Layers, count: selectedEndpoint.forensics?.loadedModules?.length || 0 },
                { id: 'drivers', label: 'Installed Drivers', icon: FileCode, count: selectedEndpoint.forensics?.installedDrivers?.length || 0 },
                { id: 'users', label: 'User Accounts', icon: User, count: selectedEndpoint.forensics?.userAccounts?.length || 0 },
                { id: 'usb', label: 'USB History', icon: Usb, count: selectedEndpoint.forensics?.usbHistory?.length || 0 },
                { id: 'registry', label: 'Registry Modifications', icon: Database, count: selectedEndpoint.forensics?.registryModifications?.length || 0 },
                { id: 'browser', label: 'Browser Artifacts', icon: Globe, count: selectedEndpoint.forensics?.browserArtifacts?.length || 0 },
                { id: 'events', label: 'Event Logs', icon: ScrollText, count: selectedEndpoint.forensics?.eventLogs?.length || 0 },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeForensicTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveForensicTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl shrink-0 transition-all ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive ? 'bg-slate-950 text-cyan-300' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENTS */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              {/* TAB 1: RUNNING PROCESSES */}
              {activeForensicTab === 'processes' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Process tree inspected via kernel hook EPROCESS list</span>
                    <span className="text-cyan-400">Target host: {selectedEndpoint.hostname}</span>
                  </div>

                  <div className="rounded-xl border border-slate-800 overflow-hidden">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                        <tr>
                          <th className="py-2.5 px-3">PID / PPID</th>
                          <th className="py-2.5 px-3">PROCESS NAME</th>
                          <th className="py-2.5 px-3">COMMAND LINE</th>
                          <th className="py-2.5 px-3">USER</th>
                          <th className="py-2.5 px-3">STATUS</th>
                          <th className="py-2.5 px-3 text-right">ACTION</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {(selectedEndpoint.forensics?.processes || []).map((proc) => (
                          <tr key={proc.pid} className={proc.status === 'Malicious' || proc.status === 'Injected' ? 'bg-red-950/20' : ''}>
                            <td className="py-2 px-3 text-cyan-300 font-bold">{proc.pid} / {proc.ppid}</td>
                            <td className="py-2 px-3 text-white font-semibold flex items-center gap-1.5">
                              {proc.name}
                            </td>
                            <td className="py-2 px-3 text-slate-400 max-w-xs truncate" title={proc.cmd}>
                              {proc.cmd}
                            </td>
                            <td className="py-2 px-3 text-slate-300">{proc.user}</td>
                            <td className="py-2 px-3">
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                                  proc.status === 'Malicious'
                                    ? 'bg-red-950 text-red-300 border border-red-500/40'
                                    : proc.status === 'Injected'
                                    ? 'bg-purple-950 text-purple-300 border border-purple-500/40'
                                    : 'bg-emerald-950 text-emerald-300'
                                }`}
                              >
                                {proc.status}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-right">
                              <button
                                onClick={() => handleKillProcess(proc)}
                                className="px-2 py-1 rounded bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-500/40 text-[11px] font-semibold transition-colors"
                              >
                                Kill PID
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: LOADED MODULES */}
              {activeForensicTab === 'modules' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Virtual Address Descriptor (VAD) DLL listings &amp; memory mappings</span>
                  </div>
                  <div className="rounded-xl border border-slate-800 overflow-hidden">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                        <tr>
                          <th className="py-2.5 px-3">MODULE NAME</th>
                          <th className="py-2.5 px-3">BASE ADDRESS</th>
                          <th className="py-2.5 px-3">SIZE</th>
                          <th className="py-2.5 px-3">SIGNATURE AUTHORITY</th>
                          <th className="py-2.5 px-3 text-right">INTEGRITY</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {(selectedEndpoint.forensics?.loadedModules || []).map((mod, idx) => (
                          <tr key={idx} className={mod.status.includes('MALICIOUS') ? 'bg-red-950/20' : ''}>
                            <td className="py-2 px-3 text-cyan-300 font-semibold">{mod.name}</td>
                            <td className="py-2 px-3 text-purple-300">{mod.base}</td>
                            <td className="py-2 px-3 text-slate-300">{mod.size}</td>
                            <td className="py-2 px-3 text-slate-400">{mod.signed}</td>
                            <td className="py-2 px-3 text-right">
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                                  mod.status.includes('MALICIOUS') || mod.status.includes('HOOKED')
                                    ? 'bg-red-950 text-red-300 border border-red-500/40'
                                    : 'bg-emerald-950 text-emerald-300'
                                }`}
                              >
                                {mod.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: INSTALLED DRIVERS */}
              {activeForensicTab === 'drivers' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Kernel-mode system driver inventory (.sys) audited against CISA Known Exploited Drivers</span>
                  </div>
                  <div className="space-y-2">
                    {(selectedEndpoint.forensics?.installedDrivers || []).map((driver, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono ${
                          driver.status.includes('VULNERABLE')
                            ? 'bg-red-950/20 border-red-500/40 text-red-200'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-white flex items-center gap-2">
                            {driver.name}
                            <span className="text-[10px] text-slate-400">{driver.path}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            Signer: {driver.signed}
                          </div>
                        </div>
                        <span
                          className={`text-[10px] px-2.5 py-1 rounded font-bold uppercase ${
                            driver.status.includes('VULNERABLE')
                              ? 'bg-red-950 text-red-300 border border-red-500/50 animate-pulse'
                              : 'bg-emerald-950 text-emerald-300'
                          }`}
                        >
                          {driver.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: USER ACCOUNTS */}
              {activeForensicTab === 'users' && (
                <div className="space-y-3">
                  <div className="rounded-xl border border-slate-800 overflow-hidden">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                        <tr>
                          <th className="py-2.5 px-3">USERNAME</th>
                          <th className="py-2.5 px-3">SID</th>
                          <th className="py-2.5 px-3">PRIVILEGE</th>
                          <th className="py-2.5 px-3">LAST LOGON</th>
                          <th className="py-2.5 px-3 text-right">STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {(selectedEndpoint.forensics?.userAccounts || []).map((u, idx) => (
                          <tr key={idx} className={u.status.includes('ROGUE') ? 'bg-red-950/20' : ''}>
                            <td className="py-2 px-3 text-white font-bold">{u.username}</td>
                            <td className="py-2 px-3 text-cyan-300">{u.sid}</td>
                            <td className="py-2 px-3 text-slate-300">{u.privilege}</td>
                            <td className="py-2 px-3 text-slate-400">{u.lastLogon}</td>
                            <td className="py-2 px-3 text-right">
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                                  u.status.includes('ROGUE')
                                    ? 'bg-red-950 text-red-300 border border-red-500/40'
                                    : 'bg-emerald-950 text-emerald-300'
                                }`}
                              >
                                {u.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 5: USB HISTORY */}
              {activeForensicTab === 'usb' && (
                <div className="space-y-3">
                  <div className="text-xs font-mono text-slate-400">
                    Physical and virtual USB bus mount history inspected from Registry SYSTEM hive USBSTOR key
                  </div>
                  <div className="space-y-2">
                    {(selectedEndpoint.forensics?.usbHistory || []).map((usb, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono ${
                          usb.threat.includes('RubberDucky')
                            ? 'bg-red-950/20 border-red-500/40 text-red-200'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-white flex items-center gap-2">
                            {usb.vendor}
                            <span className="text-[10px] text-cyan-400 font-mono">({usb.deviceId})</span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            Serial: {usb.serial} • Mount: {usb.mount} ➔ Unmount: {usb.unmount}
                          </div>
                        </div>
                        <span
                          className={`text-[10px] px-2.5 py-1 rounded font-bold uppercase ${
                            usb.threat.includes('RubberDucky')
                              ? 'bg-red-950 text-red-300 border border-red-500/50'
                              : 'bg-emerald-950 text-emerald-300'
                          }`}
                        >
                          {usb.threat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: REGISTRY MODIFICATIONS */}
              {activeForensicTab === 'registry' && (
                <div className="space-y-3">
                  <div className="text-xs font-mono text-slate-400">
                    Suspicious auto-start persistence, Winlogon, and security provider bypasses in Registry
                  </div>
                  <div className="space-y-2">
                    {(selectedEndpoint.forensics?.registryModifications || []).map((reg, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-900/70 border border-red-500/30 text-xs font-mono"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-purple-300 font-bold">{reg.hive}</span>
                          <span className="text-red-400 font-bold uppercase text-[10px] px-2 py-0.5 rounded bg-red-950 border border-red-500/40">
                            {reg.threat}
                          </span>
                        </div>
                        <div className="text-slate-200">
                          Value: <strong className="text-cyan-300">{reg.valueName}</strong> ({reg.type})
                        </div>
                        <div className="text-slate-400 bg-black/40 p-2 rounded-lg mt-1.5 border border-slate-800 text-[11px] font-mono break-all">
                          Data: {reg.data}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: BROWSER ARTIFACTS */}
              {activeForensicTab === 'browser' && (
                <div className="space-y-3">
                  <div className="text-xs font-mono text-slate-400">
                    Forensic browser history, download cache, and SQLite vault sessions extracted by EDR sensor
                  </div>
                  <div className="space-y-2">
                    {(selectedEndpoint.forensics?.browserArtifacts || []).map((art, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-cyan-300 font-bold">{art.browser} • {art.type}</span>
                          <span className="text-slate-400 text-[10px]">{art.time}</span>
                        </div>
                        <div className="text-white font-medium">{art.target}</div>
                        <div className="text-[11px] text-slate-400 mt-1 truncate">{art.url}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 8: EVENT LOGS */}
              {activeForensicTab === 'events' && (
                <div className="space-y-3">
                  <div className="text-xs font-mono text-slate-400">
                    Windows Event Logs (EVTX) filtered for Sysmon, Security, and System anomalies
                  </div>
                  <div className="space-y-2">
                    {(selectedEndpoint.forensics?.eventLogs || []).map((ev, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-cyan-400 font-bold">
                            Event ID {ev.id} ({ev.provider})
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-[10px]">{ev.time}</span>
                            <span
                              className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                                ev.severity === 'Critical'
                                  ? 'bg-red-950 text-red-300 border border-red-500/40'
                                  : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              {ev.severity}
                            </span>
                          </div>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{ev.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Sensor Agent: {selectedEndpoint.agentVersion} (Tamper Resistant)</span>
              <button
                onClick={() => setSelectedEndpoint(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
