import React, { useState } from 'react';
import { useSOC } from '../../context/SOCContext';
import {
  Archive,
  Download,
  CheckCircle2,
  FileCheck,
  ShieldCheck,
  Plus,
  Search,
  HardDrive,
  Clock,
  Hash,
  X,
  FileText,
  Lock,
} from 'lucide-react';
import { triggerConfetti, downloadMockFile } from '../../utils/cyberEffects';

export default function EvidenceRepositoryModule() {
  const { evidenceItems, verifyEvidenceHash, addToast } = useSOC();

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedEvidence, setSelectedEvidence] = useState(evidenceItems[0]);
  const [custodyModalOpen, setCustodyModalOpen] = useState(false);
  const [addEvidenceModalOpen, setAddEvidenceModalOpen] = useState(false);

  // Form for adding new mock evidence
  const [newEvdName, setNewEvdName] = useState('');
  const [newEvdType, setNewEvdType] = useState('Memory Dump');

  const filteredEvidence = evidenceItems.filter((item) => {
    const matchesType = typeFilter === 'All' || item.type === typeFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hashSha256.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleDownloadItem = (item) => {
    const container = `// JOCKY FORENSIC EVIDENCE CONTAINER\n// Artifact: ${item.name}\n// Filename: ${item.filename}\n// Type: ${item.type}\n// Size: ${item.size}\n// SHA-256: ${item.hashSha256}\n// MD5: ${item.hashMd5}\n// Collection Time: ${item.collectionTime}\n// Custody Officer: ${item.collectedBy}\n// Status: CRYPTOGRAPHICALLY SEALED // NTRO HSM VALIDATED\n\n[RAW BINARY CONTAINER HEADER STAMPED]`;
    downloadMockFile(item.filename, container);
    triggerConfetti();
    addToast('Evidence Downloaded', `Saved forensic artifact ${item.filename} with HMAC integrity verification.`, 'success');
  };

  const handleVerifyIntegrity = (item) => {
    verifyEvidenceHash(item.id);
  };

  const handleExportCustodyAffidavit = () => {
    const text = `======================================================================\nJOCKY FORENSIC CHAIN OF CUSTODY CERTIFICATE\n======================================================================\nTarget Case: INC-2026-001 (PC-101)\nAuditor: NTRO Special Cyber Operations Group\nVerification Time: ${new Date().toISOString()}\n\nLOGGED EVIDENCE ARTIFACTS:\n${evidenceItems
      .map(
        (e) =>
          `[${e.id}] ${e.name}\nFilename: ${e.filename}\nSize: ${e.size}\nSHA-256: ${e.hashSha256}\nCollection: ${e.collectionTime}\nOfficer: ${e.collectedBy}\nIntegrity: ${e.integrityStatus}\n----------------------------------------------------------------------`
      )
      .join('\n')}\n\nLEGAL STATEMENT:\nAll evidence items are stored on immutable append-only WORM storage under CERT-In Sec. 70B custody guidelines. Cryptographic signatures verified against NTRO HSM Root Keys.\n======================================================================`;
    downloadMockFile('JOCKY_Chain_of_Custody_Affidavit.txt', text);
    triggerConfetti();
    addToast('Affidavit Exported', 'Forensic chain-of-custody document downloaded.', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl glass-panel-glow border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-[#071524]/90 to-purple-950/40">
        <div>
          <div className="flex items-center gap-2">
            <Archive className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold font-cyber tracking-wide text-white">
              FORENSIC EVIDENCE VAULT &amp; CHAIN OF CUSTODY
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Immutable cryptographic storage (SHA-256 HMAC) for Volatile RAM dumps, PCAP captures, EVTX logs &amp; Registry hives
          </p>
        </div>

        {/* Global Custody Export */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCustodyAffidavit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-300 border border-purple-500/40 text-xs font-mono transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Export Legal Custody Affidavit
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-3 rounded-xl glass-panel border-cyan-500/20">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-mono text-slate-400 font-semibold mr-1">Filter Type:</span>
          {['All', 'Memory Dump', 'Network Capture', 'Logs', 'Registry Export', 'Driver Inventory'].map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                typeFilter === type
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search hash, artifact name, or file..."
            className="w-full bg-slate-900/80 rounded-xl pl-9 pr-3 py-1.5 text-xs font-mono text-white placeholder-slate-500 border border-slate-700/60 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Main Evidence Table (Exact Requirements: Hash, Size, Collection Time, Integrity Status, Download Buttons) */}
      <div className="rounded-2xl glass-panel border-cyan-500/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">EVIDENCE ID &amp; ARTIFACT</th>
                <th className="py-3.5 px-4 font-semibold">TYPE</th>
                <th className="py-3.5 px-4 font-semibold">SHA-256 HASH</th>
                <th className="py-3.5 px-4 font-semibold">SIZE</th>
                <th className="py-3.5 px-4 font-semibold">COLLECTION TIME</th>
                <th className="py-3.5 px-4 font-semibold">INTEGRITY STATUS</th>
                <th className="py-3.5 px-4 font-semibold text-right">DOWNLOAD &amp; AUDIT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredEvidence.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => setSelectedEvidence(item)}
                  className={`hover:bg-cyan-950/20 cursor-pointer transition-colors ${
                    selectedEvidence?.id === item.id ? 'bg-cyan-950/30' : ''
                  }`}
                >
                  {/* EVIDENCE ID & ARTIFACT */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white flex items-center gap-2">
                      <Archive className="w-3.5 h-3.5 text-cyan-400" />
                      {item.name}
                    </div>
                    <span className="text-[10px] text-cyan-300 font-mono block mt-0.5">{item.filename}</span>
                  </td>

                  {/* TYPE */}
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold text-[10px]">
                      {item.type}
                    </span>
                  </td>

                  {/* SHA-256 HASH */}
                  <td className="py-3.5 px-4 text-slate-300 max-w-xs truncate" title={item.hashSha256}>
                    <span className="text-purple-300 font-mono text-[11px]">{item.hashSha256}</span>
                  </td>

                  {/* SIZE */}
                  <td className="py-3.5 px-4 text-white font-bold">{item.size}</td>

                  {/* COLLECTION TIME */}
                  <td className="py-3.5 px-4 text-slate-300">{item.collectionTime}</td>

                  {/* INTEGRITY STATUS */}
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {item.integrityStatus}
                    </span>
                  </td>

                  {/* DOWNLOAD & AUDIT ACTIONS */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {/* Verify Integrity Button */}
                      <button
                        onClick={() => handleVerifyIntegrity(item)}
                        className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-1"
                        title="Verify SHA-256 against NTRO Root Ledger"
                      >
                        <Lock className="w-3 h-3" />
                        Verify
                      </button>

                      {/* Download Button */}
                      <button
                        onClick={() => handleDownloadItem(item)}
                        className="px-2.5 py-1 rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-200 border border-cyan-500/40 text-xs font-semibold transition-colors flex items-center gap-1"
                        title="Download Signed Evidence Package"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Evidence Deep Cryptographic Custody Card */}
      {selectedEvidence && (
        <div className="p-5 rounded-2xl glass-panel-glow border-purple-500/30 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <span className="text-[10px] text-purple-400 uppercase tracking-widest block">
                  Chain-of-Custody Record
                </span>
                <h3 className="text-base font-bold font-cyber text-white">
                  {selectedEvidence.name} ({selectedEvidence.id})
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                {selectedEvidence.integrityStatus}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">SHA-256 Digest:</span>
                <span className="text-cyan-300 text-[11px] break-all font-mono font-bold">{selectedEvidence.hashSha256}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">MD5 Checksum:</span>
                <span className="text-purple-300 text-[11px] break-all font-mono font-bold">{selectedEvidence.hashMd5}</span>
              </div>
            </div>

            {/* Custody Audit Trail */}
            <div className="space-y-1.5 pt-2">
              <span className="text-slate-400 text-xs font-semibold">Custody Transfer History:</span>
              <div className="space-y-1.5">
                {(selectedEvidence.custodyLog || []).map((log, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-black/40 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
                    <span>{log.action}</span>
                    <span className="text-slate-500 font-bold">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Officer & Storage Stamp */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 font-mono text-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs font-bold text-white border-b border-slate-800 pb-2">
                Custodian Clearance Stamp
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Collected By:</span>
                <strong className="text-white">{selectedEvidence.collectedBy}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Storage Media:</span>
                <strong className="text-cyan-300">WORM Optical &amp; Encrypted SAN</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Legal Compliance:</span>
                <strong className="text-emerald-400">CERT-In Sec. 70B &amp; ISO 27037</strong>
              </div>
            </div>

            <button
              onClick={() => handleDownloadItem(selectedEvidence)}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs transition-all shadow-[0_0_12px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              Download Sealed Artifact
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
