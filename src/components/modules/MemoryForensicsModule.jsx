import React, { useState } from 'react';
import { useSOC } from '../../context/SOCContext';
import { MEMORY_FORENSICS_DATA } from '../../data/mockData';
import {
  Cpu,
  Layers,
  AlertTriangle,
  Flame,
  ShieldAlert,
  ShieldCheck,
  Download,
  RefreshCw,
  Search,
  Code,
  FileCode2,
  Terminal,
  Activity,
  CheckCircle2,
  GitBranch,
  Crosshair,
  ArrowRight,
} from 'lucide-react';
import { triggerConfetti, downloadMockFile } from '../../utils/cyberEffects';

export default function MemoryForensicsModule() {
  const { addToast } = useSOC();
  const [selectedHost, setSelectedHost] = useState('PC-101');
  const [selectedMemoryRegion, setSelectedMemoryRegion] = useState(
    MEMORY_FORENSICS_DATA.memoryMapGrid[6] // default injected region
  );
  const [activeFinding, setActiveFinding] = useState(MEMORY_FORENSICS_DATA.findings[0]);
  const [isScanning, setIsScanning] = useState(false);

  const handleRescan = () => {
    setIsScanning(true);
    addToast('Volatility 3 Scan Running', 'Parsing VAD structures, ActiveProcessLinks, and SSDT kernel hooks...', 'info');
    setTimeout(() => {
      setIsScanning(false);
      triggerConfetti();
      addToast('Memory Scan Complete', 'Forensic certainty refreshed: 96.4% confidence score validated.', 'success');
    }, 2000);
  };

  const handleExtractPayload = () => {
    const rawPayload = `// JOCKY DECRYPTED VOLATILE MEMORY PAYLOAD ARTIFACT\n// Target Host: ${selectedHost}\n// Process: svchost.exe (PID 6120)\n// Region: 0x000001D48A900000 (PAGE_EXECUTE_READWRITE)\n// Size: 480 KB\n// Decryption Key: 0x7E3A912F\n\n4D 5A 90 00 03 00 00 00 04 00 00 00 FF FF 00 00\nB8 00 00 00 00 00 00 00 40 00 00 00 00 00 00 00\n48 83 EC 28 48 8D 0D 45 10 00 FF 15 23 41 02 00\nE8 8A 01 00 00 48 89 C3 48 85 C0 74 1E 48 8B 0D`;
    downloadMockFile(`extracted_shellcode_pid6120_${selectedHost}.bin`, rawPayload);
    triggerConfetti();
    addToast('Payload Extracted', 'Decrypted in-memory reflective DLL saved to disk.', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner with Memory Scan Status & Confidence Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl glass-panel-glow border-purple-500/30 bg-gradient-to-r from-slate-900/90 via-[#0e0c1f]/90 to-cyan-950/40">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-400" />
            <h1 className="text-xl font-bold font-cyber tracking-wide text-white">
              MEMORY FORENSIC CENTER (VOLATILITY 3 &amp; REKALL)
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Volatile RAM acquisition, Virtual Address Descriptor (VAD) tree parsing &amp; direct kernel hook analysis
          </p>
        </div>

        {/* Confidence Score & Rescan Controls */}
        <div className="flex items-center gap-3">
          {/* Target Host Dropdown */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Target:</span>
            <select
              value={selectedHost}
              onChange={(e) => {
                setSelectedHost(e.target.value);
                addToast('Target Switched', `Loaded memory image for ${e.target.value}`, 'info');
              }}
              className="bg-transparent text-cyan-300 font-bold focus:outline-none"
            >
              <option value="PC-101" className="bg-slate-900 text-white">PC-101 (16GB RAW)</option>
              <option value="SRV-FIN-04" className="bg-slate-900 text-white">SRV-FIN-04 (64GB ECC)</option>
              <option value="DC-CORP-01" className="bg-slate-900 text-white">DC-CORP-01 (128GB ECC)</option>
            </select>
          </div>

          {/* Confidence Score Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-200 text-xs font-mono font-bold">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>CONFIDENCE: {MEMORY_FORENSICS_DATA.confidenceScore}%</span>
          </div>

          <button
            onClick={handleRescan}
            disabled={isScanning}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-semibold transition-all hover:shadow-[0_0_12px_rgba(6,182,212,0.3)]"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            {isScanning ? 'Scanning...' : 'Re-Analyze'}
          </button>
        </div>
      </div>

      {/* Memory Scan Status Card */}
      <div className="p-4 rounded-xl glass-panel border-cyan-500/20 bg-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <span className="text-slate-400">Memory Scan Status: </span>
            <strong className="text-emerald-400">{MEMORY_FORENSICS_DATA.scanStatus}</strong>
          </div>
          <span className="text-slate-600 hidden md:inline">|</span>
          <div className="hidden md:block">
            <span className="text-slate-400">Image: </span>
            <strong className="text-slate-200">{MEMORY_FORENSICS_DATA.dumpFile} ({MEMORY_FORENSICS_DATA.dumpSize})</strong>
          </div>
        </div>

        <div className="text-slate-400">
          Engine: <strong className="text-cyan-300">{MEMORY_FORENSICS_DATA.kernelEngine}</strong>
        </div>
      </div>

      {/* 5 Indicator Metric Cards (Exact Requirements) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {/* Suspicious Threads */}
        <div className="p-3.5 rounded-xl glass-panel border-red-500/30 bg-red-950/20">
          <div className="flex items-center justify-between text-xs font-mono text-red-300">
            <span>Suspicious Threads</span>
            <Activity className="w-4 h-4 text-red-400 animate-pulse" />
          </div>
          <div className="text-2xl font-black font-cyber text-red-400 mt-1">
            {MEMORY_FORENSICS_DATA.indicators.suspiciousThreads}
          </div>
          <div className="text-[10px] text-red-300 font-mono mt-0.5">
            Unhooked Thread Execution
          </div>
        </div>

        {/* Hidden Processes */}
        <div className="p-3.5 rounded-xl glass-panel border-amber-500/30 bg-amber-950/20">
          <div className="flex items-center justify-between text-xs font-mono text-amber-300">
            <span>Hidden Processes</span>
            <Crosshair className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black font-cyber text-amber-300 mt-1">
            {MEMORY_FORENSICS_DATA.indicators.hiddenProcesses}
          </div>
          <div className="text-[10px] text-amber-400 font-mono mt-0.5">
            DKOM EPROCESS Unlink
          </div>
        </div>

        {/* Injected Modules */}
        <div className="p-3.5 rounded-xl glass-panel border-purple-500/30 bg-purple-950/20">
          <div className="flex items-center justify-between text-xs font-mono text-purple-300">
            <span>Injected Modules</span>
            <Layers className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black font-cyber text-purple-300 mt-1">
            {MEMORY_FORENSICS_DATA.indicators.injectedModules}
          </div>
          <div className="text-[10px] text-purple-400 font-mono mt-0.5">
            Reflective DLL / RWX
          </div>
        </div>

        {/* Credential Theft Indicators */}
        <div className="p-3.5 rounded-xl glass-panel border-pink-500/30 bg-pink-950/20">
          <div className="flex items-center justify-between text-xs font-mono text-pink-300">
            <span>Credential Theft</span>
            <Flame className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-2xl font-black font-cyber text-pink-300 mt-1">
            {MEMORY_FORENSICS_DATA.indicators.credentialTheft}
          </div>
          <div className="text-[10px] text-pink-400 font-mono mt-0.5">
            LSASS Handle Dumping
          </div>
        </div>

        {/* Rootkit Indicators */}
        <div className="p-3.5 rounded-xl glass-panel border-cyan-500/30 bg-cyan-950/20 col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
            <span>Rootkit Indicators</span>
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black font-cyber text-cyan-300 mt-1">
            {MEMORY_FORENSICS_DATA.indicators.rootkitIndicators}
          </div>
          <div className="text-[10px] text-cyan-400 font-mono mt-0.5">
            SSDT &amp; IRP Dispatch Hooks
          </div>
        </div>
      </div>

      {/* Visualizations: Memory Map & Process Relationship Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* VISUALIZATION 1: MEMORY MAP (INTERACTIVE GRID) */}
        <div className="p-5 rounded-2xl glass-panel border-cyan-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-bold text-white font-cyber uppercase tracking-wider">
                  Visual Memory Map (0x00000000 - 0x7FFFFFFF)
                </h2>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Click blocks to inspect</span>
            </div>
            <p className="text-xs text-slate-400 font-mono mb-4">
              Process virtual address descriptor (VAD) allocations in target PID 6120 (svchost.exe)
            </p>

            {/* Interactive Memory Map Blocks Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-4">
              {MEMORY_FORENSICS_DATA.memoryMapGrid.map((block, idx) => {
                const isSelected = selectedMemoryRegion.range === block.range;
                const isThreat = block.color === '#ef4444' || block.color === '#f97316' || block.color === '#ec4899';

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedMemoryRegion(block);
                      addToast('Memory Segment Inspected', `Loaded ${block.range} (${block.type})`, 'info');
                    }}
                    className={`p-2 rounded-xl text-left border transition-all text-xs font-mono relative overflow-hidden ${
                      isSelected
                        ? 'border-cyan-400 ring-2 ring-cyan-500/30 bg-slate-800'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-900/60'
                    }`}
                  >
                    <div
                      className="absolute top-0 left-0 bottom-0 w-1"
                      style={{ backgroundColor: block.color }}
                    />
                    <div className="pl-2">
                      <div className="font-bold text-slate-200 text-[11px] truncate">{block.range}</div>
                      <div className="text-[10px] truncate" style={{ color: block.color }}>
                        {block.type}
                      </div>
                      <div className="text-[9px] text-slate-400 mt-1 truncate">
                        {block.status}
                      </div>
                    </div>
                    {isThreat && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Region Detailed Inspector Box */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-cyan-300 font-bold">
                  Region: {selectedMemoryRegion.range}
                </span>
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                  style={{ backgroundColor: `${selectedMemoryRegion.color}30`, color: selectedMemoryRegion.color }}
                >
                  {selectedMemoryRegion.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-300 text-[11px]">
                <div>Classification: <strong>{selectedMemoryRegion.type}</strong></div>
                <div>Allocation Base: <strong>0x000001D48A900000</strong></div>
                <div>Memory Protection: <strong className="text-red-400">PAGE_EXECUTE_READWRITE</strong></div>
                <div>Mapped Binary: <strong>Reflective CobaltStrike.dll</strong></div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-mono">Heuristic RWX Detection Active</span>
            <button
              onClick={handleExtractPayload}
              className="px-3 py-1.5 rounded-lg bg-red-950 hover:bg-red-900 text-red-200 border border-red-500/40 text-xs font-mono font-semibold transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Dump RWX Shellcode
            </button>
          </div>
        </div>

        {/* VISUALIZATION 2: PROCESS RELATIONSHIP GRAPH (PROCESS TREE) */}
        <div className="p-5 rounded-2xl glass-panel-glow border-purple-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-purple-400" />
                <h2 className="text-sm font-bold text-white font-cyber uppercase tracking-wider">
                  Process Relationship Graph &amp; Injected Threads
                </h2>
              </div>
              <span className="text-[10px] font-mono text-purple-400">Parent-Child Tree</span>
            </div>
            <p className="text-xs text-slate-400 font-mono mb-4">
              Real-time visualization of process lineage and reflective DLL code injection paths
            </p>

            {/* Tree Graph Display */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3 font-mono text-xs">
              {/* Root Parent */}
              <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold text-[10px]">PID 688</span>
                <span className="text-slate-200 font-bold">wininit.exe</span>
                <span className="text-slate-500 text-[10px] ml-auto">Clean (System)</span>
              </div>

              {/* Child Level 1 */}
              <div className="ml-6 pl-4 border-l-2 border-slate-700 space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold text-[10px]">PID 720</span>
                  <span className="text-slate-200 font-bold">services.exe</span>
                  <span className="text-slate-500 text-[10px] ml-auto">Clean</span>
                </div>

                {/* Child Level 2 (Target Hollowed Process) */}
                <div className="ml-6 pl-4 border-l-2 border-red-500/80 space-y-3">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-red-950/40 border border-red-500/50 text-red-200 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 font-bold text-[10px]">PID 6120</span>
                      <strong className="text-white">svchost.exe</strong>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-900/60 text-red-200 font-bold">
                        HOLLOWED / INJECTED
                      </span>
                    </div>
                    <span className="text-[10px] text-red-300">Memory RWX</span>
                  </div>

                  {/* Malicious Spawned Leaves */}
                  <div className="ml-6 pl-4 border-l-2 border-purple-500/80 space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-purple-950/30 border border-purple-500/40 text-purple-200">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-purple-900 text-purple-300 font-bold text-[10px]">PID 4812</span>
                        <span className="text-white font-semibold">powershell.exe -enc</span>
                      </div>
                      <span className="text-[10px] text-purple-300">Reflective Loader</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-purple-950/30 border border-purple-500/40 text-purple-200">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-purple-900 text-purple-300 font-bold text-[10px]">PID 8892</span>
                        <span className="text-white font-semibold">adfind.exe</span>
                      </div>
                      <span className="text-[10px] text-purple-300">Discovery Tool</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Threat Lineage: Explorer ➔ PowerShell ➔ Svchost Hollow</span>
            <span className="text-cyan-400">Confidence: 98% Correlated</span>
          </div>
        </div>
      </div>

      {/* Volatility Demo Findings Table */}
      <div className="p-5 rounded-2xl glass-panel border-cyan-500/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold text-white font-cyber uppercase tracking-wider">
                Volatility &amp; Rekall Findings Breakdown
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Deep forensic artifacts extracted from physical memory dump image
            </p>
          </div>
          <button
            onClick={handleExtractPayload}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
          >
            Extract Raw Shellcode <Download className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {MEMORY_FORENSICS_DATA.findings.map((f, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/30 transition-all font-mono text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold uppercase text-[10px]">
                    Plugin: {f.plugin}
                  </span>
                  <strong className="text-white">{f.process} (PID {f.pid})</strong>
                  <span className="text-slate-400 text-[11px]">@{f.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-red-300 px-2 py-0.5 rounded bg-red-950/80 border border-red-500/30 font-bold">
                    {f.protection}
                  </span>
                  <span className="text-[10px] text-purple-300 font-bold">
                    Certainty: {f.confidence}
                  </span>
                </div>
              </div>

              <p className="text-slate-300">{f.threat}</p>

              {f.disassembly && (
                <div className="mt-2 p-2.5 rounded-lg bg-black/60 border border-slate-800 text-[11px] text-emerald-400 font-mono whitespace-pre-wrap overflow-x-auto">
                  {f.disassembly}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
