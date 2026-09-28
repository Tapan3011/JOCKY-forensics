import React, { useState } from 'react';
import { useSOC } from '../../context/SOCContext';
import { ANALYTICS_DATA, TOP_ATTACKED_SYSTEMS } from '../../data/mockData';
import {
  BarChart3,
  PieChart as PieIcon,
  Globe,
  Server,
  Activity,
  Download,
  Calendar,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { downloadMockFile } from '../../utils/cyberEffects';

export default function AnalyticsCenterModule() {
  const { addToast, setSelectedEndpoint, setActiveModule, endpoints } = useSOC();
  const [timeRange, setTimeRange] = useState('30D');

  const handleExportAnalyticsReport = () => {
    const data = JSON.stringify(ANALYTICS_DATA, null, 2);
    downloadMockFile(`JOCKY_SOC_Analytics_Telemetry_${Date.now()}.json`, data);
    addToast('Analytics Saved', 'Comprehensive telemetry statistics exported.', 'success');
  };

  const handleInvestigateSystem = (hostname) => {
    const target = endpoints.find((e) => e.hostname === hostname) || endpoints[0];
    setSelectedEndpoint(target);
    setActiveModule('endpoints');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl glass-panel-glow border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-[#0a1426]/90 to-purple-950/40">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold font-cyber tracking-wide text-white">
              SOC ANALYTICS &amp; FORENSIC TELEMETRY CENTER
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Aggregated intelligence metrics, adversary geo-distribution &amp; enterprise risk posture
          </p>
        </div>

        {/* Time Filter & Export */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono">
            {['24H', '7D', '30D', 'Quarter'].map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  timeRange === r
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportAnalyticsReport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-xs font-mono transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export Telemetry Report
          </button>
        </div>
      </div>

      {/* Forensic Collection Statistics (Summary Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl glass-panel border-cyan-500/20">
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
            Acquired Forensics
          </span>
          <div className="text-2xl font-black font-cyber text-cyan-300 mt-1">
            {ANALYTICS_DATA.forensicCollectionStats.totalGigabytesCollected}
          </div>
          <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">WORM Sealed Storage</span>
        </div>

        <div className="p-3.5 rounded-xl glass-panel border-purple-500/20">
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
            Artifacts Logged
          </span>
          <div className="text-2xl font-black font-cyber text-purple-300 mt-1">
            {ANALYTICS_DATA.forensicCollectionStats.evidenceArtifactsLogged.toLocaleString()}
          </div>
          <span className="text-[10px] text-purple-400 font-mono mt-0.5 block">HMAC Verified</span>
        </div>

        <div className="p-3.5 rounded-xl glass-panel border-emerald-500/20">
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
            Mean Time To Detect (MTTD)
          </span>
          <div className="text-2xl font-black font-cyber text-emerald-400 mt-1">
            {ANALYTICS_DATA.forensicCollectionStats.meanTimeToDetect}
          </div>
          <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">Real-time Telemetry</span>
        </div>

        <div className="p-3.5 rounded-xl glass-panel border-amber-500/20">
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
            Mean Time To Remediate
          </span>
          <div className="text-2xl font-black font-cyber text-amber-300 mt-1">
            {ANALYTICS_DATA.forensicCollectionStats.meanTimeToRemediate}
          </div>
          <span className="text-[10px] text-amber-400 font-mono mt-0.5 block">SLA Compliance 99.1%</span>
        </div>

        <div className="p-3.5 rounded-xl glass-panel border-cyan-500/20 col-span-2 md:col-span-1">
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
            Auto-Triage Rate
          </span>
          <div className="text-2xl font-black font-cyber text-cyan-400 mt-1">
            {ANALYTICS_DATA.forensicCollectionStats.automatedTriageRate}
          </div>
          <span className="text-[10px] text-cyan-400 font-mono mt-0.5 block">SOAR Automation</span>
        </div>
      </div>

      {/* Row 2: Threat Distribution Pie Chart & Incidents Per Month Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Distribution Pie Chart */}
        <div className="p-5 rounded-2xl glass-panel border-cyan-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-bold text-white font-cyber uppercase tracking-wider">
                  Threat Vector Distribution
                </h2>
              </div>
              <span className="text-[10px] font-mono text-cyan-400">Classified Signatures</span>
            </div>
            <p className="text-xs text-slate-400 font-mono mb-4">
              Classification breakdown of active adversary intrusion mechanisms
            </p>

            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ANALYTICS_DATA.threatDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={4}
                    stroke="#0b101c"
                    strokeWidth={3}
                  >
                    {ANALYTICS_DATA.threatDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
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
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Dominant Vector: Cobalt Strike / In-Memory Beacon</span>
            <span className="text-red-400 font-bold">38% Share</span>
          </div>
        </div>

        {/* Incidents Per Month Bar Chart */}
        <div className="p-5 rounded-2xl glass-panel border-purple-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <h2 className="text-sm font-bold text-white font-cyber uppercase tracking-wider">
                  Incidents Velocity Per Month
                </h2>
              </div>
              <span className="text-[10px] font-mono text-purple-400">Past 6 Months</span>
            </div>
            <p className="text-xs text-slate-400 font-mono mb-4">
              Historical case volume, resolution rate &amp; critical severity escalations
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ANALYTICS_DATA.incidentsPerMonth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0a0f1d',
                      borderColor: '#8b5cf6',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="total" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Total Cases" />
                  <Bar dataKey="resolved" fill="#10b981" radius={[4, 4, 0, 0]} name="Resolved Cases" />
                  <Bar dataKey="critical" fill="#ef4444" radius={[4, 4, 0, 0]} name="Critical (P1)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Overall Case Resolution Rate</span>
            <span className="text-emerald-400 font-bold">87.2% Resolved</span>
          </div>
        </div>
      </div>

      {/* Row 3: Attack Sources By Country & Endpoint Risk Scores Histogram */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attack Sources By Country */}
        <div className="p-5 rounded-2xl glass-panel border-cyan-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold text-white font-cyber uppercase tracking-wider">
                Attack Sources By Country (GeoIP Ingestion)
              </h2>
            </div>
            <span className="text-[10px] font-mono text-cyan-400">Adversary ASN</span>
          </div>
          <p className="text-xs text-slate-400 font-mono mb-4">
            Total correlated offensive traffic volumes originating from foreign jurisdictions
          </p>

          <div className="space-y-3 font-mono text-xs">
            {ANALYTICS_DATA.attackSourcesByCountry.map((src, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-bold text-white">{src.country}</span>
                  <span className="text-slate-400">{src.attacks.toLocaleString()} Attacks ({src.percentage}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                    style={{ width: `${src.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Endpoint Risk Scores Distribution */}
        <div className="p-5 rounded-2xl glass-panel border-purple-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <h2 className="text-sm font-bold text-white font-cyber uppercase tracking-wider">
                Endpoint Fleet Risk Scores
              </h2>
            </div>
            <span className="text-[10px] font-mono text-purple-400">Histogram (532 Nodes)</span>
          </div>
          <p className="text-xs text-slate-400 font-mono mb-4">
            Breakdown of fleet endpoints grouped by cumulative risk score brackets
          </p>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ANALYTICS_DATA.endpointRiskHistogram} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="range" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0a0f1d',
                    borderColor: '#06b6d4',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Endpoints" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 4: Most Targeted Systems List */}
      <div className="p-5 rounded-2xl glass-panel border-cyan-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white font-cyber uppercase tracking-wider">
              Most Targeted Enterprise Systems
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Correlated across 7 days</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {TOP_ATTACKED_SYSTEMS.map((sys) => (
            <div
              key={sys.hostname}
              className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all font-mono text-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-white text-sm">{sys.hostname}</strong>
                  <span className="text-red-400 font-cyber font-bold text-xs">{sys.risk}/100</span>
                </div>
                <div className="text-cyan-300 text-[11px]">{sys.ip}</div>
                <div className="text-slate-400 text-[10px] mt-1">{sys.alerts} Correlated Alerts</div>
              </div>

              <button
                onClick={() => handleInvestigateSystem(sys.hostname)}
                className="mt-3 w-full py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-[11px] font-semibold transition-colors flex items-center justify-center gap-1"
              >
                Inspect Node <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
