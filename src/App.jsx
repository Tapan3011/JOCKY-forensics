import React from 'react';
import { SOCProvider, useSOC } from './context/SOCContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import QuickSearchModal from './components/layout/QuickSearchModal';
import ToastContainer from './components/common/ToastContainer';

// 12 Functional Modules
import DashboardModule from './components/modules/DashboardModule';
import EndpointForensicsModule from './components/modules/EndpointForensicsModule';
import MemoryForensicsModule from './components/modules/MemoryForensicsModule';
import NetworkForensicsModule from './components/modules/NetworkForensicsModule';
import ThreatHuntingModule from './components/modules/ThreatHuntingModule';
import AIInvestigatorModule from './components/modules/AIInvestigatorModule';
import AttackTimelineModule from './components/modules/AttackTimelineModule';
import IncidentManagementModule from './components/modules/IncidentManagementModule';
import MitreMatrixModule from './components/modules/MitreMatrixModule';
import EvidenceRepositoryModule from './components/modules/EvidenceRepositoryModule';
import AnalyticsCenterModule from './components/modules/AnalyticsCenterModule';
import SettingsModule from './components/modules/SettingsModule';

function SOCAppLayout() {
  const { activeModule } = useSOC();

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans cyber-grid selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top SOC Bar */}
      <Header />

      {/* Main Body with Sidebar + Dynamic Module Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Persistent Collapsible Sidebar */}
        <Sidebar />

        {/* Dynamic Center Work Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {activeModule === 'dashboard' && <DashboardModule />}
          {activeModule === 'endpoints' && <EndpointForensicsModule />}
          {activeModule === 'memory' && <MemoryForensicsModule />}
          {activeModule === 'network' && <NetworkForensicsModule />}
          {activeModule === 'hunting' && <ThreatHuntingModule />}
          {activeModule === 'ai' && <AIInvestigatorModule />}
          {activeModule === 'timeline' && <AttackTimelineModule />}
          {activeModule === 'incidents' && <IncidentManagementModule />}
          {activeModule === 'mitre' && <MitreMatrixModule />}
          {activeModule === 'evidence' && <EvidenceRepositoryModule />}
          {activeModule === 'analytics' && <AnalyticsCenterModule />}
          {activeModule === 'settings' && <SettingsModule />}
        </main>
      </div>

      {/* Command Palette (Ctrl+K) */}
      <QuickSearchModal />

      {/* High-Tech Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <SOCProvider>
      <SOCAppLayout />
    </SOCProvider>
  );
}
