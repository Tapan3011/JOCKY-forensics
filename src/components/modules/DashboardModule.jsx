import React, { useState } from 'react';
import { useSOC } from '../../context/SOCContext';
import {
  THREAT_TREND_7DAYS,
  NETWORK_TRAFFIC_LIVE,
  MITRE_TACTIC_DISTRIBUTION,
  TOP_ATTACKED_SYSTEMS,
} from '../../data/mockData';
import {
  ShieldAlert,
  Server,
  Activity,
  Cpu,
  Radio,
  FileCode2,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Download,
  Flame,
  ExternalLink,
  RefreshCw,
  Terminal,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  CartesianGrid,
} from 'recharts';
import { triggerConfetti, downloadMockFile } from '../../utils/cyberEffects';

export default function DashboardModule() {
  const {
    metrics,
    alerts,
    remediateAlert,
    setActiveModule,
    setSelectedEndpoint,
    endpoints,
    addToast,
    triggerAttackSurge,
  } = useSOC();

  const [threatTimeRange, setThreatTimeRange] = useState('7D');

  const handleInvestigateSystem = (hostname) => {
    const target = endpoints.find((e) => e.hostname === hostname) || endpoints[0];
    setSelectedEndpoint(target);
    setActiveModule('endpoints');
    addToast('Endpoint Forensic Center', `Loaded full forensic dossier for ${hostname}`, 'info');
  };

  const handleFleetMemoryScan = () => {
    addToast('Fleet Memory Sweep Dispatched', 'WinPmem kernel drivers queried across all 498 active nodes. Scanning VAD trees.', 'info');
  };

  const handleBatchIsolate = () => {
    triggerConfetti();
    addToast('Fleet Emergency Protocol', 'Quarantine isolation tokens broadcasted to 2 compromised systems (PC-101, SRV-FIN-04).', 'success');
  };

  const handleExportExecutiveReport = () => {
    const reportText = `======================================================================\nJOCKY NTRO-GRADE EXECUTIVE CYBER THREAT & FORENSIC REPORT\n======================================================================\nDate/Time: ${new Date().toISOString()}\nClassification: TOP SECRET // NTRO SOC // CERT-In\n\nEXECUTIVE FLEET METRICS:\n- Total Endpoints: ${metrics.totalEndpoints}\n- Active Systems: ${metrics.activeSystems}\n- Critical Threats: ${metrics.criticalThreats}\n- Medium Threats: ${metrics.mediumThreats}\n- Memory Alerts: ${metrics.memoryAlerts}\n- Network Events Analyzed: ${metrics.networkEvents}\n- Drivers Analyzed: ${metrics.driversAnalyzed}\n- Fleet Risk Score: ${metrics.riskScore}/100 (DEFCON 2)\n\nTOP ATTACKED HOSTS:\n1. PC-101 (192.168.1.12) - Risk 92 - Compromised (Cobalt Strike Beaconing)\n2. SRV-FIN-04 (10.0.4.20) - Risk 88 - Compromised (LSASS Credential Extraction)\n3. DC-CORP-01 (10.0.1.5) - Risk 76 - Suspicious (Kerberoasting Spurt)\n\nSTATUS: Active Containment Protocols In Place.\nAnalyst Signature: Rahul Shah, Lead SOC Investigator\n======================================================================`;
    downloadMockFile(`JOCKY_Executive_SOC_Report_${Date.now()}.txt`, reportText);
    addToast('Report Exported', 'Executive briefing report generated and downloaded.', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner & Quick SOC Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl glass-panel-glow border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-[#0a1020]/90 to-purple-950/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h1 className="text-xl font-bold font-cyber tracking-wide text-white">
              EXECUTIVE SOC TELEMETRY DASHBOARD
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40 rounded">
              REAL-TIME SIMULATION
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Last Fleet Sweep: <strong className="text-cyan-300">{metrics.lastScanTime}</strong> • Assigned Analyst: <span className="text-purple-300">{metrics.analystOnDuty}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleFleetMemoryScan}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-500/40 text-purple-200 text-xs font-mono font-semibold transition-all hover:shadow-[0_0_12px_rgba(168,85,247,0.3)]"
          >
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            Fleet Memory Scan
          </button>

          <button
            onClick={handleBatchIsolate}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-200 text-xs font-mono font-semibold transition-all hover:shadow-[0_0_12px_rgba(239,68,68,0.3)]"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            Isolate Compromised
          </button>

          <button
            onClick={handleExportExecutiveReport}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 text-xs font-mono font-semibold transition-all hover:shadow-[0_0_12px_rgba(6,182,212,0.3)]"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            Export PDF Report
          </button>
        </div>
      </div>

      {/* 7 Required Metrics Cards with Live Dynamic Simulation Updates */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {/* Total Endpoints */}
        <div className="p-3.5 rounded-xl glass-panel border-cyan-500/20 hover:border-cyan-400/40 transition-all group">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Total Endpoints</span>
            <Server className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black font-cyber text-white mt-1">
            {metrics.totalEndpoints}
          </div>
          <div className="text-[10px] text-cyan-400 font-mono mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> All Sites Monitored
          </div>
        </div>

        {/* Active Systems */}
        <div className="p-3.5 rounded-xl glass-panel border-emerald-500/20 hover:border-emerald-400/40 transition-all group">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Active Systems</span>
            <Activity className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black font-cyber text-emerald-400 mt-1">
            {metrics.activeSystems}
          </div>
          <div className="text-[10px] text-emerald-300 font-mono mt-1">
            93.6% Fleet Online
          </div>
        </div>

        {/* Critical Threats */}
        <div className="p-3.5 rounded-xl glass-panel border-red-500/30 bg-red-950/20 hover:border-red-400/50 transition-all group">
          <div className="flex items-center justify-between text-red-300 text-xs font-mono">
            <span>Critical Threats</span>
            <Flame className="w-4 h-4 text-red-400 animate-pulse" />
          </div>
          <div className="text-2xl font-black font-cyber text-red-400 mt-1 flex items-center gap-2">
            {metrics.criticalThreats}
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-950 border border-red-500/40 text-red-300">
              P1
            </span>
          </div>
          <div className="text-[10px] text-red-300 font-mono mt-1">
            Requires Containment
          </div>
        </div>

        {/* Medium Threats */}
        <div className="p-3.5 rounded-xl glass-panel border-amber-500/20 hover:border-amber-400/40 transition-all group">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Medium Threats</span>
            <AlertTriangle className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black font-cyber text-amber-300 mt-1">
            {metrics.mediumThreats}
          </div>
          <div className="text-[10px] text-amber-400/80 font-mono mt-1">
            Triaged by SOC
          </div>
        </div>

        {/* Memory Alerts */}
        <div className="p-3.5 rounded-xl glass-panel border-purple-500/20 hover:border-purple-400/40 transition-all group">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Memory Alerts</span>
            <Cpu className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black font-cyber text-purple-300 mt-1">
            {metrics.memoryAlerts}
          </div>
          <div className="text-[10px] text-purple-400 font-mono mt-1">
            VAD Injection / Hook
          </div>
        </div>

        {/* Network Events (Live Tick) */}
        <div className="p-3.5 rounded-xl glass-panel border-cyan-500/30 bg-cyan-950/20 hover:border-cyan-400/50 transition-all group">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Network Events</span>
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
          </div>
          <div className="text-2xl font-black font-cyber text-cyan-300 mt-1">
            {metrics.networkEvents.toLocaleString()}
          </div>
          <div className="text-[10px] text-cyan-400 font-mono mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            Live Ingestion (5s)
          </div>
        </div>

        {/* Drivers Analyzed */}
        <div className="p-3.5 rounded-xl glass-panel border-blue-500/20 hover:border-blue-400/40 transition-all group">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Drivers Analyzed</span>
            <FileCode2 className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black font-cyber text-blue-300 mt-1">
            {metrics.driversAnalyzed.toLocaleString()}
          </div>
          <div className="text-[10px] text-blue-400 font-mono mt-1">
            WHQL &amp; Kernel Audited
          </div>
        </div>
      </div>

      {/* Row 2: Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Trend Chart (7 days) */}
        <div className="lg:col-span-2 p-5 rounded-2xl glass-panel border-cyan-500/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-bold text-white font-cyber uppercase tracking-wider">
                  Threat Vector Trend (7 Days)
                </h2>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Multivariate attack escalation across Critical, High, Medium, and Low severity
              </p>
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-[11px] font-mono">
              {['7D', '14D', '30D'].map((range) => (
                <button
                  key={range}
                  onClick={() => setThreatTimeRange(range)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    threatTimeRange === range
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={THREAT_TREND_7DAYS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="criticalGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="highGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="mediumGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0a0f1d',
                    borderColor: '#06b6d4',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#criticalGrad)" name="Critical" />
                <Area type="monotone" dataKey="high" stroke="#f97316" strokeWidth={2} fillOpacity={1} fill="url(#highGrad)" name="High" />
                <Area type="monotone" dataKey="medium" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#mediumGrad)" name="Medium" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Score Gauge & Health Card */}
        <div className="p-5 rounded-2xl glass-panel-glow border-purple-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white font-cyber uppercase tracking-wider">
                Fleet Risk Score Gauge
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950 text-red-300 border border-red-500/30">
                ELEVATED RISK
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Cumulative heuristic severity index across 532 nodes
            </p>

            {/* Circular Gauge Visualization */}
            <div className="relative flex items-center justify-center my-4">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="78"
                  stroke="#1e293b"
                  strokeWidth="14"
                  fill="transparent"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="78"
                  stroke="url(#riskGaugeGrad)"
                  strokeWidth="14"
                  strokeDasharray={2 * Math.PI * 78}
                  strokeDashoffset={2 * Math.PI * 78 * (1 - metrics.riskScore / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="riskGaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-black font-cyber text-white">
                  {metrics.riskScore}
                </span>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  / 100 Risk
                </span>
                <span className="text-[10px] font-mono text-red-400 font-bold mt-1">
                  DEFCON 2
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-mono">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Target Attack Surface:</span>
              <span className="text-white font-bold">Finance &amp; SWIFT Core</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Forensic SLA Timer:</span>
              <span className="text-emerald-400 font-bold">1h 14m Remaining</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">NTRO Threat Level:</span>
              <span className="text-red-400 font-bold">Active C2 Ingress</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Network Traffic Chart & MITRE ATT&CK Coverage Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Network Traffic Live Chart */}
        <div className="p-5 rounded-2xl glass-panel border-cyan-500/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-bold text-white font-cyber uppercase tracking-wider">
                  Network Traffic Ingestion (Mbps &amp; Anomalies)
                </h2>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Real-time packet inspection via Zeek / Suricata sensor probes
              </p>
            </div>
            <button
              onClick={() => setActiveModule('network')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
            >
              View Topology <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={NETWORK_TRAFFIC_LIVE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="inboundGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="anomGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0a0f1d',
                    borderColor: '#3b82f6',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="inbound" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#inboundGrad)" name="Inbound (Mbps)" />
                <Area type="monotone" dataKey="outbound" stroke="#10b981" strokeWidth={2} fillOpacity={0.2} fill="#10b981" name="Outbound (Mbps)" />
                <Area type="monotone" dataKey="anomalous" stroke="#ec4899" strokeWidth={2} fillOpacity={1} fill="url(#anomGrad)" name="Anomalous Drops" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* MITRE ATT&CK Coverage Chart */}
        <div className="p-5 rounded-2xl glass-panel border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <h2 className="text-sm font-bold text-white font-cyber uppercase tracking-wider">
                  MITRE ATT&amp;CK Coverage &amp; Detections
                </h2>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Heuristic rules mapped across enterprise threat tactics
              </p>
            </div>
            <button
              onClick={() => setActiveModule('mitre')}
              className="text-xs text-purple-400 hover:text-purple-300 font-mono flex items-center gap-1"
            >
              Full Matrix <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MITRE_TACTIC_DISTRIBUTION} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="tactic" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} angle={-25} textAnchor="end" />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0a0f1d',
                    borderColor: '#8b5cf6',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '20px' }} />
                <Bar dataKey="coverage" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Rule Coverage %" />
                <Bar dataKey="detected" fill="#ef4444" radius={[4, 4, 0, 0]} name="Detected Attacks" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 4: Top Attacked Systems & Critical Alerts Live Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Attacked Systems */}
        <div className="p-5 rounded-2xl glass-panel border-cyan-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-bold text-white font-cyber uppercase tracking-wider">
                  Top Attacked Systems
                </h2>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Ranked by Risk Score</span>
            </div>

            <div className="space-y-2.5">
              {TOP_ATTACKED_SYSTEMS.map((sys) => (
                <div
                  key={sys.hostname}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        sys.status === 'Compromised'
                          ? 'bg-red-500 animate-ping'
                          : 'bg-amber-400'
                      }`}
                    />
                    <div>
                      <div className="text-xs font-bold text-white font-mono flex items-center gap-2">
                        {sys.hostname}
                        <span className="text-slate-400 font-normal">{sys.ip}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        User: {sys.user} • {sys.alerts} correlated alerts
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs font-bold font-cyber text-red-400">
                        {sys.risk}/100
                      </div>
                      <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-red-950 text-red-300 border border-red-500/30">
                        {sys.status}
                      </span>
                    </div>

                    <button
                      onClick={() => handleInvestigateSystem(sys.hostname)}
                      className="px-2.5 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-xs font-mono transition-colors"
                    >
                      Investigate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>5 Nodes Currently Under Heuristic Surveillance</span>
            <button
              onClick={() => setActiveModule('endpoints')}
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              All 532 Endpoints <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Critical Alerts Feed */}
        <div className="p-5 rounded-2xl glass-panel border-red-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <h2 className="text-sm font-bold text-white font-cyber uppercase tracking-wider">
                  Critical Alerts Live Feed
                </h2>
              </div>
              <span className="text-[11px] font-mono text-red-400 animate-pulse flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> LIVE STREAM
              </span>
            </div>

            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 rounded-xl bg-slate-900/60 border border-red-500/25 hover:border-red-500/50 transition-all text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-red-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                      {alert.id} • {alert.tactic}
                    </span>
                    <span className="font-mono text-slate-400 text-[10px]">{alert.timestamp}</span>
                  </div>

                  <p className="font-medium text-slate-200 line-clamp-1">{alert.title}</p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400">
                    <span>Host: <strong className="text-cyan-300">{alert.host}</strong> ({alert.rule})</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleInvestigateSystem(alert.host)}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => remediateAlert(alert.id)}
                        className="px-2 py-1 rounded bg-red-950 hover:bg-red-900 text-red-200 border border-red-500/40 transition-colors font-semibold"
                      >
                        Drop
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Rule Engine: 1,845 Rules Active</span>
            <button
              onClick={() => setActiveModule('incidents')}
              className="text-red-400 hover:underline flex items-center gap-1"
            >
              Open Incident Center <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
