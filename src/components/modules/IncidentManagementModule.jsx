import React, { useState } from 'react';
import { useSOC } from '../../context/SOCContext';
import {
  ShieldAlert,
  Plus,
  UserCheck,
  Archive,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Filter,
  Search,
  X,
  Send,
  Download,
  FileText,
  User,
  ExternalLink,
} from 'lucide-react';
import { triggerConfetti, downloadMockFile } from '../../utils/cyberEffects';

export default function IncidentManagementModule() {
  const {
    incidents,
    createIncident,
    assignAnalyst,
    closeIncident,
    addIncidentNote,
    evidenceItems,
    addToast,
  } = useSOC();

  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(incidents[0]);
  const [evidenceDrawerOpen, setEvidenceDrawerOpen] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');

  // Form state for Create Case
  const [formData, setFormData] = useState({
    title: '',
    severity: 'High',
    assignedAnalyst: 'Rahul Shah',
    affectedAssets: 'PC-101',
    description: '',
  });

  const filteredIncidents = incidents.filter((inc) => {
    const matchesSeverity = severityFilter === 'All' || inc.severity === severityFilter;
    const matchesSearch =
      inc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.affectedAssets.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.assignedAnalyst.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  const handleCreateCaseSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    createIncident({
      title: formData.title,
      severity: formData.severity,
      assignedAnalyst: formData.assignedAnalyst,
      affectedAssets: formData.affectedAssets,
      description: formData.description,
    });

    setFormData({
      title: '',
      severity: 'High',
      assignedAnalyst: 'Rahul Shah',
      affectedAssets: 'PC-101',
      description: '',
    });
    setCreateModalOpen(false);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedIncident) return;
    addIncidentNote(selectedIncident.id, newNoteText);
    // update local selectedIncident
    setSelectedIncident((prev) => ({
      ...prev,
      notes: [...prev.notes, { author: 'Rahul Shah', time: 'Just now', text: newNoteText }],
    }));
    setNewNoteText('');
  };

  const handleExportIncidentReport = (inc) => {
    const text = `======================================================================\nJOCKY CASE DOSSIER: ${inc.id}\n======================================================================\nTitle: ${inc.title}\nSeverity: ${inc.severity}\nStatus: ${inc.status}\nAssigned Analyst: ${inc.assignedAnalyst}\nAffected Asset: ${inc.affectedAssets}\nCreated At: ${inc.createdAt}\n\nINVESTIGATION LOG:\n${inc.notes.map((n) => `[${n.time}] ${n.author}: ${n.text}`).join('\n')}\n\nSEALED UNDER CERT-In COMPLIANCE DIRECTIVE.\n======================================================================`;
    downloadMockFile(`Case_${inc.id}_Dossier.txt`, text);
    addToast('Case Exported', `Forensic dossier for ${inc.id} downloaded.`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl glass-panel-glow border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-[#100e24]/90 to-purple-950/40">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <h1 className="text-xl font-bold font-cyber tracking-wide text-white">
              INCIDENT MANAGEMENT &amp; CASE ORCHESTRATION
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Enterprise SOAR workflow, analyst triage, evidence linking &amp; SLA resolution tracking
          </p>
        </div>

        {/* Create Case Button */}
        <button
          onClick={() => setCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
        >
          <Plus className="w-4 h-4" />
          Create New Incident
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-3 rounded-xl glass-panel border-cyan-500/20">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-mono text-slate-400 font-semibold mr-1">Severity:</span>
          {['All', 'Critical', 'High', 'Medium', 'Low'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                severityFilter === sev
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search incident, analyst, asset..."
            className="w-full bg-slate-900/80 rounded-xl pl-9 pr-3 py-1.5 text-xs font-mono text-white placeholder-slate-500 border border-slate-700/60 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Main Incidents Table (Exact Columns: Incident ID, Severity, Assigned Analyst, Status, Affected Assets) */}
      <div className="rounded-2xl glass-panel border-cyan-500/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">INCIDENT ID</th>
                <th className="py-3.5 px-4 font-semibold">TITLE &amp; CLASSIFICATION</th>
                <th className="py-3.5 px-4 font-semibold">SEVERITY</th>
                <th className="py-3.5 px-4 font-semibold">ASSIGNED ANALYST</th>
                <th className="py-3.5 px-4 font-semibold">STATUS</th>
                <th className="py-3.5 px-4 font-semibold">AFFECTED ASSETS</th>
                <th className="py-3.5 px-4 font-semibold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredIncidents.map((inc) => {
                const isCritical = inc.severity === 'Critical';
                const isClosed = inc.status === 'Closed';

                return (
                  <tr
                    key={inc.id}
                    onClick={() => setSelectedIncident(inc)}
                    className={`hover:bg-cyan-950/20 cursor-pointer transition-colors ${
                      selectedIncident?.id === inc.id ? 'bg-cyan-950/30' : ''
                    }`}
                  >
                    {/* INCIDENT ID */}
                    <td className="py-3.5 px-4 font-bold text-cyan-300">
                      {inc.id}
                      <span className="text-[10px] text-slate-400 block font-normal">{inc.createdAt}</span>
                    </td>

                    {/* TITLE */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white max-w-sm truncate">{inc.title}</div>
                      <div className="flex items-center gap-1.5 mt-1">
                        {inc.tags.map((t) => (
                          <span key={t} className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* SEVERITY */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isCritical
                            ? 'bg-red-950 text-red-300 border border-red-500/40'
                            : inc.severity === 'High'
                            ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {isCritical && <AlertTriangle className="w-3 h-3 text-red-400" />}
                        {inc.severity}
                      </span>
                    </td>

                    {/* ASSIGNED ANALYST (Interactive Dropdown) */}
                    <td className="py-3.5 px-4">
                      <select
                        value={inc.assignedAnalyst}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => assignAnalyst(inc.id, e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-slate-200 text-xs font-mono focus:border-cyan-400 focus:outline-none"
                      >
                        <option value="Rahul Shah">Rahul Shah (Lead)</option>
                        <option value="Priya Sharma">Priya Sharma</option>
                        <option value="Vikram Malhotra">Vikram Malhotra</option>
                        <option value="Ananya Sen">Ananya Sen</option>
                      </select>
                    </td>

                    {/* STATUS */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          isClosed
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                            : 'bg-purple-950 text-purple-300 border border-purple-500/40'
                        }`}
                      >
                        {isClosed ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {inc.status}
                      </span>
                    </td>

                    {/* AFFECTED ASSETS */}
                    <td className="py-3.5 px-4 text-cyan-300 font-bold">
                      {inc.affectedAssets}
                    </td>

                    {/* ACTIONS */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                        {/* Evidence View */}
                        <button
                          onClick={() => {
                            setSelectedIncident(inc);
                            setEvidenceDrawerOpen(true);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-1"
                          title="View Linked Evidence Artifacts"
                        >
                          <Archive className="w-3.5 h-3.5" />
                          Evidence
                        </button>

                        {/* Close Incident */}
                        {!isClosed && (
                          <button
                            onClick={() => closeIncident(inc.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-200 border border-emerald-500/40 text-xs font-semibold transition-colors"
                            title="Close and seal incident"
                          >
                            Close Case
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Incident Detail & Real-Time Case Notes Drawer */}
      {selectedIncident && (
        <div className="p-5 rounded-2xl glass-panel border-cyan-500/20 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest">
                  Active Investigation Dossier
                </span>
                <h3 className="text-base font-bold font-cyber text-white">
                  {selectedIncident.id}: {selectedIncident.title}
                </h3>
              </div>
              <button
                onClick={() => handleExportIncidentReport(selectedIncident)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Export Dossier
              </button>
            </div>

            {/* Case Notes History */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">Forensic Investigation Notes:</span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedIncident.notes.map((note, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
                    <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
                      <span className="text-cyan-300 font-bold">{note.author}</span>
                      <span>{note.time}</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed font-sans text-xs">{note.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="flex items-center gap-2">
              <input
                type="text"
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Append forensic observation or containment step..."
                className="flex-1 bg-slate-950/80 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-slate-500 border border-slate-700/60 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-semibold transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Add Note
              </button>
            </form>
          </div>

          {/* Quick Case Metadata Sidebar */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="text-xs font-bold text-white border-b border-slate-800 pb-2">
              Case Metadata &amp; SLA
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Target Asset:</span>
              <span className="text-cyan-300 font-bold">{selectedIncident.affectedAssets}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Assigned Analyst:</span>
              <span className="text-purple-300 font-bold">{selectedIncident.assignedAnalyst}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">SLA Resolution Timer:</span>
              <span className="text-emerald-400 font-bold">{selectedIncident.slaRemaining}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Linked Evidences:</span>
              <button
                onClick={() => setEvidenceDrawerOpen(true)}
                className="text-cyan-400 hover:underline font-bold"
              >
                {selectedIncident.evidenceCount} Items Linked
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE CASE MODAL */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-2xl glass-panel-glow bg-[#0a0f1d]/98 border border-cyan-500/40 p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold font-cyber text-white">Create Security Incident</h3>
              </div>
              <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCaseSubmit} className="space-y-3.5 font-mono text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Incident Title / Alert Name:</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Cobalt Strike Ingress via Encoded PowerShell"
                  className="w-full bg-slate-900 rounded-xl px-3 py-2 text-white border border-slate-700 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Severity:</label>
                  <select
                    value={formData.severity}
                    onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                    className="w-full bg-slate-900 rounded-xl px-3 py-2 text-white border border-slate-700 focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Critical">Critical (P1)</option>
                    <option value="High">High (P2)</option>
                    <option value="Medium">Medium (P3)</option>
                    <option value="Low">Low (P4)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Assign Analyst:</label>
                  <select
                    value={formData.assignedAnalyst}
                    onChange={(e) => setFormData({ ...formData, assignedAnalyst: e.target.value })}
                    className="w-full bg-slate-900 rounded-xl px-3 py-2 text-white border border-slate-700 focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Rahul Shah">Rahul Shah (Lead)</option>
                    <option value="Priya Sharma">Priya Sharma</option>
                    <option value="Vikram Malhotra">Vikram Malhotra</option>
                    <option value="Ananya Sen">Ananya Sen</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Affected Assets:</label>
                <input
                  type="text"
                  required
                  value={formData.affectedAssets}
                  onChange={(e) => setFormData({ ...formData, affectedAssets: e.target.value })}
                  placeholder="e.g. PC-101, SRV-FIN-04"
                  className="w-full bg-slate-900 rounded-xl px-3 py-2 text-white border border-slate-700 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Triage Summary / Observation:</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Initial telemetry indicators, memory injections, or packet anomalies..."
                  className="w-full bg-slate-900 rounded-xl p-3 text-white border border-slate-700 focus:border-cyan-400 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                >
                  Create Incident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EVIDENCE VIEW DRAWER */}
      {evidenceDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl rounded-2xl glass-panel-glow bg-[#0a0f1d]/98 border border-cyan-500/40 p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Archive className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold font-cyber text-white">
                  Linked Forensic Evidences: {selectedIncident?.id}
                </h3>
              </div>
              <button onClick={() => setEvidenceDrawerOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {evidenceItems.slice(0, 3).map((item) => (
                <div key={item.id} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">{item.name}</span>
                    <span className="text-emerald-400 font-bold text-[10px]">{item.integrityStatus}</span>
                  </div>
                  <div className="text-slate-400 text-[11px] truncate">
                    File: <strong className="text-cyan-300">{item.filename}</strong> ({item.size})
                  </div>
                  <div className="text-[10px] text-slate-500 break-all">
                    SHA-256: {item.hashSha256}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Cryptographically Sealed Evidence Vault</span>
              <button
                onClick={() => setEvidenceDrawerOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-xs font-mono"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
