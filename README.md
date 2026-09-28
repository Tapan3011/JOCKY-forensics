# JOCKY - Enterprise Cybersecurity & Digital Forensics Platform
**Classified NTRO & CERT-In Compliant Security Operations Center (SOC) Suite**  
*Built for Smart India Hackathon (SIH) Presentation & Demonstration*

---

## 🛡️ Executive Overview

**JOCKY** is a next-generation enterprise-grade Security Operations Center (SOC) and Digital Forensics & Incident Response (DFIR) platform. Engineered with a military-grade dark SOC theme, glassmorphism UI, real-time live telemetry simulation, and deep forensic correlation, JOCKY provides an end-to-end command center for monitoring, investigating, and remediating high-velocity cyber intrusions.

### Key Highlights
- **12 Fully Functional Modules** accessible directly from the responsive sidebar.
- **Real-Time Telemetry Simulation** pulsing every 5 seconds (with live counter increments, network flows, and alert streams).
- **Interactive Visualizations**: Risk score circular gauge, 7-day threat trend area charts, Volatility virtual memory allocation map, process parent-child relationship graph, interactive network topology canvas, and world cyber attack map.
- **"JOCKY AI" Investigator**: Integrated autonomous forensic analyst providing structured root-cause kill chain analysis (Initial Access, Execution, Persistence, Discovery, Command & Control, Risk Score) with one-click containment actions.
- **Full Interactivity**: Every button, modal, filter, search bar, hash verification, isolation trigger, and file download works natively in the browser without requiring external backends.

---

## 💻 Tech Stack & Architecture

- **Frontend**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design Tokens (Glassmorphism, Cyber Grids, Radar Animations)
- **Charts & Graphs**: Recharts (AreaChart, BarChart, PieChart, Tooltips, Custom Gradients)
- **Icons**: Lucide React
- **Audio Synthesizer**: Web Audio API (tactile feedback for alerts, isolate protocols, and verification)
- **Celebration / Feedback**: Canvas Confetti for remediation and containment feedback
- **Data Engine**: Reactive Mock Forensics Store with live 5-second interval simulation

---

## 📑 12 Core Operations Modules

### 1. Executive Dashboard
- **Real-Time KPIs**: Total Endpoints (532), Active Systems (498), Critical Threats (17), Medium Threats (43), Memory Alerts (12), Network Events (32,451+ ticking live), Drivers Analyzed (1,845).
- **Interactive Risk Score Gauge**: 78/100 (DEFCON 2 - Elevated Threat).
- **7-Day Threat Trend Chart**: Multi-layer gradient area chart across Critical, High, Medium, and Low severity.
- **Network Traffic Ingestion Chart**: Live Mbps throughput and anomalous packet drop spikes.
- **MITRE ATT&CK Coverage Chart**: Heuristic rule mapping across core tactics.
- **Top Attacked Systems**: Ranked list featuring `PC-101`, `SRV-FIN-04`, `DC-CORP-01`, etc., with instant "Investigate" action.
- **Critical Alerts Feed**: Live stream with instant "Drop / Remediate" and "Inspect" triggers.
- **Quick Controls**: "Simulate Threat Surge", "Fleet Memory Scan", "Isolate Compromised Nodes", "Export Executive PDF Report".

### 2. Endpoint Forensics
- **Endpoint Inventory Table**: HOSTNAME, IP ADDRESS, OS VERSION, MEMORY, CPU, RISK SCORE, STATUS.
  - Featured sample hosts: `PC-101` (Compromised, Risk 92), `PC-102` (Healthy, Risk 22), `SRV-FIN-04` (SWIFT Core, Risk 88), `DC-CORP-01`, `WS-DEV-09`, `LAPTOP-EXEC-02`.
- **Deep Dive Forensic Dossier Modal** with 8 dedicated tabs:
  1. *Running Processes*: PID, PPID, executable path, command line, user, status (Malicious/Injected), and "Kill Process" button.
  2. *Loaded Modules*: DLL listings, base memory addresses, size, and Microsoft signature verification.
  3. *Installed Drivers*: Kernel driver manifest (.sys) audited against CISA Known Exploited Drivers (CVE-2019-16098 BYOVD exploit).
  4. *User Accounts*: SIDs, privileges, last logon timestamps, and rogue account detection.
  5. *USB History*: Virtual and physical USB bus mounts, serial numbers, and RubberDucky keystroke injector flags.
  6. *Registry Modifications*: Auto-start Run keys, Winlogon Userinit hijacks, and LSA Protection disablement.
  7. *Browser Artifacts*: Chrome/Edge history, ISO download provenance, and cookie cache theft.
  8. *Event Logs*: Windows Security (4624, 4688), System (7045), and Sysmon XML telemetry.

### 3. Memory Forensic Center
- **Volatility 3 & Rekall Engine**: Volatile RAM analysis status (100% complete, 16.0 GB RAW dump).
- **Confidence Score**: **96.4% Forensic Certainty**.
- **5 Key Indicator Cards**: Suspicious Threads (7), Hidden Processes (2), Injected Modules (4), Credential Theft (3), Rootkit Indicators (2).
- **Visual Memory Map**: Interactive grid mapping 0x00000000 to 0x7FFFFFFF with color-coded regions (Code, Data, Heap, Stack, Injected RWX Beacon, Hollowed Region, Kernel SSDT Hooks). Click any block to view memory protection details.
- **Process Relationship Graph**: Interactive parent-child tree showing malicious process injection (`wininit.exe` ➔ `services.exe` ➔ `svchost.exe (Hollowed)` ➔ `powershell.exe -enc`).
- **Volatility Plugin Findings**: `malfind`, `psxview`, `ssdt_hooks`, `cred_theft` disassembly views with "Extract Shellcode" button.

### 4. Network Forensics
- **Connection Flows Table**: Source IP, Destination IP, Protocol, Packets, Country & Flag, Threat Level.
  - Sample: `192.168.1.12` ➔ `104.26.2.33` | HTTPS | 12,045 pkts | USA | Critical.
- **Interactive Network Topology (SVG)**: Visual nodes for Internal Subnets, Gateway Firewall, and External C2 with animated pulsating packet lines.
- **World Attack Map**: Stylized cyber world map displaying real-time attack arcs from Moscow, San Francisco, Amsterdam, Beijing, and Pyongyang targeting New Delhi SOC headquarters.
- **Traffic Spikes Timeline**: AreaChart monitoring packet bursts and DNS tunneling exfiltration.
- **DNS Requests Stream**: Live DNS resolution log with DGA (Domain Generation Algorithm) heuristic risk score.

### 5. Threat Hunting
- **Multi-Entity Search Engine**: Search across IP, Domain, Hash (SHA256/MD5), Username, Process, and Driver.
- **Dynamic IOC Matches**: Correlated matches from AlienVault OTX, VirusTotal (68/72), and MISP.
- **Threat Intelligence Panel**:
  - *YARA Matches*: `APT_CobaltStrike_Beacon_v4`, `Trojan_Win64_DarkHydra_Memory`, `HackTool_Mimikatz_LsassSponge`.
  - *Sigma Rules*: `SIG-WIN-01` (Encoded PowerShell Download Cradle), `SIG-WIN-02` (LSASS Dump via comsvcs), `SIG-WIN-03` (BYOVD Loading).
- **Custom KQL / Sigma Query Console**: Interactive query runner with live fleet scanning simulation.

### 6. AI Investigator ("JOCKY AI")
- **Autonomous Chat Assistant**: Fine-tuned NTRO cyber investigator persona.
- **Pre-configured Queries**:
  - *"Why is endpoint PC-101 compromised?"* (produces exact structured breakdown: Initial Access, Execution, Persistence, Discovery, Command & Control, Risk Score 94%).
  - *"Analyze memory dump indicators on SRV-FIN-04"*
  - *"Draft an executive incident report for INC-2026-001"*
- **Embedded AI Actions**: "Isolate PC-101 Now", "Dump Volatile RAM", "Export Investigation Affidavit".

### 7. Attack Timeline
- **Animated Vertical Timeline**: Step-by-step kill chain reconstruction:
  - `08:32` User Login (vikram.admin, EventID 4624)
  - `08:36` Email Attachment Opened (RFQ_Invoice_Sep2026.iso)
  - `08:38` Suspicious Process Started (powershell.exe -enc)
  - `08:41` Registry Modified (Run key persistence)
  - `08:44` Network Beaconing (Periodic HTTP POST to 104.26.2.33)
  - `08:46` External Connection (SSL Handshake with untrusted certificate)
  - `08:50` Alert Triggered (Rule SOC-EDR-9042 matched)
  - `09:01` Incident Created (Case INC-2026-001 escalated)
- **Playback Controls**: Play, Pause, Step Forward, Rewind, and Speed toggles (1x, 2x, 5x).
- **Telemetry Inspector**: Expandable drawer with raw Sysmon/Event XML payloads and download options.

### 8. Incident Management
- **Case Management System**: Incident ID, Severity, Assigned Analyst, Status, Affected Assets.
  - Sample: `INC-2026-001` | Critical | Rahul Shah | In Progress | PC-101.
- **Features**:
  - "Create New Incident" Modal with instant state registration.
  - "Assign Analyst" interactive dropdown.
  - "Evidence View" Drawer linking case artifacts and SHA-256 digests.
  - "Close Incident" workflow with resolution notes and status transition.
  - Case notes trail with real-time observation appending.

### 9. MITRE ATT&CK Matrix
- **10 Enterprise Kill Chain Tactics**: Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Discovery, Lateral Movement, Command & Control, Exfiltration.
- **Interactive Heatmap**: Color-coded techniques (Red = Observed Attack, Amber = Detected, Cyan = Monitored).
- **Technique Inspector**: Click any cell to inspect technique ID, detection count, Sigma rule name, affected hosts, and trigger threat hunts.
- **Export Navigator Layer**: One-click download of MITRE ATT&CK Navigator JSON.

### 10. Evidence Repository
- **Cryptographic Chain of Custody**:
  1. *Memory Dump*: `memdump_pc101_20260928_0855.raw` (16.0 GB, SHA-256 HMAC Verified)
  2. *Network Capture*: `pc101_c2_capture_20260928.pcapng` (1.42 GB, SHA-256 HMAC Verified)
  3. *Logs*: `winevt_security_pc101_full.evtx` (412 MB, SHA-256 HMAC Verified)
  4. *Registry Export*: `system_registry_hives_pc101.tar.gz` (84 MB, SHA-256 HMAC Verified)
  5. *Driver Inventory*: `kernel_drivers_manifest_pc101.json` (12 MB, SHA-256 HMAC Verified)
- **Actions**:
  - "Download Evidence Package" (downloads signed forensic files).
  - "Verify SHA-256 Integrity" (re-calculates hash and verifies ledger match).
  - "Export Legal Custody Affidavit" (downloads formal Section 65B evidence certificate).

### 11. Analytics Center
- **Threat Distribution Pie / Donut Chart**: Breakdown across C2, Credential Theft, Ransomware, Rootkits, and Exfiltration.
- **Incidents Velocity Per Month**: 6-month historical BarChart showing total, resolved, and critical cases.
- **Attack Sources By Country**: GeoIP distribution bars (USA, Russia, China, Netherlands, DPRK).
- **Endpoint Risk Score Histogram**: Distribution of endpoints across 5 risk brackets.
- **Most Targeted Systems**: Ranked host telemetry with quick pivot links.
- **Forensic Metrics**: 148.6 TB acquired, 8,412 artifacts logged, 4.2 min MTTD, 92.4% auto-triage.

### 12. Platform Settings
- **Agent Management**: Sensor fleet status and one-click copy commands for Windows PowerShell & Linux bash.
- **Cloud Sync**: Connection status to `ntro-soc-central.gov.in:9443` with manual "Sync Now" trigger.
- **User Roles**: Super Admin, Tier-3 Forensics Lead, Tier-1 Analyst, Legal Auditor.
- **RBAC Permission Matrix**: Interactive toggle checkboxes for high-risk operations.
- **Report Templates**: One-click generation of SIH Executive Pitch, Section 65B Evidence Affidavit, and CERT-In 6-Hour Filing.
- **Notification Settings**: Slack webhook configuration, SMS escalation, and automated P1 quarantine toggle.

---

## 🚀 Running the Project Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the Vite development server
npm run dev

# 3. Access in browser
http://127.0.0.1:5173/
```

To create a production build:
```bash
npm run build
```

---

## 🏆 Presentation & SIH Hackathon Demo Highlights

1. **Simulate Attack Surge**: Click the glowing red **"Simulate Threat Surge"** button in the header at any time to demonstrate real-time alert injection, risk escalation, and reactive UI feedback.
2. **5-Second Simulation**: Watch the Network Events and Driver counters in the Executive Dashboard increment automatically every 5 seconds.
3. **Interactive Isolation**: Navigate to Endpoint Forensics and click **"Isolate"** on `PC-101` to demonstrate immediate network quarantine.
4. **Autonomous AI Investigation**: Ask JOCKY AI *"Why is endpoint PC-101 compromised?"* to present structured MITRE root-cause forensics.
5. **Memory Visualization**: Showcase the interactive Virtual Memory Map and Process Tree in the Memory Forensic Center.
6. **Command Palette**: Press `Ctrl+K` (or `⌘K`) to demonstrate rapid global navigation across hosts, incidents, and threat hashes.
