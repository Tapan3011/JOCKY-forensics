import React, { useState, useEffect } from 'react';
import { useSOC } from '../../context/SOCContext';
import { ATTACK_TIMELINE_EVENTS } from '../../data/mockData';
import {
  GitCommit,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Terminal,
  ShieldAlert,
  Radio,
  Globe,
  Database,
  MailWarning,
  LogIn,
  AlertTriangle,
  Download,
  FileCode2,
  Clock,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { downloadMockFile, playCyberSound } from '../../utils/cyberEffects';

export default function AttackTimelineModule() {
  const { addToast } = useSOC();
  const [selectedEvent, setSelectedEvent] = useState(ATTACK_TIMELINE_EVENTS[2]); // Suspicious process default
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackIndex, setPlaybackIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Playback timer
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setPlaybackIndex((prev) => {
          if (prev >= ATTACK_TIMELINE_EVENTS.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          const next = prev + 1;
          setSelectedEvent(ATTACK_TIMELINE_EVENTS[next]);
          return next;
        });
      }, 2500 / playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed]);

  const handleExportTimeline = () => {
    const content = JSON.stringify(ATTACK_TIMELINE_EVENTS, null, 2);
    downloadMockFile('JOCKY_Attack_KillChain_Timeline.json', content);
    addToast('Timeline Exported', 'Forensic chronology saved to JSON.', 'success');
  };

  const getIcon = (title) => {
    if (title.includes('Login')) return LogIn;
    if (title.includes('Attachment')) return MailWarning;
    if (title.includes('Process')) return Terminal;
    if (title.includes('Registry')) return Database;
    if (title.includes('Beaconing')) return Radio;
    if (title.includes('External')) return Globe;
    if (title.includes('Alert')) return AlertTriangle;
    return ShieldAlert;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner & Playback Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl glass-panel-glow border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-[#0a1224]/90 to-purple-950/40">
        <div>
          <div className="flex items-center gap-2">
            <GitCommit className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold font-cyber tracking-wide text-white">
              ANIMATED ATTACK TIMELINE &amp; KILL CHAIN RECONSTRUCTION
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Millisecond-precise forensic kill chain sequence for Host PC-101 (08:32 IST to 09:01 IST)
          </p>
        </div>

        {/* Playback Controls Bar */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => {
              setPlaybackIndex(0);
              setSelectedEvent(ATTACK_TIMELINE_EVENTS[0]);
            }}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Rewind to Start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors shadow-[0_0_10px_rgba(6,182,212,0.4)]"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Pause' : 'Replay Kill Chain'}</span>
          </button>

          <button
            onClick={() => {
              setPlaybackIndex((prev) => Math.min(ATTACK_TIMELINE_EVENTS.length - 1, prev + 1));
              setSelectedEvent(ATTACK_TIMELINE_EVENTS[Math.min(ATTACK_TIMELINE_EVENTS.length - 1, playbackIndex + 1)]);
            }}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Step Forward"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 pl-2 border-l border-slate-800 text-[10px]">
            {[1, 2, 5].map((speed) => (
              <button
                key={speed}
                onClick={() => setPlaybackSpeed(speed)}
                className={`px-1.5 py-0.5 rounded ${
                  playbackSpeed === speed ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-500/40' : 'text-slate-400'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          <button
            onClick={handleExportTimeline}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors ml-1"
            title="Download Timeline JSON"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Timeline View Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Animated Vertical Timeline (Exact Requirement Sequence) */}
        <div className="lg:col-span-7 p-6 rounded-2xl glass-panel border-cyan-500/20 relative">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold text-white font-cyber uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              Chronological Kill Chain (8 Milestone Events)
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              Event {playbackIndex + 1} of {ATTACK_TIMELINE_EVENTS.length}
            </span>
          </div>

          {/* Vertical Connecting Line */}
          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-purple-500 before:to-red-500">
            {ATTACK_TIMELINE_EVENTS.map((item, index) => {
              const Icon = getIcon(item.title);
              const isCurrent = selectedEvent?.title === item.title;
              const isCritical = item.severity === 'Critical';
              const isHigh = item.severity === 'High';

              return (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedEvent(item);
                    setPlaybackIndex(index);
                  }}
                  className={`relative group cursor-pointer transition-all duration-200`}
                >
                  {/* Timeline Dot with pulsing ring */}
                  <div
                    className={`absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-cyan-400 text-slate-950 scale-125 shadow-[0_0_15px_#22d3ee] z-10'
                        : isCritical
                        ? 'bg-red-950 border border-red-500 text-red-300'
                        : isHigh
                        ? 'bg-purple-950 border border-purple-500 text-purple-300'
                        : 'bg-slate-900 border border-slate-700 text-slate-400'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                  </div>

                  {/* Card Content */}
                  <div
                    className={`p-3.5 rounded-xl border text-xs font-mono transition-all ${
                      isCurrent
                        ? 'bg-slate-900 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)] translate-x-1'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black font-cyber text-cyan-300 tracking-wider">
                          {item.time}
                        </span>
                        <span className="text-sm font-bold text-white font-sans">{item.title}</span>
                      </div>
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                          isCritical
                            ? 'bg-red-950 text-red-300 border border-red-500/40'
                            : isHigh
                            ? 'bg-purple-950 text-purple-300 border border-purple-500/40'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {item.category}
                      </span>
                    </div>

                    <p className="text-slate-300 leading-relaxed font-sans text-xs">
                      {item.details}
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                      <span>Host: <strong className="text-cyan-300">{item.host}</strong> ({item.user})</span>
                      <span className="text-purple-300 font-semibold">{item.eventCode}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Forensic Event Inspector */}
        <div className="lg:col-span-5 p-6 rounded-2xl glass-panel-glow border-purple-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <span className="text-[10px] text-purple-400 font-mono uppercase tracking-widest block">
                  Detailed Telemetry Inspector
                </span>
                <h3 className="text-base font-bold font-cyber text-white">
                  {selectedEvent.title} ({selectedEvent.time} IST)
                </h3>
              </div>
              <span
                className={`text-[10px] px-2.5 py-1 rounded font-bold uppercase font-mono ${
                  selectedEvent.severity === 'Critical'
                    ? 'bg-red-950 text-red-300 border border-red-500/40'
                    : 'bg-purple-950 text-purple-300 border border-purple-500/40'
                }`}
              >
                {selectedEvent.severity}
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[11px]">System Timestamp:</span>
                <div className="text-white font-bold">{selectedEvent.timestamp}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[11px]">Audit Provider &amp; Event Code:</span>
                <div className="text-cyan-300 font-bold">{selectedEvent.eventCode}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[11px]">Narrative Forensic Observation:</span>
                <p className="text-slate-200 font-sans leading-relaxed text-xs">
                  {selectedEvent.details}
                </p>
              </div>

              {/* Raw Event Log Payload */}
              <div className="space-y-1">
                <span className="text-slate-400 text-[11px]">Raw Telemetry EDR Payload:</span>
                <div className="p-3 rounded-xl bg-black/70 border border-slate-800 text-[11px] text-emerald-400 font-mono break-all whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {selectedEvent.rawLog}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">NTRO Chain of Custody Tagged</span>
            <button
              onClick={() => {
                downloadMockFile(`event_log_${selectedEvent.time.replace(':', '')}.xml`, selectedEvent.rawLog);
                addToast('Log Extracted', `Raw EVTX stream for ${selectedEvent.time} saved.`, 'success');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
