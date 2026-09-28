import React, { useState, useRef, useEffect } from 'react';
import { useSOC } from '../../context/SOCContext';
import { AI_INVESTIGATOR_PRESETS } from '../../data/mockData';
import {
  Bot,
  Sparkles,
  Send,
  User,
  ShieldAlert,
  Cpu,
  Flame,
  Download,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  Radio,
} from 'lucide-react';
import { triggerConfetti, downloadMockFile } from '../../utils/cyberEffects';

export default function AIInvestigatorModule() {
  const { isolateEndpoint, dumpEndpointMemory, addToast } = useSOC();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      timestamp: '21:05:00',
      text: 'Greetings Analyst Rahul Shah. I am **JOCKY AI**, your autonomous digital forensics investigator fine-tuned on NTRO & CERT-In threat taxonomy. How can I assist with telemetry triage or root cause analysis?',
      tacticsBreakdown: null,
      riskScore: null,
      actions: null,
    },
    {
      id: 2,
      sender: 'user',
      timestamp: '21:05:10',
      text: 'Why is endpoint PC-101 compromised?',
      tacticsBreakdown: null,
      riskScore: null,
      actions: null,
    },
    {
      id: 3,
      sender: 'ai',
      timestamp: '21:05:12',
      text: 'Comprehensive forensic analysis of endpoint PC-101 telemetry confirms active intrusion:',
      tacticsBreakdown: [
        {
          tactic: 'Initial Access',
          detail: 'Malicious attachment detected: User vikram.admin mounted RFQ_Invoice_Sep2026.iso (downloaded via Chrome at 08:35:48), triggering execution of an obfuscated LNK shortcut.',
        },
        {
          tactic: 'Execution',
          detail: 'Encoded powershell execution observed: powershell.exe spawned with arguments -nop -w hidden -enc JABzAD0... executing an in-memory reflective stager.',
        },
        {
          tactic: 'Persistence',
          detail: 'Scheduled task created: TelemetrySync under \\Microsoft\\Windows\\AppID\\ pointing to C:\\ProgramData\\powershell_launcher.vbs, ensuring persistence across reboot.',
        },
        {
          tactic: 'Discovery',
          detail: 'Network enumeration performed: AdFind.exe and built-in CLI tools (net view, nltest /dclist) mapped Domain Admins and reachable finance domain controllers.',
        },
        {
          tactic: 'Command and Control',
          detail: 'External communication detected: Periodic HTTPS beaconing to 104.26.2.33:443 with 15% sleep jitter mimicking Microsoft CDN traffic.',
        },
      ],
      riskScore: 94,
      targetHost: 'PC-101',
      actions: ['Isolate PC-101 Now', 'Dump Volatile RAM', 'Export Investigation Affidavit'],
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (queryToSend) => {
    const query = queryToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Mock LLM generation delay
    setTimeout(() => {
      setIsTyping(false);

      // Check presets
      const matchedPreset = AI_INVESTIGATOR_PRESETS.find((p) =>
        p.query.toLowerCase().includes(query.toLowerCase()) || query.toLowerCase().includes(p.query.toLowerCase())
      );

      let aiResponseMsg;

      if (matchedPreset) {
        aiResponseMsg = {
          id: Date.now() + 1,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString(),
          text: matchedPreset.summary,
          tacticsBreakdown: matchedPreset.tacticsBreakdown,
          riskScore: matchedPreset.riskScore,
          targetHost: query.includes('PC-101') ? 'PC-101' : 'SRV-FIN-04',
          actions: ['Isolate Compromised Node', 'Dump Memory Artifacts', 'Export Case Dossier'],
        };
      } else {
        // Dynamic smart response for any custom user question
        aiResponseMsg = {
          id: Date.now() + 1,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString(),
          text: `Correlating real-time SOC signals for query: "${query}" across 532 fleet endpoints and active threat intel databases.`,
          tacticsBreakdown: [
            {
              tactic: 'Analysis Insight',
              detail: `Telemetry correlation confirms no widespread lateral spread for "${query}". Cross-referenced against 1,845 Sigma rules and MITRE ATT&CK Enterprise Matrix v14.`,
            },
            {
              tactic: 'Recommended Mitigation',
              detail: 'Maintain active memory monitoring on financial core assets and enforce zero-trust isolation on high-risk nodes.',
            },
          ],
          riskScore: 78,
          targetHost: 'PC-101',
          actions: ['Run Fleet Scan', 'Generate Investigation PDF'],
        };
      }

      setMessages((prev) => [...prev, aiResponseMsg]);
    }, 1200);
  };

  const handleAIAction = (action, host = 'PC-101') => {
    if (action.includes('Isolate')) {
      isolateEndpoint(host);
    } else if (action.includes('Dump')) {
      dumpEndpointMemory(host);
    } else {
      const affidavit = `======================================================================\nJOCKY AI AUTONOMOUS FORENSIC AFFIDAVIT\n======================================================================\nCase Target: ${host}\nRisk Score: 94% (CRITICAL)\nGenerated: ${new Date().toISOString()}\nSigner: JOCKY Neural DFIR Core // NTRO Clearance\n\nKILL-CHAIN BREAKDOWN:\n- Initial Access: Spearphishing ISO / LNK\n- Execution: Encoded PowerShell (PID 4812)\n- Persistence: Scheduled Task \\Microsoft\\Windows\\AppID\\TelemetrySync\n- Discovery: AdFind.exe active directory sweep\n- Command & Control: 104.26.2.33 HTTPS Beaconing\n\nLEGAL NOTICE: Generated under CERT-In Sec. 70B forensics evidentiary guidelines.\n======================================================================`;
      downloadMockFile(`AI_Forensics_Affidavit_${host}.txt`, affidavit);
      addToast('Affidavit Exported', `Signed legal investigation document for ${host} generated.`, 'success');
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col rounded-2xl glass-panel-glow border-cyan-500/30 overflow-hidden animate-in fade-in duration-300">
      {/* AI Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <Bot className="w-6 h-6 text-white" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold font-cyber text-white tracking-wide">
                JOCKY AI INVESTIGATOR
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                NTRO FORENSIC LLM v4.2
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Autonomous incident triage, MITRE kill-chain mapping &amp; real-time root-cause inference
            </p>
          </div>
        </div>

        {/* Clear Chat Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setMessages([messages[0]]);
              addToast('Chat Reset', 'Investigation dialogue refreshed.', 'info');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Conversation
          </button>
        </div>
      </div>

      {/* Suggested Quick Prompts Bar */}
      <div className="px-4 py-2.5 border-b border-slate-800/80 bg-slate-950/60 flex items-center gap-2 overflow-x-auto text-xs font-mono">
        <span className="text-slate-500 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyan-400" /> Suggested:
        </span>
        {[
          'Why is endpoint PC-101 compromised?',
          'Analyze memory dump indicators on SRV-FIN-04',
          'Draft an executive incident report for INC-2026-001',
          'Explain C2 beaconing pattern to 104.26.2.33',
        ].map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-colors shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Thread Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 max-w-4xl ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
            >
              {/* Avatar */}
              <div
                className={`p-2 rounded-xl shrink-0 ${
                  isAi
                    ? 'bg-gradient-to-tr from-cyan-600 to-purple-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                    : 'bg-slate-800 text-slate-300 border border-slate-700'
                }`}
              >
                {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Message Content Bubble */}
              <div
                className={`p-4 rounded-2xl text-xs font-mono leading-relaxed space-y-3 ${
                  isAi
                    ? 'bg-slate-900/90 border border-cyan-500/25 text-slate-200 shadow-xl'
                    : 'bg-cyan-950/80 border border-cyan-500/50 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                }`}
              >
                <div className="flex items-center justify-between gap-4 border-b border-slate-800/80 pb-2 text-[10px] text-slate-400">
                  <span className="font-bold text-cyan-300">{isAi ? 'JOCKY AI Investigator' : 'Rahul Shah (Analyst)'}</span>
                  <span>{msg.timestamp}</span>
                </div>

                <p className="text-slate-100 font-sans text-sm">{msg.text}</p>

                {/* Structured Tactics Breakdown (Exact Requirement) */}
                {msg.tacticsBreakdown && (
                  <div className="space-y-2.5 pt-2">
                    {msg.tacticsBreakdown.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-black/40 border border-slate-800 space-y-1"
                      >
                        <div className="flex items-center justify-between text-cyan-300 font-bold uppercase text-[11px]">
                          <span>{item.tactic}:</span>
                        </div>
                        <p className="text-slate-300 text-xs font-sans leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Risk Score Display (Exact Requirement) */}
                {msg.riskScore && (
                  <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 text-xs">Assessed System Risk Score:</span>
                      <div className="text-2xl font-black font-cyber text-red-400">
                        {msg.riskScore}%
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-red-950 text-red-300 font-bold text-xs border border-red-500/50">
                      CRITICAL SEVERITY
                    </span>
                  </div>
                )}

                {/* Interactive Embedded AI Action Buttons */}
                {msg.actions && (
                  <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-2">
                    {msg.actions.map((act, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAIAction(act, msg.targetHost)}
                        className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-all hover:shadow-[0_0_10px_rgba(6,182,212,0.3)] flex items-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        {act}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-600 to-purple-600 text-white">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/25 text-xs font-mono text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              JOCKY AI is analyzing memory tables and correlating kill-chain...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-900/90">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask JOCKY AI (e.g. 'Why is endpoint PC-101 compromised?')..."
            className="flex-1 bg-slate-950/80 rounded-xl px-4 py-3 text-xs font-mono text-white placeholder-slate-500 border border-slate-700/60 focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold font-mono text-xs transition-all shadow-[0_0_12px_rgba(6,182,212,0.4)] disabled:opacity-40 flex items-center gap-1.5"
          >
            <span>Investigate</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
