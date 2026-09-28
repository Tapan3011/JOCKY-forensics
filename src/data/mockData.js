// JOCKY - Enterprise Cybersecurity & Digital Forensics Platform
// Master Mock Data & Forensic Intelligence Store

export const INITIAL_METRICS = {
  totalEndpoints: 532,
  activeSystems: 498,
  criticalThreats: 17,
  mediumThreats: 43,
  memoryAlerts: 12,
  networkEvents: 32451,
  driversAnalyzed: 1845,
  riskScore: 78,
  defcon: 2,
  socStatus: 'DEFCON 2 - HIGH ALERT',
  lastScanTime: '2026-09-28 21:05:42 IST',
  analystOnDuty: 'Rahul Shah (Lead SOC Analyst / NTRO Clearance)',
};

export const THREAT_TREND_7DAYS = [
  { day: 'Mon', critical: 8, high: 14, medium: 32, low: 85 },
  { day: 'Tue', critical: 11, high: 19, medium: 38, low: 92 },
  { day: 'Wed', critical: 14, high: 22, medium: 41, low: 88 },
  { day: 'Thu', critical: 9, high: 18, medium: 35, low: 79 },
  { day: 'Fri', critical: 16, high: 27, medium: 44, low: 104 },
  { day: 'Sat', critical: 13, high: 24, medium: 39, low: 95 },
  { day: 'Sun (Today)', critical: 17, high: 29, medium: 43, low: 112 },
];

export const NETWORK_TRAFFIC_LIVE = [
  { time: '20:30', inbound: 420, outbound: 280, anomalous: 25 },
  { time: '20:35', inbound: 490, outbound: 310, anomalous: 32 },
  { time: '20:40', inbound: 580, outbound: 410, anomalous: 64 },
  { time: '20:45', inbound: 720, outbound: 560, anomalous: 112 },
  { time: '20:50', inbound: 840, outbound: 620, anomalous: 156 },
  { time: '20:55', inbound: 690, outbound: 480, anomalous: 88 },
  { time: '21:00', inbound: 920, outbound: 710, anomalous: 194 },
  { time: '21:05', inbound: 860, outbound: 640, anomalous: 142 },
];

export const MITRE_TACTIC_DISTRIBUTION = [
  { tactic: 'Initial Access', techniques: 4, coverage: 92, detected: 6 },
  { tactic: 'Execution', techniques: 7, coverage: 88, detected: 11 },
  { tactic: 'Persistence', techniques: 6, coverage: 95, detected: 8 },
  { tactic: 'Privilege Esc.', techniques: 5, coverage: 84, detected: 5 },
  { tactic: 'Defense Evasion', techniques: 8, coverage: 79, detected: 14 },
  { tactic: 'Credential Access', techniques: 5, coverage: 91, detected: 7 },
  { tactic: 'Discovery', techniques: 6, coverage: 86, detected: 9 },
  { tactic: 'Lateral Movement', techniques: 4, coverage: 82, detected: 3 },
  { tactic: 'Command & Control', techniques: 7, coverage: 94, detected: 12 },
  { tactic: 'Exfiltration', techniques: 3, coverage: 89, detected: 4 },
];

export const TOP_ATTACKED_SYSTEMS = [
  { hostname: 'PC-101', ip: '192.168.1.12', risk: 92, status: 'Compromised', alerts: 14, user: 'vikram.admin' },
  { hostname: 'SRV-FIN-04', ip: '10.0.4.20', risk: 88, status: 'Compromised', alerts: 11, user: 'svc_swift' },
  { hostname: 'DC-CORP-01', ip: '10.0.1.5', risk: 76, status: 'Suspicious', alerts: 8, user: 'DOMAIN\\Administrator' },
  { hostname: 'WS-DEV-09', ip: '192.168.2.45', risk: 68, status: 'Suspicious', alerts: 6, user: 'tapan.dev' },
  { hostname: 'LAPTOP-EXEC-02', ip: '192.168.1.88', risk: 62, status: 'Suspicious', alerts: 5, user: 'cfo_office' },
];

export const CRITICAL_ALERTS_FEED = [
  {
    id: 'ALT-9821',
    timestamp: '21:04:18',
    host: 'PC-101',
    severity: 'Critical',
    title: 'CobaltStrike Ingress via Encoded PowerShell',
    tactic: 'Execution',
    rule: 'SOC-EDR-9042',
    action: 'Investigation Required',
  },
  {
    id: 'ALT-9820',
    timestamp: '21:02:55',
    host: 'SRV-FIN-04',
    severity: 'Critical',
    title: 'LSASS Process Memory Ingestion by Unsigned Binary',
    tactic: 'Credential Access',
    rule: 'NTRO-SIGMA-412',
    action: 'Memory Dump Initiated',
  },
  {
    id: 'ALT-9819',
    timestamp: '20:58:30',
    host: 'PC-101',
    severity: 'Critical',
    title: 'C2 Beaconing Spike to 104.26.2.33 (USA / Cloudflare ASN)',
    tactic: 'Command & Control',
    rule: 'ZEEK-NET-771',
    action: 'Firewall Drop Pending',
  },
  {
    id: 'ALT-9818',
    timestamp: '20:54:12',
    host: 'DC-CORP-01',
    severity: 'Medium',
    title: 'Kerberoasting Ticket Request Spurt (SPN: MSSQLSvc)',
    tactic: 'Credential Access',
    rule: 'SOC-KERB-108',
    action: 'Under Observation',
  },
  {
    id: 'ALT-9817',
    timestamp: '20:49:03',
    host: 'WS-DEV-09',
    severity: 'Medium',
    title: 'Direct Kernel Object Modification (DKOM) in Process Table',
    tactic: 'Defense Evasion',
    rule: 'MEM-REKALL-009',
    action: 'Kernel Scanned',
  },
];

// Endpoints Database (Module 2)
export const ENDPOINTS_DATA = [
  {
    hostname: 'PC-101',
    ip: '192.168.1.12',
    os: 'Windows 11 Enterprise (23H2)',
    memory: '16GB DDR5',
    cpu: 'Intel Core i7-13700K',
    riskScore: 92,
    status: 'Compromised',
    agentVersion: 'v4.2.1-ntro',
    lastSeen: '1 sec ago',
    mac: '00:1A:2B:3C:4D:5E',
    domain: 'CORP.JOCKY.INTERNAL',
    department: 'Finance & Compliance',
    assignedUser: 'vikram.admin',
    isolationStatus: 'Not Isolated',
    forensics: {
      processes: [
        { pid: 4812, ppid: 1024, name: 'powershell.exe', path: 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe', cmd: 'powershell.exe -nop -w hidden -enc JABzAD0ATgBlAHcALQBPAGIAagBlAGMAdAA...', cpu: '14.2%', mem: '184 MB', user: 'SYSTEM', status: 'Malicious', hash: '5f9b4a1b023de98...' },
        { pid: 6120, ppid: 4812, name: 'svchost.exe (Hollowed)', path: 'C:\\Users\\Public\\svchost.exe', cmd: 'svchost.exe -k netsvcs', cpu: '22.8%', mem: '210 MB', user: 'SYSTEM', status: 'Injected', hash: '8e12a44b910fc33...' },
        { pid: 1024, ppid: 688, name: 'explorer.exe', path: 'C:\\Windows\\explorer.exe', cmd: 'C:\\Windows\\explorer.exe', cpu: '2.1%', mem: '124 MB', user: 'vikram.admin', status: 'Clean', hash: 'e2a874b919a00cd...' },
        { pid: 7420, ppid: 6120, name: 'cmd.exe', path: 'C:\\Windows\\System32\\cmd.exe', cmd: 'cmd.exe /c whoami /priv & net group "Domain Admins" /domain', cpu: '0.4%', mem: '12 MB', user: 'SYSTEM', status: 'Suspicious', hash: '3a4f10928e100fb...' },
        { pid: 8892, ppid: 6120, name: 'adfind.exe', path: 'C:\\ProgramData\\adfind.exe', cmd: 'adfind.exe -f "(objectcategory=person)" > enum.txt', cpu: '4.5%', mem: '45 MB', user: 'SYSTEM', status: 'Malicious', hash: '9b7f520aa114ef9...' },
      ],
      loadedModules: [
        { name: 'ntdll.dll', base: '0x00007FFB32100000', size: '2.1 MB', signed: 'Microsoft Windows Publisher', status: 'Verified' },
        { name: 'kernel32.dll', base: '0x00007FFB31F00000', size: '1.4 MB', signed: 'Microsoft Windows Publisher', status: 'Verified' },
        { name: 'reflect_beacon.dll', base: '0x000001D48A900000', size: '480 KB', signed: 'Unsigned / Self-generated', status: 'MALICIOUS (Reflective Injection)' },
        { name: 'amsi.dll (Patched)', base: '0x00007FFB2A800000', size: '128 KB', signed: 'Microsoft Windows (Bypass detected)', status: 'HOOKED / TAMPERED' },
        { name: 'ws2_32.dll', base: '0x00007FFB30C00000', size: '412 KB', signed: 'Microsoft Windows Publisher', status: 'Verified' },
      ],
      installedDrivers: [
        { name: 'jocky_sensor.sys', path: 'C:\\Windows\\System32\\drivers\\jocky_sensor.sys', signed: 'NTRO India Root CA', status: 'Active (Protected)' },
        { name: 'RTCore64.sys (CVE-2019-16098)', path: 'C:\\Windows\\Temp\\RTCore64.sys', signed: 'Micro-Star Int\'l (Revoked BYOVD)', status: 'VULNERABLE EXPLOITED DRIVER' },
        { name: 'tcpip.sys', path: 'C:\\Windows\\System32\\drivers\\tcpip.sys', signed: 'Microsoft Windows Publisher', status: 'Clean' },
        { name: 'fltmgr.sys', path: 'C:\\Windows\\System32\\drivers\\fltmgr.sys', signed: 'Microsoft Windows Publisher', status: 'Clean' },
      ],
      userAccounts: [
        { username: 'vikram.admin', sid: 'S-1-5-21-412-1001', privilege: 'Local Administrator', lastLogon: '2026-09-28 08:32:14', status: 'Active Session' },
        { username: 'ntro_backdoor_user', sid: 'S-1-5-21-412-1099', privilege: 'Administrators, Remote Desktop Users', lastLogon: '2026-09-28 08:42:01', status: 'SUSPICIOUS ROGUE ACCOUNT' },
        { username: 'Guest', sid: 'S-1-5-21-412-501', privilege: 'Guests', lastLogon: 'Never', status: 'Disabled' },
      ],
      usbHistory: [
        { deviceId: 'USB\\VID_05AC&PID_0220', vendor: 'Apple / Emulated HID', serial: '887201948123', mount: '2026-09-28 08:34:10', unmount: '2026-09-28 08:35:02', threat: 'RubberDucky Keystroke Injector Detected' },
        { deviceId: 'USB\\VID_0781&PID_5583', vendor: 'SanDisk Ultra Luxe 64GB', serial: '4C5300012903', mount: '2026-09-27 14:12:00', unmount: '2026-09-27 16:30:19', threat: 'Clean' },
      ],
      registryModifications: [
        { hive: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run', valueName: 'OneDriveSyncUpdater', data: 'C:\\ProgramData\\powershell_launcher.vbs', type: 'REG_SZ', threat: 'Persistence Established' },
        { hive: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon', valueName: 'Userinit', data: 'userinit.exe, C:\\Windows\\Temp\\beacon.exe', type: 'REG_SZ', threat: 'Critical Winlogon Hijack' },
        { hive: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa', valueName: 'RunAsPPL', data: '0x00000000', type: 'REG_DWORD', threat: 'LSA Protection Disabled (Mimikatz Prep)' },
      ],
      browserArtifacts: [
        { browser: 'Chrome 128', type: 'Download', target: 'RFQ_Invoice_Sep2026.iso', url: 'hxxps://secure-invoicing-portal[.]top/dl/RFQ_Invoice_Sep2026.iso', time: '08:35:48' },
        { browser: 'Chrome 128', type: 'History', target: 'Internal Active Directory Web Portal', url: 'https://dc01.corp.jocky.internal/adfs/ls', time: '08:52:10' },
        { browser: 'Edge 128', type: 'Cookie Access', target: 'SSO Session Tokens Dumped by PID 6120', url: 'Local SQLite Web Data Vault', time: '08:58:33' },
      ],
      eventLogs: [
        { id: 4624, severity: 'Info', provider: 'Security', description: 'An account was successfully logged on: vikram.admin (Logon Type 2)', time: '08:32:14' },
        { id: 4688, severity: 'Warning', provider: 'Security', description: 'A new process has been created: powershell.exe with -enc payload', time: '08:38:12' },
        { id: 7045, severity: 'Critical', provider: 'System', description: 'A new service was installed: RTCore64 Vuln Driver DriverService', time: '08:41:05' },
        { id: 1102, severity: 'Critical', provider: 'Security', description: 'The audit log was cleared (Attempted Anti-Forensics)', time: '08:50:22' },
      ]
    }
  },
  {
    hostname: 'PC-102',
    ip: '192.168.1.15',
    os: 'Windows 10 Pro (22H2)',
    memory: '8GB DDR4',
    cpu: 'Intel Core i5-11400',
    riskScore: 22,
    status: 'Healthy',
    agentVersion: 'v4.2.1-ntro',
    lastSeen: '4 sec ago',
    mac: '00:1A:2B:3C:4D:99',
    domain: 'CORP.JOCKY.INTERNAL',
    department: 'Human Resources',
    assignedUser: 'priya.hr',
    isolationStatus: 'Not Isolated',
    forensics: {
      processes: [
        { pid: 1420, ppid: 610, name: 'chrome.exe', path: 'C:\\Program Files\\Google\\Chrome\\chrome.exe', cmd: 'chrome.exe', cpu: '4.2%', mem: '340 MB', user: 'priya.hr', status: 'Clean', hash: 'c129e01f...' },
        { pid: 2190, ppid: 610, name: 'outlook.exe', path: 'C:\\Program Files\\Microsoft Office\\root\\Office16\\OUTLOOK.EXE', cmd: 'outlook.exe', cpu: '1.8%', mem: '210 MB', user: 'priya.hr', status: 'Clean', hash: 'e98124fa...' },
      ],
      loadedModules: [
        { name: 'ntdll.dll', base: '0x00007FFB32100000', size: '2.1 MB', signed: 'Microsoft Windows Publisher', status: 'Verified' },
      ],
      installedDrivers: [
        { name: 'jocky_sensor.sys', path: 'C:\\Windows\\System32\\drivers\\jocky_sensor.sys', signed: 'NTRO India Root CA', status: 'Active (Protected)' },
      ],
      userAccounts: [
        { username: 'priya.hr', sid: 'S-1-5-21-412-1002', privilege: 'Standard User', lastLogon: '2026-09-28 09:00:10', status: 'Active Session' },
      ],
      usbHistory: [],
      registryModifications: [],
      browserArtifacts: [],
      eventLogs: [
        { id: 4624, severity: 'Info', provider: 'Security', description: 'Logon successful for priya.hr', time: '09:00:10' }
      ]
    }
  },
  {
    hostname: 'SRV-FIN-04',
    ip: '10.0.4.20',
    os: 'Windows Server 2022 Datacenter',
    memory: '64GB ECC DDR4',
    cpu: 'Intel Xeon Gold 6330 (28 Core)',
    riskScore: 88,
    status: 'Compromised',
    agentVersion: 'v4.2.1-ntro',
    lastSeen: 'Now',
    mac: '14:58:D0:E1:99:A1',
    domain: 'CORP.JOCKY.INTERNAL',
    department: 'Financial Core / SWIFT Engine',
    assignedUser: 'svc_swift',
    isolationStatus: 'Not Isolated',
    forensics: {
      processes: [
        { pid: 890, ppid: 4, name: 'lsass.exe', path: 'C:\\Windows\\System32\\lsass.exe', cmd: 'lsass.exe', cpu: '18.4%', mem: '142 MB', user: 'SYSTEM', status: 'Compromised (Target of MiniDump)', hash: '321a4f...' },
        { pid: 9102, ppid: 104, name: 'rundll32.exe', path: 'C:\\Windows\\System32\\rundll32.exe', cmd: 'rundll32.exe comsvcs.dll, #24 890 dump.bin full', cpu: '28.1%', mem: '98 MB', user: 'SYSTEM', status: 'Malicious (LSASS Dump)', hash: '5b12ef...' },
      ],
      loadedModules: [],
      installedDrivers: [],
      userAccounts: [],
      usbHistory: [],
      registryModifications: [],
      browserArtifacts: [],
      eventLogs: [
        { id: 10, severity: 'Critical', provider: 'Microsoft-Windows-Sysmon', description: 'Process accessed LSASS with PROCESS_ALL_ACCESS (GrantedAccess 0x1FFFFF)', time: '21:02:55' }
      ]
    }
  },
  {
    hostname: 'DC-CORP-01',
    ip: '10.0.1.5',
    os: 'Windows Server 2022',
    memory: '128GB ECC',
    cpu: 'AMD EPYC 7763 64-Core',
    riskScore: 76,
    status: 'Suspicious',
    agentVersion: 'v4.2.1-ntro',
    lastSeen: '1 sec ago',
    mac: '00:25:90:AB:12:34',
    domain: 'CORP.JOCKY.INTERNAL',
    department: 'Central Infrastructure',
    assignedUser: 'DOMAIN\\Administrator',
    isolationStatus: 'Not Isolated',
    forensics: {
      processes: [],
      loadedModules: [],
      installedDrivers: [],
      userAccounts: [],
      usbHistory: [],
      registryModifications: [],
      browserArtifacts: [],
      eventLogs: []
    }
  },
  {
    hostname: 'WS-DEV-09',
    ip: '192.168.2.45',
    os: 'Ubuntu 22.04 LTS (Kernel 6.5.0)',
    memory: '32GB DDR5',
    cpu: 'AMD Ryzen 9 7900X',
    riskScore: 68,
    status: 'Suspicious',
    agentVersion: 'v4.2.1-ntro-linux',
    lastSeen: '3 sec ago',
    mac: '70:85:C2:54:11:02',
    domain: 'ENG.JOCKY.INTERNAL',
    department: 'R&D Engineering',
    assignedUser: 'tapan.dev',
    isolationStatus: 'Not Isolated',
    forensics: {
      processes: [],
      loadedModules: [],
      installedDrivers: [],
      userAccounts: [],
      usbHistory: [],
      registryModifications: [],
      browserArtifacts: [],
      eventLogs: []
    }
  },
  {
    hostname: 'LAPTOP-EXEC-02',
    ip: '192.168.1.88',
    os: 'Windows 11 Pro',
    memory: '16GB LPDDR5',
    cpu: 'Intel Core Ultra 7 155H',
    riskScore: 31,
    status: 'Healthy',
    agentVersion: 'v4.2.1-ntro',
    lastSeen: '6 sec ago',
    mac: '88:66:5A:11:44:E9',
    domain: 'CORP.JOCKY.INTERNAL',
    department: 'Executive Office',
    assignedUser: 'cfo_office',
    isolationStatus: 'Not Isolated',
    forensics: {
      processes: [],
      loadedModules: [],
      installedDrivers: [],
      userAccounts: [],
      usbHistory: [],
      registryModifications: [],
      browserArtifacts: [],
      eventLogs: []
    }
  }
];

// Memory Forensics Center (Module 3)
export const MEMORY_FORENSICS_DATA = {
  targetHost: 'PC-101 (192.168.1.12)',
  dumpFile: 'memdump_pc101_20260928_0855.raw',
  dumpSize: '16.0 GB',
  kernelEngine: 'Volatility 3 + Rekall NTRO Enhanced Engine v4',
  scanStatus: 'Analysis Complete (100%)',
  confidenceScore: 96.4,
  indicators: {
    suspiciousThreads: 7,
    hiddenProcesses: 2,
    injectedModules: 4,
    credentialTheft: 3,
    rootkitIndicators: 2,
  },
  findings: [
    {
      plugin: 'malfind',
      pid: 6120,
      process: 'svchost.exe',
      address: '0x000001D48A900000',
      protection: 'PAGE_EXECUTE_READWRITE (RWX)',
      confidence: '98%',
      disassembly: '0x1d48a900000:  48 83 ec 28       sub    rsp, 0x28\n0x1d48a900004:  48 8d 0d 45 10 00  lea    rcx, [rip + 0x1045]\n0x1d48a90000b:  ff 15 23 41 02 00  call   qword ptr [rip + 0x24123]  ; LoadLibraryA\n0x1d48a900011:  e8 8a 01 00 00     call   0x1d48a9001a0              ; BeaconConnect',
      hexdump: '4D 5A 90 00 03 00 00 00 04 00 00 00 FF FF 00 00  MZ..............\n48 83 EC 28 48 8D 0D 45 10 00 FF 15 23 41 02 00  H..(H..E....#A..',
      threat: 'Cobalt Strike Reflective DLL Injected in Memory Region'
    },
    {
      plugin: 'psxview',
      pid: 5904,
      process: 'stealth_rat.exe',
      address: '0xFFFFFA8003412080',
      protection: 'PAGE_EXECUTE_READ',
      confidence: '94%',
      threat: 'DKOM Detected: Process unlinked from ActiveProcessLinks doubly-linked list but found in PspCidTable & thread scan'
    },
    {
      plugin: 'ssdt_hooks',
      pid: 0,
      process: 'Kernel (ntoskrnl.exe)',
      address: '0xFFFFF80002A145B0',
      protection: 'KERNEL_HOOK',
      confidence: '99%',
      threat: 'SSDT Hook on NtCreateFile & NtQuerySystemInformation pointing to RTCore64 driver space'
    },
    {
      plugin: 'cred_theft',
      pid: 890,
      process: 'lsass.exe',
      address: '0x00007FF71A400000',
      protection: 'PAGE_READONLY',
      confidence: '95%',
      threat: 'MiniDumpWriteDump handle opened by powershell.exe with PROCESS_VM_READ permissions'
    }
  ],
  // Visual Memory Map Segments
  memoryMapGrid: [
    { range: '0x0000 - 0x1000', type: 'Zero Page / Guard', color: '#1e293b', status: 'Reserved' },
    { range: '0x1000 - 0x3FFF', type: 'PE Header & Text (Code)', color: '#06b6d4', status: 'Clean' },
    { range: '0x4000 - 0x6FFF', type: '.rdata / Read Only', color: '#3b82f6', status: 'Clean' },
    { range: '0x7000 - 0x9FFF', type: '.data / Global Vars', color: '#6366f1', status: 'Clean' },
    { range: '0xA000 - 0xCFFF', type: 'Process Heap Space', color: '#8b5cf6', status: 'Clean' },
    { range: '0xD000 - 0xEFFF', type: 'Thread Stack (ESP)', color: '#a855f7', status: 'Clean' },
    { range: '0xF000 - 0x14FF', type: 'INJECTED RWX BEACON', color: '#ef4444', status: 'CRITICAL THREAT (RWX Payload)' },
    { range: '0x1500 - 0x18FF', type: 'DLL Mappings', color: '#0284c7', status: 'Clean' },
    { range: '0x1900 - 0x1BFF', type: 'HOLLOWED REGION', color: '#f97316', status: 'UNLINKED CODE' },
    { range: '0x1C00 - 0x1FFF', type: 'VAD Tree Node', color: '#10b981', status: 'Clean' },
    { range: '0x2000 - 0x4FFF', type: 'Kernel Transition', color: '#0f172a', status: 'System' },
    { range: '0x5000 - 0x7FFF', type: 'SSDT & Driver Space', color: '#ec4899', status: 'KERNEL HOOK DETECTED' },
  ]
};

// Network Forensics (Module 4)
export const NETWORK_CONNECTIONS_DATA = [
  {
    id: 'NET-01',
    srcIp: '192.168.1.12',
    srcPort: 54102,
    destIp: '104.26.2.33',
    destPort: 443,
    protocol: 'HTTPS',
    packets: 12045,
    bytes: '8.4 MB',
    country: 'United States',
    flag: '🇺🇸',
    city: 'San Francisco, CA',
    asn: 'AS13335 CLOUDFLARENET',
    threatLevel: 'Critical',
    category: 'C2 Beaconing (CobaltStrike)',
    jitter: '15%',
    duration: '2h 14m'
  },
  {
    id: 'NET-02',
    srcIp: '10.0.4.20',
    srcPort: 49152,
    destIp: '185.220.101.5',
    destPort: 8080,
    protocol: 'C2-Raw TCP',
    packets: 8490,
    bytes: '14.2 MB',
    country: 'Netherlands',
    flag: '🇳🇱',
    city: 'Amsterdam',
    asn: 'AS208291 Tor Exit Node',
    threatLevel: 'Critical',
    category: 'Data Exfiltration Channel',
    jitter: '0%',
    duration: '45m'
  },
  {
    id: 'NET-03',
    srcIp: '192.168.1.12',
    srcPort: 53991,
    destIp: '8.8.8.8',
    destPort: 53,
    protocol: 'DNS',
    packets: 3410,
    bytes: '512 KB',
    country: 'United States',
    flag: '🇺🇸',
    city: 'Mountain View, CA',
    asn: 'AS15169 GOOGLE',
    threatLevel: 'High',
    category: 'DNS Tunneling / DGA Queries',
    jitter: '5%',
    duration: '1h 10m'
  },
  {
    id: 'NET-04',
    srcIp: '10.0.1.5',
    srcPort: 445,
    destIp: '192.168.1.12',
    destPort: 51204,
    protocol: 'SMBv2',
    packets: 6120,
    bytes: '3.1 MB',
    country: 'Internal LAN',
    flag: '🏢',
    city: 'Datacenter Subnet A',
    asn: 'PRIVATE',
    threatLevel: 'High',
    category: 'Lateral Movement Probe (Pass-the-Hash)',
    jitter: '2%',
    duration: '18m'
  },
  {
    id: 'NET-05',
    srcIp: '192.168.1.15',
    srcPort: 51102,
    destIp: '140.82.121.4',
    destPort: 443,
    protocol: 'HTTPS',
    packets: 412,
    bytes: '310 KB',
    country: 'United States',
    flag: '🇺🇸',
    city: 'San Francisco, CA',
    asn: 'AS36459 GITHUB',
    threatLevel: 'Low',
    category: 'Normal Git Sync',
    jitter: 'N/A',
    duration: '2m'
  }
];

export const WORLD_ATTACK_TARGETS = [
  { id: 1, origin: 'Moscow, Russia', lat: 55.7558, lng: 37.6173, target: 'New Delhi (JOCKY SOC)', targetLat: 28.6139, targetLng: 77.2090, type: 'APT29 / CozyBear C2', severity: 'Critical' },
  { id: 2, origin: 'San Francisco, USA', lat: 37.7749, lng: -122.4194, target: 'New Delhi (JOCKY SOC)', targetLat: 28.6139, targetLng: 77.2090, type: 'Cloudflare Proxied Beacon', severity: 'Critical' },
  { id: 3, origin: 'Amsterdam, Netherlands', lat: 52.3676, lng: 4.9041, target: 'New Delhi (JOCKY SOC)', targetLat: 28.6139, targetLng: 77.2090, type: 'Tor Onion Relay Exfil', severity: 'High' },
  { id: 4, origin: 'Beijing, China', lat: 39.9042, lng: 116.4074, target: 'New Delhi (JOCKY SOC)', targetLat: 28.6139, targetLng: 77.2090, type: 'APT41 Supply Chain Probe', severity: 'High' },
  { id: 5, origin: 'Pyongyang, DPRK', lat: 39.0392, lng: 125.7625, target: 'New Delhi (JOCKY SOC)', targetLat: 28.6139, targetLng: 77.2090, type: 'Lazarus Group Crypto Sweeper', severity: 'Critical' },
];

export const DNS_LOGS = [
  { time: '21:04:12', host: 'PC-101', query: 'cx9812-sync-stage.update-microsoft-cloud[.]net', type: 'A', response: '104.26.2.33', dgaScore: 98, status: 'BLOCKED' },
  { time: '21:03:40', host: 'PC-101', query: 'portal-cdn.telemetry-edge-auth[.]org', type: 'TXT (Base64)', response: 'JABzAD0ATgBlAHc...', dgaScore: 94, status: 'BLOCKED' },
  { time: '21:02:18', host: 'SRV-FIN-04', query: 'drop.swiss-vault-transfer[.]ch', type: 'A', response: '185.220.101.5', dgaScore: 91, status: 'ALERT' },
  { time: '21:01:05', host: 'PC-102', query: 'login.microsoftonline.com', type: 'A', response: '20.190.159.0', dgaScore: 2, status: 'ALLOWED' },
  { time: '20:59:50', host: 'WS-DEV-09', query: 'registry.npmjs.org', type: 'A', response: '104.16.16.35', dgaScore: 5, status: 'ALLOWED' },
];

// Threat Hunting (Module 5)
export const THREAT_HUNTING_DATA = {
  iocMatches: [
    { type: 'IPv4', value: '104.26.2.33', threat: 'Cobalt Strike C2 Server', confidence: 99, hits: 14, source: 'AlienVault OTX / MISP', status: 'Confirmed Malicious' },
    { type: 'Domain', value: 'update-microsoft-cloud.net', threat: 'Typosquatted Brand Masquerade', confidence: 95, hits: 28, source: 'VirusTotal (68/72)', status: 'Active C2' },
    { type: 'SHA-256', value: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', threat: 'Staged Meterpreter Stager', confidence: 98, hits: 3, source: 'NTRO Threat Intel DB', status: 'Weaponized' },
    { type: 'Hash MD5', value: 'd41d8cd98f00b204e9800998ecf8427e', threat: 'Empty Carrier ISO Dropper', confidence: 90, hits: 1, source: 'Internal Sandbox', status: 'Trojan Dropper' },
    { type: 'Driver', value: 'RTCore64.sys', threat: 'Bring Your Own Vulnerable Driver (BYOVD)', confidence: 100, hits: 2, source: 'LOLDrivers / CISA KEV', status: 'Kernel Exploited' }
  ],
  yaraRules: [
    {
      ruleName: 'APT_CobaltStrike_Beacon_v4',
      author: 'NTRO Cyber Cell / JOCKY Forensics',
      severity: 'Critical',
      matches: 2,
      matchedOn: ['PC-101 (PID: 6120 svchost.exe)', 'PC-101 (memdump_pc101.raw)'],
      description: 'Detects in-memory Cobalt Strike Beacon v4 reflective loader signatures and sleep mask configuration block.'
    },
    {
      ruleName: 'Trojan_Win64_DarkHydra_Memory',
      author: 'CERT-In Threat Intel',
      severity: 'Critical',
      matches: 1,
      matchedOn: ['SRV-FIN-04 (PID: 9102 rundll32.exe)'],
      description: 'Identifies DarkHydra memory injector utilizing direct syscall execution bypassing user-mode EDR hooks.'
    },
    {
      ruleName: 'HackTool_Mimikatz_LsassSponge',
      author: 'Florian Roth / SigmaHQ',
      severity: 'High',
      matches: 3,
      matchedOn: ['SRV-FIN-04', 'PC-101', 'DC-CORP-01'],
      description: 'Signatures for comsvcs MiniDump API memory dumping targeting lsass.exe process handle.'
    }
  ],
  sigmaRules: [
    { id: 'SIG-WIN-01', title: 'Suspicious PowerShell Download Cradle via Encoded Command', level: 'Critical', tactic: 'Execution', matches: 8, query: 'process.name: powershell.exe AND process.command_line: (*-enc* OR *-w hidden*)' },
    { id: 'SIG-WIN-02', title: 'LSASS Memory Dump via comsvcs.dll Export #24', level: 'Critical', tactic: 'Credential Access', matches: 3, query: 'process.name: rundll32.exe AND process.command_line: *comsvcs.dll*#24*' },
    { id: 'SIG-WIN-03', title: 'Bring Your Own Vulnerable Driver (BYOVD) Loading Event', level: 'High', tactic: 'Privilege Escalation', matches: 2, query: 'driver.name: (*RTCore64.sys* OR *gdrv.sys* OR *procexp.sys*)' },
    { id: 'SIG-WIN-04', title: 'Scheduled Task Creation with Hidden System Telemetry Masquerade', level: 'High', tactic: 'Persistence', matches: 5, query: 'event.id: 4698 AND task.action: (*powershell* OR *wscript*)' }
  ]
};

// AI Investigator ("JOCKY AI") - Module 6
export const AI_INVESTIGATOR_PRESETS = [
  {
    query: 'Why is endpoint PC-101 compromised?',
    summary: 'Comprehensive forensic kill-chain analysis confirms PC-101 has suffered full system compromise via a multi-stage spearphishing intrusion leading to Cobalt Strike C2 beaconing and kernel tampering.',
    tacticsBreakdown: [
      {
        tactic: 'Initial Access',
        detail: 'Malicious attachment detected: User vikram.admin mounted RFQ_Invoice_Sep2026.iso (downloaded via Chrome at 08:35:48), triggering execution of an obfuscated LNK shortcut.',
        badge: 'Spearphishing Attachment'
      },
      {
        tactic: 'Execution',
        detail: 'Encoded PowerShell execution observed: powershell.exe spawned with arguments -nop -w hidden -enc JABzAD0... executing an in-memory reflective stager.',
        badge: 'T1059.001 PowerShell'
      },
      {
        tactic: 'Persistence',
        detail: 'Scheduled task created: TelemetrySync under \\Microsoft\\Windows\\AppID\\ pointing to C:\\ProgramData\\powershell_launcher.vbs, ensuring persistence across reboot.',
        badge: 'T1053.005 Scheduled Task'
      },
      {
        tactic: 'Discovery',
        detail: 'Network enumeration performed: AdFind.exe and built-in CLI tools (net view, nltest /dclist) mapped Domain Admins and reachable finance domain controllers.',
        badge: 'T1087 Account Discovery'
      },
      {
        tactic: 'Command and Control',
        detail: 'External communication detected: Periodic HTTPS beaconing to 104.26.2.33:443 with 15% sleep jitter mimicking Microsoft CDN traffic.',
        badge: 'T1071.001 Web Protocols'
      }
    ],
    riskScore: 94,
    recommendedActions: [
      'Immediately isolate PC-101 from internal subnets',
      'Revoke Kerberos TGT and reset credentials for vikram.admin',
      'Acquire full cryptographic volatile RAM dump for volatile memory forensics',
      'Apply firewall IP block on 104.26.2.33 and null-route update-microsoft-cloud.net'
    ]
  },
  {
    query: 'Analyze memory dump indicators on SRV-FIN-04',
    summary: 'Memory forensic evaluation of SRV-FIN-04 reveals a credential harvesting assault directly targeting LSASS memory space.',
    tacticsBreakdown: [
      {
        tactic: 'Credential Access',
        detail: 'Process rundll32.exe (PID 9102) invoked comsvcs.dll export #24 targeting lsass.exe (PID 890) to create a full memory mini-dump.',
        badge: 'T1003.001 OS Credential Dumping'
      },
      {
        tactic: 'Defense Evasion',
        detail: 'LSA Protection (RunAsPPL) was neutralized via a vulnerable signed driver bypass before invoking the memory read API.',
        badge: 'T1562.001 Disable Tools'
      }
    ],
    riskScore: 88,
    recommendedActions: [
      'Quarantine process rundll32.exe PID 9102',
      'Rotate SWIFT service account passwords and enable hardware MFA',
      'Enforce Credential Guard via Virtualization-Based Security (VBS)'
    ]
  },
  {
    query: 'Draft an executive incident report for INC-2026-001',
    summary: 'Formal Incident Notification for CERT-In & NTRO Executive Oversight: High severity intrusion detected on Core Enterprise Host PC-101.',
    tacticsBreakdown: [
      {
        tactic: 'Incident Summary',
        detail: 'Case INC-2026-001 initiated at 09:01 IST. Attacker demonstrated advanced persistent threat (APT) tooling with memory reflection and C2 beaconing.',
        badge: 'Executive Briefing'
      },
      {
        tactic: 'Impact Assessment',
        detail: 'Zero data exfiltration confirmed to date; containment initiated within 29 minutes of first anomalous network beacon.',
        badge: 'Containment in Progress'
      }
    ],
    riskScore: 92,
    recommendedActions: [
      'Submit formal Sec. 70B CERT-In compliance incident notification',
      'Deploy JOCKY memory sensor update across all 532 fleet nodes',
      'Schedule Tier-3 forensic debrief with NTRO SOC directors'
    ]
  }
];

// Attack Timeline (Module 7)
export const ATTACK_TIMELINE_EVENTS = [
  {
    time: '08:32',
    timestamp: '2026-09-28 08:32:14',
    title: 'User Login',
    host: 'PC-101',
    user: 'vikram.admin',
    severity: 'Low',
    icon: 'LogIn',
    category: 'Authentication',
    details: 'User vikram.admin authenticated via Kerberos Logon Type 2 (Interactive Console). Workstation unlocked from clean sleep state.',
    eventCode: 'Event ID 4624 (Security)',
    rawLog: '<Event xmlns="http://schemas.microsoft.com/win/2004/08/events/event"><System><EventID>4624</EventID><Provider Name="Microsoft-Windows-Security-Auditing"/><TimeCreated SystemTime="2026-09-28T03:02:14.000Z"/></System><EventData><Data Name="TargetUserName">vikram.admin</Data><Data Name="LogonType">2</Data></EventData></Event>'
  },
  {
    time: '08:36',
    timestamp: '2026-09-28 08:36:02',
    title: 'Email Attachment Opened',
    host: 'PC-101',
    user: 'vikram.admin',
    severity: 'Medium',
    icon: 'MailWarning',
    category: 'Initial Access',
    details: 'User received external email spoofing vendor procurement. Opened ISO container RFQ_Invoice_Sep2026.iso mounted as virtual DVD drive E:\\.',
    eventCode: 'Sysmon Event ID 11 (FileCreate)',
    rawLog: 'SHA256: d41d8cd98f00b204e9800998ecf8427e | Path: E:\\Invoice_Document.pdf.lnk | Target: powershell.exe'
  },
  {
    time: '08:38',
    timestamp: '2026-09-28 08:38:45',
    title: 'Suspicious Process Started',
    host: 'PC-101',
    user: 'SYSTEM',
    severity: 'Critical',
    icon: 'Terminal',
    category: 'Execution',
    details: 'Parent explorer.exe launched hidden encoded PowerShell command: powershell -nop -w hidden -enc JABzAD0ATgBl... decrypting Stage-1 payload.',
    eventCode: 'Sysmon Event ID 1 (ProcessCreation)',
    rawLog: 'PID: 4812 | CommandLine: powershell.exe -nop -w hidden -enc JABzAD0ATgBlAHcALQBPAGIAagBlAGMAdAA... | Hash: 5f9b4a1b023de98'
  },
  {
    time: '08:41',
    timestamp: '2026-09-28 08:41:20',
    title: 'Registry Modified',
    host: 'PC-101',
    user: 'SYSTEM',
    severity: 'High',
    icon: 'Database',
    category: 'Persistence',
    details: 'Registry key HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\OneDriveSyncUpdater modified to point to backdoor VBS script in C:\\ProgramData.',
    eventCode: 'Sysmon Event ID 13 (RegistryValueSet)',
    rawLog: 'Key: HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run | ValueName: OneDriveSyncUpdater | Data: C:\\ProgramData\\powershell_launcher.vbs'
  },
  {
    time: '08:44',
    timestamp: '2026-09-28 08:44:11',
    title: 'Network Beaconing',
    host: 'PC-101',
    user: 'SYSTEM',
    severity: 'Critical',
    icon: 'Radio',
    category: 'Command & Control',
    details: 'Process svchost.exe (PID 6120) initiated periodic HTTP POST requests to 104.26.2.33 with a 60-second sleep interval and 15% random jitter.',
    eventCode: 'Zeek HTTP Log / EDR Network',
    rawLog: 'POST /api/v2/telemetry/heartbeat HTTP/1.1 | Host: 104.26.2.33 | User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) | Content-Length: 480'
  },
  {
    time: '08:46',
    timestamp: '2026-09-28 08:46:58',
    title: 'External Connection',
    host: 'PC-101',
    user: 'SYSTEM',
    severity: 'High',
    icon: 'Globe',
    category: 'Command & Control',
    details: 'SSL/TLS handshake completed with untrusted certificate. Server Name Indication (SNI): update-microsoft-cloud.net. JA3 Fingerprint: e7d705a3286e19ea42f587b344ee6865.',
    eventCode: 'Network Monitor TLS Alert',
    rawLog: 'ClientHello -> ServerHello | SNI: update-microsoft-cloud.net | Cert: CN=Self-Signed CloudFront Mask | Port: 443'
  },
  {
    time: '08:50',
    timestamp: '2026-09-28 08:50:33',
    title: 'Alert Triggered',
    host: 'PC-101',
    user: 'JOCKY-AGENT',
    severity: 'Critical',
    icon: 'AlertTriangle',
    category: 'Detection',
    details: 'Rule SOC-EDR-9042 matched: In-memory Cobalt Strike Beacon payload identified via heuristic RWX memory region scan and memory hollow validation.',
    eventCode: 'JOCKY Sensor Alert ALT-9821',
    rawLog: 'Alert: SOC-EDR-9042 | RuleName: APT_CobaltStrike_Beacon_v4 | MemoryAddress: 0x000001D48A900000 | Confidence: 98%'
  },
  {
    time: '09:01',
    timestamp: '2026-09-28 09:01:00',
    title: 'Incident Created',
    host: 'PC-101',
    user: 'Auto-SOAR Engine',
    severity: 'Critical',
    icon: 'ShieldAlert',
    category: 'Incident Response',
    details: 'Incident INC-2026-001 automatically opened by SOAR orchestration engine. Severity classified as CRITICAL. Assigned to Lead Analyst Rahul Shah.',
    eventCode: 'Case Management Automated Escalation',
    rawLog: 'CaseID: INC-2026-001 | Priority: P1-Urgent | Assigned: Rahul Shah | SLA: 60 mins | Evidence Tagged: memdump, pcap'
  }
];

// Incident Management (Module 8)
export const INITIAL_INCIDENTS = [
  {
    id: 'INC-2026-001',
    title: 'Cobalt Strike Ingress & C2 Beaconing on PC-101',
    severity: 'Critical',
    assignedAnalyst: 'Rahul Shah',
    status: 'In Progress',
    affectedAssets: 'PC-101',
    createdAt: '2026-09-28 09:01 IST',
    slaRemaining: '01h 14m',
    tags: ['CobaltStrike', 'Spearphishing', 'MemoryHollowing', 'NTRO-P1'],
    notes: [
      { author: 'Rahul Shah', time: '09:05 IST', text: 'Confirmed active C2 beacon to 104.26.2.33. Volatile memory dump initiated via JOCKY agent.' },
      { author: 'Auto-SOAR', time: '09:12 IST', text: 'Network egress rate-limited. Firewall rule staged to block IP.' }
    ],
    evidenceCount: 4
  },
  {
    id: 'INC-2026-002',
    title: 'LSASS Memory Extraction Attempt on Financial SWIFT Core',
    severity: 'Critical',
    assignedAnalyst: 'Priya Sharma',
    status: 'In Progress',
    affectedAssets: 'SRV-FIN-04',
    createdAt: '2026-09-28 20:30 IST',
    slaRemaining: '00h 42m',
    tags: ['LSASS', 'CredentialAccess', 'SWIFT', 'comsvcs'],
    notes: [
      { author: 'Priya Sharma', time: '20:35 IST', text: 'Isolated SWIFT staging cluster. Process rundll32.exe terminated.' }
    ],
    evidenceCount: 3
  },
  {
    id: 'INC-2026-003',
    title: 'Anomalous Kerberoasting SPN Ticket Spurt',
    severity: 'High',
    assignedAnalyst: 'Vikram Malhotra',
    status: 'Triaged',
    affectedAssets: 'DC-CORP-01',
    createdAt: '2026-09-28 18:15 IST',
    slaRemaining: '03h 10m',
    tags: ['Kerberoast', 'ActiveDirectory', 'TGS-Request'],
    notes: [
      { author: 'Vikram Malhotra', time: '18:25 IST', text: 'Auditing 4769 ticket events for service account mssql_svc.' }
    ],
    evidenceCount: 2
  },
  {
    id: 'INC-2026-004',
    title: 'Rootkit Hook Detected in Kernel Dispatch Table',
    severity: 'Medium',
    assignedAnalyst: 'Ananya Sen',
    status: 'Under Review',
    affectedAssets: 'WS-DEV-09',
    createdAt: '2026-09-28 17:40 IST',
    slaRemaining: '05h 45m',
    tags: ['Rootkit', 'SSDT', 'Linux-eBPF'],
    notes: [
      { author: 'Ananya Sen', time: '17:50 IST', text: 'Investigating eBPF filter probe attached to sys_enter.' }
    ],
    evidenceCount: 1
  },
  {
    id: 'INC-2026-005',
    title: 'Suspicious USB RubberDucky Insertion on Terminal 88',
    severity: 'Low',
    assignedAnalyst: 'Rahul Shah',
    status: 'Closed',
    affectedAssets: 'LAPTOP-EXEC-02',
    createdAt: '2026-09-27 15:20 IST',
    slaRemaining: 'Met SLA',
    tags: ['PhysicalSecurity', 'USB', 'Remediated'],
    notes: [
      { author: 'Rahul Shah', time: '16:00 IST', text: 'Port locked down by policy. Device confiscated by physical security.' }
    ],
    evidenceCount: 2
  }
];

// MITRE ATT&CK Matrix (Module 9)
export const MITRE_MATRIX_DATA = [
  {
    tacticId: 'TA0001',
    name: 'Initial Access',
    techniques: [
      { id: 'T1566.001', name: 'Spearphishing Attachment', hits: 14, status: 'Observed', rule: 'SOC-PHISH-01', affected: 'PC-101, PC-104' },
      { id: 'T1190', name: 'Exploit Public-Facing App', hits: 3, status: 'Detected', rule: 'WAF-EXP-99', affected: 'KRN-GATEWAY-01' },
      { id: 'T1189', name: 'Drive-by Target Compromise', hits: 1, status: 'Monitored', rule: 'EDR-WEB-14', affected: 'WS-DEV-09' },
      { id: 'T1091', name: 'Replication Through Removable Media', hits: 2, status: 'Detected', rule: 'USB-TRK-02', affected: 'LAPTOP-EXEC-02' }
    ]
  },
  {
    tacticId: 'TA0002',
    name: 'Execution',
    techniques: [
      { id: 'T1059.001', name: 'PowerShell Encoded Scripting', hits: 28, status: 'Observed', rule: 'SIGMA-POWERSHELL-ENC', affected: 'PC-101, SRV-FIN-04' },
      { id: 'T1053.005', name: 'Scheduled Task/Job', hits: 9, status: 'Observed', rule: 'SOC-SCHTASK-ADD', affected: 'PC-101' },
      { id: 'T1047', name: 'Windows Management Instrumentation (WMI)', hits: 5, status: 'Detected', rule: 'WMI-EXEC-TRACE', affected: 'DC-CORP-01' },
      { id: 'T1204.002', name: 'Malicious File Execution', hits: 12, status: 'Observed', rule: 'SYS-EXEC-FILE', affected: 'PC-101' }
    ]
  },
  {
    tacticId: 'TA0003',
    name: 'Persistence',
    techniques: [
      { id: 'T1547.001', name: 'Registry Run Keys / Startup Folder', hits: 18, status: 'Observed', rule: 'REG-RUN-INJECT', affected: 'PC-101' },
      { id: 'T1543.003', name: 'Windows Service Creation', hits: 4, status: 'Detected', rule: 'SVC-7045-NEW', affected: 'PC-101, SRV-FIN-04' },
      { id: 'T1136.001', name: 'Create Local Account', hits: 2, status: 'Detected', rule: 'SEC-4720-ACCT', affected: 'PC-101' },
      { id: 'T1078.002', name: 'Domain Accounts Abuse', hits: 6, status: 'Monitored', rule: 'AD-ACCT-ANOM', affected: 'DC-CORP-01' }
    ]
  },
  {
    tacticId: 'TA0004',
    name: 'Privilege Escalation',
    techniques: [
      { id: 'T1055.001', name: 'Dynamic-link Library Injection', hits: 15, status: 'Observed', rule: 'MEM-DLL-INJECT', affected: 'PC-101' },
      { id: 'T1068', name: 'Exploitation for Privilege Escalation (BYOVD)', hits: 7, status: 'Observed', rule: 'BYOVD-RTCORE', affected: 'PC-101' },
      { id: 'T1134', name: 'Access Token Manipulation', hits: 3, status: 'Detected', rule: 'TOKEN-STEAL-01', affected: 'SRV-FIN-04' },
      { id: 'T1548.002', name: 'Bypass User Account Control (UAC)', hits: 5, status: 'Detected', rule: 'UAC-BYPASS-FOD', affected: 'PC-101' }
    ]
  },
  {
    tacticId: 'TA0005',
    name: 'Defense Evasion',
    techniques: [
      { id: 'T1027.002', name: 'Software Packing & Obfuscation', hits: 22, status: 'Observed', rule: 'YARA-PACKED-PE', affected: 'PC-101' },
      { id: 'T1070.001', name: 'Clear Windows Event Logs', hits: 4, status: 'Observed', rule: 'LOG-CLEAR-1102', affected: 'PC-101' },
      { id: 'T1036.005', name: 'Masquerading as svchost.exe', hits: 8, status: 'Observed', rule: 'PROC-HOLLOW-SVCHOST', affected: 'PC-101' },
      { id: 'T1562.001', name: 'Disable Anti-Malware / AMSI Bypass', hits: 11, status: 'Observed', rule: 'AMSI-PATCH-MEM', affected: 'PC-101, SRV-FIN-04' }
    ]
  },
  {
    tacticId: 'TA0006',
    name: 'Credential Access',
    techniques: [
      { id: 'T1003.001', name: 'LSASS Memory Ingestion', hits: 19, status: 'Observed', rule: 'SIGMA-LSASS-DUMP', affected: 'SRV-FIN-04, PC-101' },
      { id: 'T1558.003', name: 'Kerberoasting Attack', hits: 9, status: 'Detected', rule: 'KERB-TGS-ROAST', affected: 'DC-CORP-01' },
      { id: 'T1555.003', name: 'Credentials from Web Browsers', hits: 6, status: 'Detected', rule: 'CHROME-VAULT-READ', affected: 'PC-101' },
      { id: 'T1110.003', name: 'Password Spraying', hits: 14, status: 'Monitored', rule: 'SPRAY-AUTH-50', affected: 'DC-CORP-01' }
    ]
  },
  {
    tacticId: 'TA0007',
    name: 'Discovery',
    techniques: [
      { id: 'T1087.002', name: 'Domain Account Discovery (AdFind)', hits: 12, status: 'Observed', rule: 'ADFIND-TOOL-EXEC', affected: 'PC-101' },
      { id: 'T1018', name: 'Remote System Discovery (net view)', hits: 8, status: 'Observed', rule: 'NET-VIEW-DISCOV', affected: 'PC-101' },
      { id: 'T1083', name: 'File and Directory Discovery', hits: 15, status: 'Monitored', rule: 'DIR-TRAVERSAL-CMD', affected: 'PC-101' },
      { id: 'T1046', name: 'Network Service Scanning', hits: 11, status: 'Detected', rule: 'PORT-SCAN-SYN', affected: 'WS-DEV-09' }
    ]
  },
  {
    tacticId: 'TA0008',
    name: 'Lateral Movement',
    techniques: [
      { id: 'T1021.002', name: 'SMB/Windows Admin Shares (C$)', hits: 7, status: 'Observed', rule: 'SMB-LATERAL-PSH', affected: 'PC-101 -> DC-CORP-01' },
      { id: 'T1021.001', name: 'Remote Desktop Protocol (RDP)', hits: 4, status: 'Detected', rule: 'RDP-BRUTE-INTERN', affected: 'SRV-FIN-04' },
      { id: 'T1550.002', name: 'Pass the Hash (PtH)', hits: 3, status: 'Detected', rule: 'PTH-NTLM-REPLAY', affected: 'DC-CORP-01' }
    ]
  },
  {
    tacticId: 'TA0009',
    name: 'Command And Control',
    techniques: [
      { id: 'T1071.001', name: 'Web Protocols HTTPS Beaconing', hits: 34, status: 'Observed', rule: 'ZEEK-BEACON-DETECT', affected: 'PC-101' },
      { id: 'T1573.002', name: 'Asymmetric Encrypted C2 Channel', hits: 19, status: 'Observed', rule: 'TLS-UNTRUSTED-CERT', affected: 'PC-101, SRV-FIN-04' },
      { id: 'T1071.004', name: 'DNS Tunneling & TXT Queries', hits: 8, status: 'Observed', rule: 'DNS-EXFIL-TUNNEL', affected: 'PC-101' },
      { id: 'T1568.002', name: 'Domain Generation Algorithms (DGA)', hits: 14, status: 'Detected', rule: 'DGA-RANDOM-DOM', affected: 'PC-101' }
    ]
  },
  {
    tacticId: 'TA0010',
    name: 'Exfiltration',
    techniques: [
      { id: 'T1048.003', name: 'Exfiltration Over Unencrypted/C2 Channel', hits: 5, status: 'Observed', rule: 'NET-EXFIL-SPIKE', affected: 'SRV-FIN-04' },
      { id: 'T1567.002', name: 'Exfiltration to Cloud Storage', hits: 2, status: 'Monitored', rule: 'CLOUD-MEGA-UPLOAD', affected: 'WS-DEV-09' },
      { id: 'T1041', name: 'Exfiltration Over C2 Channel', hits: 6, status: 'Detected', rule: 'C2-STAGED-EXFIL', affected: 'PC-101' }
    ]
  }
];

// Evidence Repository (Module 10)
export const INITIAL_EVIDENCE_ITEMS = [
  {
    id: 'EVD-9001',
    name: 'Volatile Memory Image (PC-101)',
    filename: 'memdump_pc101_20260928_0855.raw',
    type: 'Memory Dump',
    size: '16.0 GB',
    hashSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    hashMd5: 'd41d8cd98f00b204e9800998ecf8427e',
    collectionTime: '2026-09-28 08:55:12 IST',
    integrityStatus: 'Verified (HMAC Matches)',
    collectedBy: 'Rahul Shah (Badge #NTRO-894)',
    custodyLog: [
      { time: '08:55 IST', action: 'Acquisition via WinPmem Kernel Driver v4.0' },
      { time: '08:58 IST', action: 'SHA-256 Checksum Computed & Locked to Hardware HSM' },
      { time: '09:02 IST', action: 'Transferred to Secure JOCKY Evidence Vault' }
    ]
  },
  {
    id: 'EVD-9002',
    name: 'Network Packet Capture (Pcap-NG)',
    filename: 'pc101_c2_capture_20260928.pcapng',
    type: 'Network Capture',
    size: '1.42 GB',
    hashSha256: 'a7f920bc910014ef8231ab44901cf102948e77103abcf881294812fcf8812948',
    hashMd5: 'c901aef8192039102948120394810293',
    collectionTime: '2026-09-28 09:02:40 IST',
    integrityStatus: 'Verified (HMAC Matches)',
    collectedBy: 'Zeek / JOCKY Network Sniffer',
    custodyLog: [
      { time: '09:02 IST', action: 'Span Port Capture Filter: Host 192.168.1.12' },
      { time: '09:05 IST', action: 'Decryption Keys Extracted & Attached' }
    ]
  },
  {
    id: 'EVD-9003',
    name: 'Windows Security Event Log Hive',
    filename: 'winevt_security_pc101_full.evtx',
    type: 'Logs',
    size: '412 MB',
    hashSha256: 'c831f2410a887b091f0923e1104928e019284019283019284019284019284019',
    hashMd5: '12948102938401928401928401928401',
    collectionTime: '2026-09-28 09:10:15 IST',
    integrityStatus: 'Verified (HMAC Matches)',
    collectedBy: 'JOCKY Remote Forensic Agent',
    custodyLog: [
      { time: '09:10 IST', action: 'Raw Disk VSS Snapshot Extraction' }
    ]
  },
  {
    id: 'EVD-9004',
    name: 'System Registry Export Hive',
    filename: 'system_registry_hives_pc101.tar.gz',
    type: 'Registry Export',
    size: '84 MB',
    hashSha256: '44d88f9104019284019284019284019284019284019284019284019284019284',
    hashMd5: 'f8120394810293840192840192840192',
    collectionTime: '2026-09-28 09:14:02 IST',
    integrityStatus: 'Verified (HMAC Matches)',
    collectedBy: 'JOCKY Forensic Agent',
    custodyLog: [
      { time: '09:14 IST', action: 'SAM, SYSTEM, SOFTWARE hives dumped via RegSaveKeyExW' }
    ]
  },
  {
    id: 'EVD-9005',
    name: 'Kernel Driver Inventory Manifest',
    filename: 'kernel_drivers_manifest_pc101.json',
    type: 'Driver Inventory',
    size: '12 MB',
    hashSha256: '18f9210491820394810293840192840192840192840192840192840192840192',
    hashMd5: '48192039481029384019284019284019',
    collectionTime: '2026-09-28 09:16:30 IST',
    integrityStatus: 'Verified (HMAC Matches)',
    collectedBy: 'NTRO Kernel Driver Auditor',
    custodyLog: [
      { time: '09:16 IST', action: 'Verified signatures against Microsoft WHQL catalogue' }
    ]
  }
];

// Analytics Center (Module 11)
export const ANALYTICS_DATA = {
  threatDistribution: [
    { name: 'Cobalt Strike / C2', value: 38, color: '#ef4444' },
    { name: 'Credential Theft / LSASS', value: 24, color: '#f97316' },
    { name: 'Ransomware / Cryptor', value: 16, color: '#eab308' },
    { name: 'Rootkits / BYOVD', value: 12, color: '#8b5cf6' },
    { name: 'Data Exfiltration', value: 10, color: '#06b6d4' },
  ],
  incidentsPerMonth: [
    { month: 'Apr', total: 42, resolved: 39, critical: 6 },
    { month: 'May', total: 58, resolved: 52, critical: 11 },
    { month: 'Jun', total: 64, resolved: 60, critical: 14 },
    { month: 'Jul', total: 79, resolved: 71, critical: 18 },
    { month: 'Aug', total: 85, resolved: 78, critical: 19 },
    { month: 'Sep (Current)', total: 94, resolved: 82, critical: 23 },
  ],
  attackSourcesByCountry: [
    { country: 'United States', attacks: 1240, percentage: 38 },
    { country: 'Russia', attacks: 890, percentage: 27 },
    { country: 'China', attacks: 610, percentage: 19 },
    { country: 'Netherlands', attacks: 320, percentage: 10 },
    { country: 'North Korea', attacks: 195, percentage: 6 },
  ],
  endpointRiskHistogram: [
    { range: '0-20 (Healthy)', count: 340, fill: '#10b981' },
    { range: '21-50 (Low Risk)', count: 112, fill: '#06b6d4' },
    { range: '51-75 (Suspicious)', count: 48, fill: '#f59e0b' },
    { range: '76-90 (High Risk)', count: 19, fill: '#f97316' },
    { range: '91-100 (Compromised)', count: 13, fill: '#ef4444' },
  ],
  forensicCollectionStats: {
    totalGigabytesCollected: '148.6 TB',
    evidenceArtifactsLogged: 8412,
    meanTimeToDetect: '4.2 mins',
    meanTimeToRemediate: '24.8 mins',
    automatedTriageRate: '92.4%',
  }
};

// Platform Settings (Module 12)
export const INITIAL_SETTINGS = {
  agentVersion: 'v4.2.1-ntro-stable',
  heartbeatInterval: 5,
  telemetryEncryption: 'AES-256-GCM + Kyber-1024 Post-Quantum',
  cloudSync: {
    enabled: true,
    target: 'ntro-soc-central.gov.in:9443',
    lastSync: '21:05:12 IST',
    status: 'Connected & Encrypted'
  },
  roles: [
    { id: 'ROLE-ADMIN', name: 'Super Administrator', users: 3, permissions: ['Full Forensics', 'Live Memory Dump', 'Remote Isolation', 'Rule Management', 'Chain of Custody Export'] },
    { id: 'ROLE-T3', name: 'Tier-3 Forensics Lead', users: 8, permissions: ['Full Forensics', 'Live Memory Dump', 'Remote Isolation', 'Chain of Custody Export'] },
    { id: 'ROLE-T1', name: 'Tier-1 SOC Analyst', users: 24, permissions: ['View Telemetry', 'Triage Alerts', 'Assign Incidents'] },
    { id: 'ROLE-AUDIT', name: 'CERT-In / Legal Auditor', users: 4, permissions: ['Read-Only Access', 'Verify Cryptographic Hashes', 'Export Case Dossier'] },
  ],
  rbacMatrix: [
    { permission: 'Trigger Fleet Memory Acquisition', superAdmin: true, t3Lead: true, t1Analyst: false, auditor: false },
    { permission: 'Network Quarantine / Isolate Host', superAdmin: true, t3Lead: true, t1Analyst: false, auditor: false },
    { permission: 'Close & Seal Forensic Incidents', superAdmin: true, t3Lead: true, t1Analyst: false, auditor: false },
    { permission: 'Push Live YARA / Sigma Rules', superAdmin: true, t3Lead: true, t1Analyst: false, auditor: false },
    { permission: 'Export Cryptographic Legal Evidence', superAdmin: true, t3Lead: true, t1Analyst: true, auditor: true },
  ],
  notifications: {
    socSlackWebhook: 'https://hooks.slack.com/services/T00/B00/X00... (Configured)',
    ntroAlertRelay: 'ACTIVE (Port 9443 TLS)',
    smsEmergencyEscalation: 'Enabled (+91-98765-XXXXX)',
    autoContainmentOnP1: true
  }
};
