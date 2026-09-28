import React, { useState } from 'react';
import { useSOC } from '../../context/SOCContext';
import { INITIAL_SETTINGS } from '../../data/mockData';
import {
  Sliders,
  Laptop,
  Cloud,
  Users,
  ShieldCheck,
  FileText,
  Bell,
  Copy,
  Check,
  RefreshCw,
  Download,
  Send,
  Lock,
  Radio,
  Zap,
} from 'lucide-react';
import { triggerConfetti, downloadMockFile } from '../../utils/cyberEffects';

export default function SettingsModule() {
  const { addToast } = useSOC();

  const [activeSection, setActiveSection] = useState('agents');
  const [copiedCmd, setCopiedCmd] = useState('');
  const [cloudSyncing, setCloudSyncing] = useState(false);
  const [cloudSyncEnabled, setCloudSyncEnabled] = useState(true);
  const [autoContainment, setAutoContainment] = useState(true);
  const [rbacMatrix, setRbacMatrix] = useState(INITIAL_SETTINGS.rbacMatrix);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(type);
    addToast('Command Copied', `Copied ${type} sensor deployment command to clipboard.`, 'info');
    setTimeout(() => setCopiedCmd(''), 3000);
  };

  const handleSyncNow = () => {
    setCloudSyncing(true);
    addToast('NTRO Cloud Sync', 'Establishing post-quantum encrypted tunnel to ntro-soc-central.gov.in:9443...', 'info');
    setTimeout(() => {
      setCloudSyncing(false);
      triggerConfetti();
      addToast('Sync Complete', 'Telemetry data synchronized with NTRO national SOC relay.', 'success');
    }, 2000);
  };

  const handleToggleRbac = (rowIndex, roleKey) => {
    setRbacMatrix((prev) =>
      prev.map((row, idx) => {
        if (idx === rowIndex) {
          const updated = { ...row, [roleKey]: !row[roleKey] };
          addToast('RBAC Policy Updated', `Updated permission "${row.permission}" for ${roleKey}.`, 'info');
          return updated;
        }
        return row;
      })
    );
  };

  const handleGenerateReportTemplate = (templateName) => {
    const report = `======================================================================\nJOCKY FORENSIC REPORT: ${templateName}\n======================================================================\nAuthor: Rahul Shah, Lead SOC Analyst (NTRO Clearance)\nDate: ${new Date().toISOString()}\nCompliance: Section 65B Indian Evidence Act // CERT-In\n\nEXECUTIVE OVERVIEW:\nPlatform JOCKY successfully detected, contained, and triaged critical APT intrusion on node PC-101. All volatile memory regions, packet traces, and driver manifests are cryptographically verified with SHA-256 digests.\n\nRECOMMENDED ACTIONS FOR SIH COMMITTEE:\n1. Full deployment across smart city endpoints\n2. Real-time synchronization with state SOC relays\n3. Continued automated SOAR containment\n======================================================================`;
    downloadMockFile(`${templateName.replace(/\s+/g, '_')}_Template.txt`, report);
    triggerConfetti();
    addToast('Template Generated', `${templateName} downloaded to disk.`, 'success');
  };

  const handleTestWebhook = () => {
    triggerConfetti();
    addToast('Webhook Ping Dispatched', 'Test payload sent to Slack/NTRO Relay. Response: 200 OK.', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl glass-panel-glow border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-[#0a1224]/90 to-purple-950/40">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold font-cyber tracking-wide text-white">
              PLATFORM CONFIGURATION &amp; GOVERNANCE SETTINGS
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Agent fleet provisioning, NTRO cloud sync, role-based access control (RBAC) &amp; compliance templates
          </p>
        </div>

        <button
          onClick={handleSyncNow}
          disabled={cloudSyncing}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)]"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${cloudSyncing ? 'animate-spin' : ''}`} />
          {cloudSyncing ? 'Synchronizing...' : 'Sync with NTRO Gateway'}
        </button>
      </div>

      {/* Navigation Tabs for All 6 Settings Modules */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl glass-panel border-cyan-500/20 overflow-x-auto text-xs font-mono">
        {[
          { id: 'agents', label: 'Agent Management', icon: Laptop },
          { id: 'cloud', label: 'Cloud Sync', icon: Cloud },
          { id: 'roles', label: 'User Roles', icon: Users },
          { id: 'rbac', label: 'RBAC Permissions', icon: ShieldCheck },
          { id: 'reports', label: 'Report Templates', icon: FileText },
          { id: 'notifications', label: 'Notification Settings', icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl shrink-0 transition-all ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: AGENT MANAGEMENT */}
      {activeSection === 'agents' && (
        <div className="p-6 rounded-2xl glass-panel border-cyan-500/20 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-sm font-bold font-cyber text-white uppercase tracking-wider">
                JOCKY EDR &amp; Forensic Sensor Provisioning
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Current Sensor Fleet Version: <strong className="text-cyan-300">v4.2.1-ntro-stable</strong> (532 Endpoints Installed)
              </p>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
              ALL SENSORS TAMPER-PROTECTED
            </span>
          </div>

          {/* Deployment Commands */}
          <div className="space-y-4 font-mono text-xs">
            <div>
              <span className="text-slate-300 font-semibold block mb-1.5">
                Windows PowerShell Deployment (One-Liner):
              </span>
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/70 border border-slate-800 text-cyan-300">
                <code className="text-xs truncate mr-2">
                  Invoke-WebRequest -Uri "https://soc.jocky.gov.in/agent/win64/install.ps1" -OutFile install.ps1; .\install.ps1 -Token "NTRO-SEC-2026-X99"
                </code>
                <button
                  onClick={() =>
                    handleCopy(
                      'Invoke-WebRequest -Uri "https://soc.jocky.gov.in/agent/win64/install.ps1" -OutFile install.ps1; .\\install.ps1 -Token "NTRO-SEC-2026-X99"',
                      'Windows'
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-200 border border-cyan-500/40 flex items-center gap-1 shrink-0"
                >
                  {copiedCmd === 'Windows' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCmd === 'Windows' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div>
              <span className="text-slate-300 font-semibold block mb-1.5">
                Linux / eBPF Sensor Deployment (Bash):
              </span>
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/70 border border-slate-800 text-emerald-400">
                <code className="text-xs truncate mr-2">
                  curl -fsSL https://soc.jocky.gov.in/agent/linux/install.sh | sudo bash -s -- --token "NTRO-SEC-2026-X99"
                </code>
                <button
                  onClick={() =>
                    handleCopy(
                      'curl -fsSL https://soc.jocky.gov.in/agent/linux/install.sh | sudo bash -s -- --token "NTRO-SEC-2026-X99"',
                      'Linux'
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-200 border border-emerald-500/40 flex items-center gap-1 shrink-0"
                >
                  {copiedCmd === 'Linux' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCmd === 'Linux' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: CLOUD SYNC */}
      {activeSection === 'cloud' && (
        <div className="p-6 rounded-2xl glass-panel border-cyan-500/20 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-sm font-bold font-cyber text-white uppercase tracking-wider">
                NTRO Central SOC Cloud Synchronization
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Encrypted tunnel status, cryptographic keys &amp; peer replication
              </p>
            </div>
            <button
              onClick={() => {
                setCloudSyncEnabled(!cloudSyncEnabled);
                addToast('Cloud Sync', cloudSyncEnabled ? 'Auto sync disabled' : 'Auto sync enabled', 'info');
              }}
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                cloudSyncEnabled
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {cloudSyncEnabled ? 'ACTIVE • CONNECTED' : 'PAUSED'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px]">Cloud Target Gateway:</span>
              <strong className="text-cyan-300 text-sm">ntro-soc-central.gov.in:9443</strong>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px]">Tunnel Cipher:</span>
              <strong className="text-purple-300 text-sm">AES-256-GCM + Kyber-1024</strong>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px]">Last Successful Heartbeat:</span>
              <strong className="text-emerald-400 text-sm">21:05:12 IST (0s latency)</strong>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: USER ROLES */}
      {activeSection === 'roles' && (
        <div className="p-6 rounded-2xl glass-panel border-cyan-500/20 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-sm font-bold font-cyber text-white uppercase tracking-wider">
                Authorized SOC Roles &amp; Personnel
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Role hierarchies and active clearance levels
              </p>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {INITIAL_SETTINGS.roles.map((role) => (
              <div
                key={role.id}
                className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{role.name}</span>
                    <span className="text-[10px] text-cyan-400 px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-500/40">
                      {role.users} Active Analysts
                    </span>
                  </div>
                  <div className="text-slate-400 text-[11px] mt-1">
                    Permissions: {role.permissions.join(' • ')}
                  </div>
                </div>

                <button
                  onClick={() => addToast('Role Settings', `Editing permissions for ${role.name}`, 'info')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors shrink-0"
                >
                  Configure Role
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: RBAC PERMISSIONS */}
      {activeSection === 'rbac' && (
        <div className="p-6 rounded-2xl glass-panel border-cyan-500/20 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-sm font-bold font-cyber text-white uppercase tracking-wider">
                Role-Based Access Control (RBAC) Permission Matrix
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Toggle interactive permissions for individual operations tiers
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">FORENSIC OPERATION</th>
                  <th className="py-3 px-4 text-center">SUPER ADMIN</th>
                  <th className="py-3 px-4 text-center">T3 FORENSICS LEAD</th>
                  <th className="py-3 px-4 text-center">T1 SOC ANALYST</th>
                  <th className="py-3 px-4 text-center">LEGAL AUDITOR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {rbacMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/50">
                    <td className="py-3 px-4 font-semibold text-white">{row.permission}</td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={row.superAdmin}
                        onChange={() => handleToggleRbac(idx, 'superAdmin')}
                        className="w-4 h-4 rounded text-cyan-500 focus:ring-0 accent-cyan-400 cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={row.t3Lead}
                        onChange={() => handleToggleRbac(idx, 't3Lead')}
                        className="w-4 h-4 rounded text-cyan-500 focus:ring-0 accent-cyan-400 cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={row.t1Analyst}
                        onChange={() => handleToggleRbac(idx, 't1Analyst')}
                        className="w-4 h-4 rounded text-cyan-500 focus:ring-0 accent-cyan-400 cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={row.auditor}
                        onChange={() => handleToggleRbac(idx, 'auditor')}
                        className="w-4 h-4 rounded text-cyan-500 focus:ring-0 accent-cyan-400 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 5: REPORT TEMPLATES */}
      {activeSection === 'reports' && (
        <div className="p-6 rounded-2xl glass-panel border-cyan-500/20 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-sm font-bold font-cyber text-white uppercase tracking-wider">
                Forensic Report Generators &amp; Compliance Templates
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Generate instant legal affidavits, CERT-In compliance filings &amp; SIH executive presentations
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-cyan-400 font-bold block text-sm">SIH Hackathon Pitch Executive Summary</span>
                <p className="text-slate-400 text-xs mt-1">
                  Presentation-ready synopsis highlighting fleet threat containment, live Volatility integration &amp; memory graph architecture.
                </p>
              </div>
              <button
                onClick={() => handleGenerateReportTemplate('SIH_Executive_Pitch_Report')}
                className="w-full py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download SIH Pitch Report
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-purple-300 font-bold block text-sm">Sec. 65B Indian Evidence Act Affidavit</span>
                <p className="text-slate-400 text-xs mt-1">
                  Legally formatted electronic evidence certificate with SHA-256 HMAC verification tokens and custodian sign-off.
                </p>
              </div>
              <button
                onClick={() => handleGenerateReportTemplate('Sec_65B_Indian_Evidence_Act_Affidavit')}
                className="w-full py-2 rounded-xl bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-500/40 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download Legal Affidavit
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-emerald-300 font-bold block text-sm">CERT-In 6-Hour Mandatory Incident Filing</span>
                <p className="text-slate-400 text-xs mt-1">
                  Standardized reporting format for high-severity ransomware and C2 intrusions under Indian cybersecurity regulations.
                </p>
              </div>
              <button
                onClick={() => handleGenerateReportTemplate('CERT_In_Incident_Filing')}
                className="w-full py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download CERT-In Filing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: NOTIFICATION SETTINGS */}
      {activeSection === 'notifications' && (
        <div className="p-6 rounded-2xl glass-panel border-cyan-500/20 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-sm font-bold font-cyber text-white uppercase tracking-wider">
                Emergency Alerting &amp; Webhook Escalation
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Push feeds to Slack, SMS gateway &amp; automated containment trigger
              </p>
            </div>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <strong className="text-white">Slack / Teams SOC Webhook Relay:</strong>
                <span className="text-slate-400 block text-[11px] mt-0.5">{INITIAL_SETTINGS.notifications.socSlackWebhook}</span>
              </div>
              <button
                onClick={handleTestWebhook}
                className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 shrink-0"
              >
                Test Webhook Ping
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <strong className="text-white">Emergency SMS Escalation:</strong>
                <span className="text-slate-400 block text-[11px] mt-0.5">{INITIAL_SETTINGS.notifications.smsEmergencyEscalation}</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold">CONFIGURED</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <strong className="text-white">Automatic Quarantine on P1 Critical Detection:</strong>
                <span className="text-slate-400 block text-[11px] mt-0.5">
                  Isolate network adapter automatically without manual analyst confirmation
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoContainment}
                onChange={() => {
                  setAutoContainment(!autoContainment);
                  addToast('Policy Updated', `Auto-containment on P1 set to ${!autoContainment}`, 'info');
                }}
                className="w-5 h-5 rounded text-cyan-500 accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
