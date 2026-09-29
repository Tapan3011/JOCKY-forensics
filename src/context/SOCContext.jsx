import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_METRICS,
  ENDPOINTS_DATA,
  INITIAL_INCIDENTS,
  INITIAL_EVIDENCE_ITEMS,
  CRITICAL_ALERTS_FEED,
} from '../data/mockData';
import { playCyberSound, triggerConfetti } from '../utils/cyberEffects';

const SOCContext = createContext(null);

export function SOCProvider({ children }) {
  // Navigation & Theme
  const [activeModule, setActiveModule] = useState('dashboard');
  const [theme, setTheme] = useState('dark');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [simulationActive, setSimulationActive] = useState(true);
  const [quickSearchOpen, setQuickSearchOpen] = useState(false);

  // Core Data States
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [endpoints, setEndpoints] = useState(ENDPOINTS_DATA);
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [evidenceItems, setEvidenceItems] = useState(INITIAL_EVIDENCE_ITEMS);
  const [alerts, setAlerts] = useState(CRITICAL_ALERTS_FEED);
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);

  // Toast Notification System
  const [toasts, setToasts] = useState([]);

  const addToast = (title, message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type, time: new Date().toLocaleTimeString() }]);

    if (soundEnabled) {
      if (type === 'critical' || type === 'error') playCyberSound('alert');
      else if (type === 'success') playCyberSound('success');
      else playCyberSound('beep');
    }

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Theme Toggle
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    addToast('Theme Switched', `Display mode set to ${newTheme.toUpperCase()} SOC`, 'info');
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) playCyberSound('beep');
      return next;
    });
  };

  const toggleSimulation = () => {
    setSimulationActive((prev) => {
      const next = !prev;
      addToast(
        'Simulation Controller',
        next ? 'Real-time telemetry pulse resumed (5s tick)' : 'Real-time telemetry paused',
        'info'
      );
      return next;
    });
  };

  // 5-Second Real-Time Simulation Interval
  useEffect(() => {
    if (!simulationActive) return;

    const interval = setInterval(() => {
      setMetrics((prev) => {
        const netDelta = Math.floor(Math.random() * 28) + 8;
        const driverDelta = Math.random() > 0.6 ? 1 : 0;
        const netEvents = prev.networkEvents + netDelta;
        return {
          ...prev,
          networkEvents: netEvents,
          driversAnalyzed: prev.driversAnalyzed + driverDelta,
          lastScanTime: new Date().toLocaleTimeString() + ' IST',
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [simulationActive]);

  // Simulate Attack Surge (For demo presentations)
  const triggerAttackSurge = () => {
    if (soundEnabled) playCyberSound('alert');

    setMetrics((prev) => ({
      ...prev,
      criticalThreats: prev.criticalThreats + 2,
      riskScore: Math.min(99, prev.riskScore + 6),
      networkEvents: prev.networkEvents + 1420,
    }));

    const newAlert = {
      id: `ALT-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleTimeString(),
      host: 'PC-101',
      severity: 'Critical',
      title: 'SYN-Flood / C2 Beaconing Surge Triggered',
      tactic: 'Command & Control',
      rule: 'SURGE-SIM-2026',
      action: 'SOC Immediate Action Required',
    };

    setAlerts((prev) => [newAlert, ...prev]);

    addToast(
      'DEFCON 1 SIMULATION TRIGGERED',
      'High-velocity attack vector injected. Critical threat count incremented.',
      'critical'
    );
  };

  // Endpoint Actions
  const isolateEndpoint = (hostname) => {
    if (soundEnabled) playCyberSound('isolate');
    setEndpoints((prev) =>
      prev.map((ep) => {
        if (ep.hostname === hostname) {
          const isCurrentlyIsolated = ep.isolationStatus === 'Isolated';
          const nextStatus = isCurrentlyIsolated ? 'Not Isolated' : 'Isolated';
          return {
            ...ep,
            isolationStatus: nextStatus,
            status: isCurrentlyIsolated ? 'Suspicious' : 'Isolated',
          };
        }
        return ep;
      })
    );

    // Update selected endpoint if open
    setSelectedEndpoint((prev) => {
      if (prev && prev.hostname === hostname) {
        const isCurrentlyIsolated = prev.isolationStatus === 'Isolated';
        return {
          ...prev,
          isolationStatus: isCurrentlyIsolated ? 'Not Isolated' : 'Isolated',
          status: isCurrentlyIsolated ? 'Suspicious' : 'Isolated',
        };
      }
      return prev;
    });

    triggerConfetti();
    addToast(
      'Host Network Isolation State Changed',
      `Endpoint ${hostname} network adapter quarantined via JOCKY EDR Kernel Filter.`,
      'success'
    );
  };

  const dumpEndpointMemory = (hostname) => {
    if (soundEnabled) playCyberSound('beep');
    addToast(
      'Volatile Memory Acquisition Dispatched',
      `Sending raw RAM acquisition command to ${hostname} (WinPmem 4.0). Artifact will appear in Evidence Repository.`,
      'info'
    );

    // Mock evidence addition after 2 seconds
    setTimeout(() => {
      const newEvd = {
        id: `EVD-${Math.floor(9100 + Math.random() * 800)}`,
        name: `Live Volatile Memory Dump (${hostname})`,
        filename: `memdump_${hostname.toLowerCase()}_live_${Date.now()}.raw`,
        type: 'Memory Dump',
        size: '16.0 GB',
        hashSha256: '9f83a0018f920384102938401928401928401928401928401928401928401928',
        hashMd5: '3b019284019284019284019284019284',
        collectionTime: new Date().toLocaleString() + ' IST',
        integrityStatus: 'Verified (HMAC Matches)',
        collectedBy: 'Rahul Shah (Badge #NTRO-894)',
        custodyLog: [
          { time: 'Just now', action: 'Direct agent acquisition completed & signed' }
        ]
      };
      setEvidenceItems((prev) => [newEvd, ...prev]);
      addToast(
        'Evidence Captured & Signed',
        `Volatile RAM for ${hostname} acquired. SHA-256 seal logged to Evidence Repository.`,
        'success'
      );
    }, 2500);
  };

  // Incident Actions
  const createIncident = (incidentData) => {
    const newInc = {
      id: `INC-2026-00${incidents.length + 1}`,
      title: incidentData.title || 'Manually Triaged Security Incident',
      severity: incidentData.severity || 'High',
      assignedAnalyst: incidentData.assignedAnalyst || 'Rahul Shah',
      status: 'In Progress',
      affectedAssets: incidentData.affectedAssets || 'PC-101',
      createdAt: new Date().toLocaleTimeString() + ' IST',
      slaRemaining: '02h 00m',
      tags: incidentData.tags || ['Forensics', 'NTRO-Case'],
      notes: [
        { author: 'Rahul Shah', time: 'Just now', text: incidentData.description || 'Case initiated via SOC Command Panel.' }
      ],
      evidenceCount: 1
    };

    setIncidents((prev) => [newInc, ...prev]);
    triggerConfetti();
    addToast('Incident Created', `Case ${newInc.id} logged and assigned to ${newInc.assignedAnalyst}`, 'success');
  };

  const assignAnalyst = (incidentId, analystName) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === incidentId ? { ...inc, assignedAnalyst: analystName } : inc))
    );
    addToast('Incident Reassigned', `${incidentId} assigned to ${analystName}`, 'info');
  };

  const closeIncident = (incidentId) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === incidentId ? { ...inc, status: 'Closed', slaRemaining: 'Resolved' } : inc))
    );
    triggerConfetti();
    addToast('Incident Closed', `Incident ${incidentId} marked as Remediated & Sealed.`, 'success');
  };

  const addIncidentNote = (incidentId, noteText) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === incidentId) {
          return {
            ...inc,
            notes: [...inc.notes, { author: 'Rahul Shah', time: new Date().toLocaleTimeString() + ' IST', text: noteText }]
          };
        }
        return inc;
      })
    );
    addToast('Note Added', `Forensic observation attached to ${incidentId}`, 'info');
  };

  // Remediate Alert
  const remediateAlert = (alertId) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
    setMetrics((prev) => ({
      ...prev,
      criticalThreats: Math.max(0, prev.criticalThreats - 1),
    }));
    triggerConfetti();
    addToast('Alert Remediated', `Alert ${alertId} processed: Firewall drop rule activated.`, 'success');
  };

  // Evidence Verification
  const verifyEvidenceHash = (evidenceId) => {
    if (soundEnabled) playCyberSound('success');
    addToast('SHA-256 HMAC Validation', `Cryptographic digest for ${evidenceId} verified against NTRO Root Ledger: MATCH.`, 'success');
  };

  return (
    <SOCContext.Provider
      value={{
        activeModule,
        setActiveModule,
        theme,
        toggleTheme,
        soundEnabled,
        toggleSound,
        simulationActive,
        toggleSimulation,
        triggerAttackSurge,
        metrics,
        endpoints,
        isolateEndpoint,
        dumpEndpointMemory,
        selectedEndpoint,
        setSelectedEndpoint,
        incidents,
        createIncident,
        assignAnalyst,
        closeIncident,
        addIncidentNote,
        evidenceItems,
        verifyEvidenceHash,
        alerts,
        remediateAlert,
        toasts,
        addToast,
        removeToast,
        quickSearchOpen,
        setQuickSearchOpen,
      }}
    >
      {children}
    </SOCContext.Provider>
  );
}

export function useSOC() {
  const context = useContext(SOCContext);
  if (!context) {
    throw new Error('useSOC must be used within a SOCProvider');
  }
  return context;
}
