import React, { useState } from 'react';
import { useSOC } from '../../context/SOCContext';
import {
  NETWORK_CONNECTIONS_DATA,
  WORLD_ATTACK_TARGETS,
  DNS_LOGS,
  NETWORK_TRAFFIC_LIVE,
} from '../../data/mockData';
import {
  Network,
  Globe,
  Radio,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Download,
  Filter,
  Search,
  ExternalLink,
  Flame,
  ArrowRight,
  Wifi,
  Server,
  Ban,
  Activity,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { triggerConfetti, downloadMockFile } from '../../utils/cyberEffects';

export default function NetworkForensicsModule() {
  const { addToast } = useSOC();
  const [connections, setConnections] = useState(NETWORK_CONNECTIONS_DATA);
  const [threatFilter, setThreatFilter] = useState('All');
  const [selectedConnection, setSelectedConnection] = useState(connections[0]);
  const [selectedTopologyNode, setSelectedTopologyNode] = useState(null);

  const filteredConnections = connections.filter((conn) => {
    return threatFilter === 'All' || conn.threatLevel === threatFilter;
  });

  const handleBlockIp = (ip) => {
    triggerConfetti();
    setConnections((prev) =>
      prev.map((c) => (c.destIp === ip ? { ...c, threatLevel: 'Blocked' } : c))
    );
    addToast('Firewall Rule Injected', `Null-routed destination IP ${ip} across enterprise border gateways.`, 'success');
  };

  const handleCapturePcap = (conn) => {
    const pcapHeader = `// JOCKY WIRESHARK / PCAP-NG EXTRACT\n// Connection: ${conn.srcIp}:${conn.srcPort} -> ${conn.destIp}:${conn.destPort}\n// Protocol: ${conn.protocol} | Packets: ${conn.packets}\n// Destination: ${conn.country} (${conn.asn})\n\n[PACKET 0001] TLSv1.3 Client Hello (SNI: update-microsoft-cloud.net)\n[PACKET 0002] TLSv1.3 Server Hello (Cipher: TLS_AES_256_GCM_SHA384)\n[PACKET 0003] Encrypted Handshake Message\n[PACKET 0004] Application Data (Length: 1024 bytes) -> C2 Beacon Staged`;
    downloadMockFile(`stream_capture_${conn.srcIp}_to_${conn.destIp}.pcap`, pcapHeader);
    addToast('PCAP Stream Saved', `Saved packet capture for ${conn.destIp} to disk.`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl glass-panel-glow border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-[#071324]/90 to-purple-950/40">
        <div>
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold font-cyber tracking-wide text-white">
              ADVANCED NETWORK MONITORING &amp; PACKET FORENSICS
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-time deep packet inspection (DPI), interactive network topology &amp; global threat telemetry
          </p>
        </div>

        {/* Global Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              downloadMockFile('JOCKY_Full_Zeek_Bro_Flows.log', JSON.stringify(connections, null, 2));
              addToast('Zeek Flows Saved', 'Bro/Zeek network connection logs exported.', 'success');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-xs font-mono transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export PCAP / Zeek Logs
          </button>
        </div>
      </div>

      {/* Main Connection Table (Exact Sample: 192.168.1.12 | 104.26.2.33 | HTTPS | 12045 | USA | Critical) */}
      <div className="rounded-2xl glass-panel border-cyan-500/20 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/70">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <h2 className="text-sm font-bold text-white font-cyber uppercase tracking-wider">
              Active Network Communication Flows
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5">
            {['All', 'Critical', 'High', 'Low'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setThreatFilter(lvl)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  threatFilter === lvl
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 font-semibold">SOURCE IP</th>
                <th className="py-3 px-4 font-semibold">DESTINATION IP</th>
                <th className="py-3 px-4 font-semibold">PROTOCOL</th>
                <th className="py-3 px-4 font-semibold">PACKETS</th>
                <th className="py-3 px-4 font-semibold">COUNTRY</th>
                <th className="py-3 px-4 font-semibold">THREAT LEVEL</th>
                <th className="py-3 px-4 font-semibold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredConnections.map((conn) => {
                const isCritical = conn.threatLevel === 'Critical';
                const isHigh = conn.threatLevel === 'High';
                const isBlocked = conn.threatLevel === 'Blocked';

                return (
                  <tr
                    key={conn.id}
                    onClick={() => setSelectedConnection(conn)}
                    className={`hover:bg-cyan-950/20 cursor-pointer transition-colors ${
                      isCritical ? 'bg-red-950/15' : ''
                    } ${selectedConnection?.id === conn.id ? 'bg-cyan-950/30' : ''}`}
                  >
                    {/* SOURCE IP */}
                    <td className="py-3.5 px-4 font-bold text-white">
                      {conn.srcIp}
                      <span className="text-[10px] text-slate-400 block font-normal">Port: {conn.srcPort}</span>
                    </td>

                    {/* DESTINATION IP */}
                    <td className="py-3.5 px-4 font-bold text-cyan-300">
                      {conn.destIp}
                      <span className="text-[10px] text-slate-400 block font-normal">Port: {conn.destPort}</span>
                    </td>

                    {/* PROTOCOL */}
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-bold text-[10px]">
                        {conn.protocol}
                      </span>
                    </td>

                    {/* PACKETS */}
                    <td className="py-3.5 px-4 text-slate-200">
                      <strong>{conn.packets.toLocaleString()}</strong>
                      <span className="text-[10px] text-slate-400 block">({conn.bytes})</span>
                    </td>

                    {/* COUNTRY */}
                    <td className="py-3.5 px-4 text-slate-300 flex items-center gap-1.5 mt-2">
                      <span className="text-base">{conn.flag}</span>
                      <span>{conn.country}</span>
                    </td>

                    {/* THREAT LEVEL */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isBlocked
                            ? 'bg-slate-800 text-slate-300 border border-slate-600'
                            : isCritical
                            ? 'bg-red-950 text-red-300 border border-red-500/40'
                            : isHigh
                            ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                            : 'bg-emerald-950 text-emerald-300'
                        }`}
                      >
                        {isCritical && <AlertTriangle className="w-3 h-3 text-red-400" />}
                        {conn.threatLevel}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBlockIp(conn.destIp);
                          }}
                          disabled={isBlocked}
                          className="px-2 py-1 rounded bg-red-950 hover:bg-red-900 text-red-200 border border-red-500/40 text-[11px] font-semibold transition-colors disabled:opacity-40"
                          title="Block IP on Edge Firewall"
                        >
                          {isBlocked ? 'Blocked' : 'Block IP'}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCapturePcap(conn);
                          }}
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors"
                          title="Download PCAP Stream"
                        >
                          <Download className="w-3.5 h-3.5" />
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

      {/* Row 2: Interactive Network Topology & World Attack Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* VISUALIZATION 1: INTERACTIVE NETWORK TOPOLOGY (SVG CANVAS) */}
        <div className="p-5 rounded-2xl glass-panel border-cyan-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-bold text-white font-cyber uppercase tracking-wider">
                  Interactive Network Topology
                </h2>
              </div>
              <span className="text-[10px] font-mono text-cyan-400">Live Traffic Animation</span>
            </div>
            <p className="text-xs text-slate-400 font-mono mb-4">
              Real-time packet routes from enterprise subnets to firewall &amp; external C2
            </p>

            {/* SVG Topology Graph with Animated Flow Lines */}
            <div className="relative w-full h-72 rounded-xl bg-slate-950/80 border border-slate-800 p-2 overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 600 300" className="w-full h-full">
                {/* Defs for gradients & markers */}
                <defs>
                  <linearGradient id="topoLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>

                {/* Animated Connecting Flow Lines */}
                {/* PC-101 to Firewall */}
                <path d="M 120 70 L 300 150" stroke="#ef4444" strokeWidth="2.5" className="animate-data-flow" />
                {/* PC-102 to Firewall */}
                <path d="M 120 150 L 300 150" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
                {/* SRV-FIN-04 to Firewall */}
                <path d="M 120 230 L 300 150" stroke="#f97316" strokeWidth="2.5" className="animate-data-flow" />
                {/* Firewall to External C2 */}
                <path d="M 300 150 L 480 90" stroke="url(#topoLineGrad)" strokeWidth="3" className="animate-data-flow" />
                {/* Firewall to Public Cloud */}
                <path d="M 300 150 L 480 210" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />

                {/* Nodes */}
                {/* Node: PC-101 (Compromised) */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setSelectedTopologyNode({ name: 'PC-101', ip: '192.168.1.12', role: 'Finance Endpoint (Compromised)' })}
                >
                  <circle cx="120" cy="70" r="22" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                  <circle cx="120" cy="70" r="8" fill="#ef4444" className="animate-pulse" />
                  <text x="120" y="105" textAnchor="middle" fill="#ef4444" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    PC-101 (Compromised)
                  </text>
                </g>

                {/* Node: PC-102 (Healthy) */}
                <g
                  className="cursor-pointer"
                  onClick={() => setSelectedTopologyNode({ name: 'PC-102', ip: '192.168.1.15', role: 'HR Workstation (Healthy)' })}
                >
                  <circle cx="120" cy="150" r="18" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                  <circle cx="120" cy="150" r="6" fill="#10b981" />
                  <text x="120" y="180" textAnchor="middle" fill="#10b981" fontSize="10" fontFamily="monospace">
                    PC-102 (Clean)
                  </text>
                </g>

                {/* Node: SRV-FIN-04 */}
                <g
                  className="cursor-pointer"
                  onClick={() => setSelectedTopologyNode({ name: 'SRV-FIN-04', ip: '10.0.4.20', role: 'SWIFT Core Datacenter' })}
                >
                  <circle cx="120" cy="230" r="20" fill="#431407" stroke="#f97316" strokeWidth="2" />
                  <circle cx="120" cy="230" r="7" fill="#f97316" className="animate-pulse" />
                  <text x="120" y="262" textAnchor="middle" fill="#f97316" fontSize="10" fontFamily="monospace">
                    SRV-FIN-04
                  </text>
                </g>

                {/* Central Gateway / Firewall */}
                <g
                  className="cursor-pointer"
                  onClick={() => setSelectedTopologyNode({ name: 'NGFW-GATEWAY', ip: '10.0.0.1', role: 'Enterprise Border Firewall & Suricata' })}
                >
                  <polygon points="300,120 330,150 300,180 270,150" fill="#082f49" stroke="#06b6d4" strokeWidth="2.5" />
                  <text x="300" y="200" textAnchor="middle" fill="#06b6d4" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    JOCKY NGFW / IDS
                  </text>
                </g>

                {/* External C2 Server Node */}
                <g
                  className="cursor-pointer"
                  onClick={() => setSelectedTopologyNode({ name: 'C2-BEACON-USA', ip: '104.26.2.33', role: 'CobaltStrike Ingress Server' })}
                >
                  <circle cx="480" cy="90" r="22" fill="#450a0a" stroke="#ef4444" strokeWidth="2.5" />
                  <circle cx="480" cy="90" r="9" fill="#ef4444" className="animate-ping" />
                  <text x="480" y="125" textAnchor="middle" fill="#ef4444" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    C2: 104.26.2.33 (USA)
                  </text>
                </g>

                {/* Public Cloud / Safe */}
                <g
                  className="cursor-pointer"
                  onClick={() => setSelectedTopologyNode({ name: 'PUBLIC-CLOUD', ip: '8.8.8.8 / GitHub', role: 'Legitimate SaaS Traffic' })}
                >
                  <circle cx="480" cy="210" r="18" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                  <text x="480" y="240" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="monospace">
                    Public Cloud / DNS
                  </text>
                </g>
              </svg>

              {/* Topology Info Box if clicked */}
              {selectedTopologyNode && (
                <div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg bg-black/90 border border-cyan-500/40 text-xs font-mono flex items-center justify-between animate-in fade-in">
                  <div>
                    <span className="text-cyan-300 font-bold">{selectedTopologyNode.name}</span> ({selectedTopologyNode.ip})
                    <span className="text-slate-400 block text-[10px]">{selectedTopologyNode.role}</span>
                  </div>
                  <button
                    onClick={() => setSelectedTopologyNode(null)}
                    className="text-slate-400 hover:text-white text-xs px-2 py-0.5 rounded bg-slate-800"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>DPI Filter: Layer-7 Protocol Inspection Active</span>
            <span className="text-cyan-400">Packets/Sec: 1,840</span>
          </div>
        </div>

        {/* VISUALIZATION 2: WORLD ATTACK MAP */}
        <div className="p-5 rounded-2xl glass-panel-glow border-purple-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-400" />
                <h2 className="text-sm font-bold text-white font-cyber uppercase tracking-wider">
                  World Attack Map &amp; Geolocation
                </h2>
              </div>
              <span className="text-[10px] font-mono text-purple-300">Target: New Delhi SOC</span>
            </div>
            <p className="text-xs text-slate-400 font-mono mb-4">
              Real-time cyber threat vectors incoming to JOCKY Security Operations Center
            </p>

            {/* High-Tech Vector World Map Simulation */}
            <div className="relative w-full h-72 rounded-xl bg-[#060b14] border border-slate-800 p-2 overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 600 300" className="w-full h-full">
                {/* Background grid */}
                <pattern id="worldGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                </pattern>
                <rect width="600" height="300" fill="url(#worldGrid)" />

                {/* Continental outline silhouettes (Stylized minimal vector) */}
                <path
                  d="M 90 80 Q 120 70 170 85 T 190 140 T 150 170 T 100 120 Z"
                  fill="rgba(30, 41, 59, 0.4)"
                  stroke="rgba(56, 189, 248, 0.2)"
                  strokeWidth="1"
                />
                <path
                  d="M 140 180 Q 180 190 170 260 T 130 240 Z"
                  fill="rgba(30, 41, 59, 0.4)"
                  stroke="rgba(56, 189, 248, 0.2)"
                  strokeWidth="1"
                />
                <path
                  d="M 270 70 Q 320 60 360 80 T 350 140 T 290 110 Z"
                  fill="rgba(30, 41, 59, 0.4)"
                  stroke="rgba(56, 189, 248, 0.2)"
                  strokeWidth="1"
                />
                <path
                  d="M 280 150 Q 330 160 320 240 T 270 200 Z"
                  fill="rgba(30, 41, 59, 0.4)"
                  stroke="rgba(56, 189, 248, 0.2)"
                  strokeWidth="1"
                />
                <path
                  d="M 370 70 Q 480 60 520 110 T 460 170 T 380 120 Z"
                  fill="rgba(30, 41, 59, 0.4)"
                  stroke="rgba(56, 189, 248, 0.2)"
                  strokeWidth="1"
                />

                {/* TARGET SOC NODE: New Delhi (Approx 400, 140) */}
                <g>
                  <circle cx="400" cy="140" r="16" fill="rgba(6, 182, 212, 0.2)" className="animate-ping" />
                  <circle cx="400" cy="140" r="6" fill="#06b6d4" />
                  <text x="400" y="165" textAnchor="middle" fill="#06b6d4" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    HQ (New Delhi)
                  </text>
                </g>

                {/* Attack Arcs & Pulses from Global Adversaries */}
                {/* 1. San Francisco, USA -> New Delhi */}
                <path d="M 130 100 Q 260 20 400 140" fill="none" stroke="#ef4444" strokeWidth="2" className="animate-data-flow" />
                <circle cx="130" cy="100" r="5" fill="#ef4444" />
                <text x="130" y="90" textAnchor="middle" fill="#ef4444" fontSize="9" fontFamily="monospace">USA</text>

                {/* 2. Moscow, Russia -> New Delhi */}
                <path d="M 340 85 Q 370 100 400 140" fill="none" stroke="#ef4444" strokeWidth="2.5" className="animate-data-flow" />
                <circle cx="340" cy="85" r="5" fill="#ef4444" />
                <text x="340" y="75" textAnchor="middle" fill="#ef4444" fontSize="9" fontFamily="monospace">Russia</text>

                {/* 3. Amsterdam, Netherlands -> New Delhi */}
                <path d="M 300 95 Q 350 90 400 140" fill="none" stroke="#f97316" strokeWidth="2" className="animate-data-flow" />
                <circle cx="300" cy="95" r="4" fill="#f97316" />
                <text x="300" y="85" textAnchor="middle" fill="#f97316" fontSize="9" fontFamily="monospace">NL</text>

                {/* 4. Beijing, China -> New Delhi */}
                <path d="M 460 115 Q 430 110 400 140" fill="none" stroke="#eab308" strokeWidth="2" className="animate-data-flow" />
                <circle cx="460" cy="115" r="5" fill="#eab308" />
                <text x="460" y="105" textAnchor="middle" fill="#eab308" fontSize="9" fontFamily="monospace">China</text>
              </svg>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Primary Vector: Cloudflare Proxied Cobalt Strike</span>
            <span className="text-red-400 font-bold">5 Active Ingress Beacons</span>
          </div>
        </div>
      </div>

      {/* Row 3: Traffic Spikes Timeline & DNS Requests Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Spikes Timeline */}
        <div className="p-5 rounded-2xl glass-panel border-cyan-500/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold text-white font-cyber uppercase tracking-wider">
                Traffic Spikes &amp; Bandwidth Anomalies
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">Last 40 Mins</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={NETWORK_TRAFFIC_LIVE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="spikeGrad" x1="0" y1="0" x2="0" y2="1">
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
                    borderColor: '#ec4899',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="anomalous" stroke="#ec4899" strokeWidth={2.5} fillOpacity={1} fill="url(#spikeGrad)" name="Anomalous Packets" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DNS Requests Stream */}
        <div className="p-5 rounded-2xl glass-panel border-purple-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-purple-400" />
                <h2 className="text-sm font-bold text-white font-cyber uppercase tracking-wider">
                  Live DNS Queries &amp; DGA Analysis
                </h2>
              </div>
              <span className="text-[10px] font-mono text-purple-400">DGA Detection</span>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {DNS_LOGS.map((dns, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-xs font-mono"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-cyan-300 font-bold">{dns.host} • {dns.type}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                        dns.status === 'BLOCKED'
                          ? 'bg-red-950 text-red-300 border border-red-500/40'
                          : dns.status === 'ALERT'
                          ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-950 text-emerald-300'
                      }`}
                    >
                      {dns.status} (DGA {dns.dgaScore}%)
                    </span>
                  </div>
                  <div className="text-slate-200 truncate">{dns.query}</div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Resolved: <strong className="text-slate-300">{dns.response}</strong> • {dns.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>DNS Sinkhole: active-sinkhole.jocky.gov</span>
            <span className="text-emerald-400 font-semibold">98.2% DGA Block Rate</span>
          </div>
        </div>
      </div>
    </div>
  );
}
