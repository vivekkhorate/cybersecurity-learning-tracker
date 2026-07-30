export const initialRoadmap = [
  {
    phaseId: 1,
    title: "Phase 1: IT Fundamentals",
    description: "Core computer architecture, operating system internals, and virtualization basics.",
    topics: [
      { id: "p1-1", title: "Computer Hardware", estimatedHours: 4, difficulty: "Beginner", completed: false, notes: "" },
      { id: "p1-2", title: "Operating Systems Architecture", estimatedHours: 5, difficulty: "Beginner", completed: false, notes: "" },
      { id: "p1-3", title: "Windows Administration & CLI", estimatedHours: 6, difficulty: "Beginner", completed: false, notes: "" },
      { id: "p1-4", title: "Linux Command Line Basics", estimatedHours: 8, difficulty: "Beginner", completed: false, notes: "" },
      { id: "p1-5", title: "VirtualBox Lab Setup", estimatedHours: 3, difficulty: "Beginner", completed: false, notes: "" },
      { id: "p1-6", title: "VMware Workstation", estimatedHours: 3, difficulty: "Beginner", completed: false, notes: "" }
    ]
  },
  {
    phaseId: 2,
    title: "Phase 2: Networking & Security Controls",
    description: "Comprehensive network protocols, architecture, packet inspection, and security boundaries.",
    topics: [
      { id: "p2-1", title: "OSI Model Architecture", estimatedHours: 5, difficulty: "Beginner", completed: false, notes: "" },
      { id: "p2-2", title: "TCP/IP Protocol Suite", estimatedHours: 6, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-3", title: "IPv4 Addressing & Subnetting", estimatedHours: 8, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-4", title: "IPv6 Protocol", estimatedHours: 4, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-5", title: "DNS (Domain Name System)", estimatedHours: 5, difficulty: "Beginner", completed: false, notes: "" },
      { id: "p2-6", title: "DHCP Protocol Operations", estimatedHours: 3, difficulty: "Beginner", completed: false, notes: "" },
      { id: "p2-7", title: "ARP & MAC Address Resolution", estimatedHours: 4, difficulty: "Beginner", completed: false, notes: "" },
      { id: "p2-8", title: "ICMP & Network Diagnostics", estimatedHours: 3, difficulty: "Beginner", completed: false, notes: "" },
      { id: "p2-9", title: "HTTP & HTTPS SSL/TLS Handshake", estimatedHours: 6, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-10", title: "FTP & Secure File Transfer", estimatedHours: 3, difficulty: "Beginner", completed: false, notes: "" },
      { id: "p2-11", title: "SMTP Email Protocol", estimatedHours: 4, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-12", title: "SSH & Key Authentication", estimatedHours: 4, difficulty: "Beginner", completed: false, notes: "" },
      { id: "p2-13", title: "VPN Tunnels & IPsec", estimatedHours: 6, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-14", title: "Routing Protocols (OSPF, BGP)", estimatedHours: 7, difficulty: "Advanced", completed: false, notes: "" },
      { id: "p2-15", title: "Switching & Layer 2 Security", estimatedHours: 5, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-16", title: "Firewalls & Rule Base Design", estimatedHours: 7, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-17", title: "VLAN Segmentation & Trunking", estimatedHours: 5, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-18", title: "Wireshark Packet Analysis", estimatedHours: 10, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-19", title: "Cisco Packet Tracer Network Design", estimatedHours: 6, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-20", title: "Nmap Network Scanning", estimatedHours: 8, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-21", title: "IDS/IPS Intrusion Detection Systems", estimatedHours: 7, difficulty: "Advanced", completed: false, notes: "" },
      { id: "p2-22", title: "Proxy Servers & Reverse Proxies", estimatedHours: 4, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-23", title: "NAT (Network Address Translation)", estimatedHours: 4, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-24", title: "Wireless Security (WPA2/WPA3)", estimatedHours: 5, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-25", title: "Practice: Network Scanning Labs", estimatedHours: 6, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-26", title: "Practice: Packet Capture Analysis", estimatedHours: 6, difficulty: "Intermediate", completed: false, notes: "" }
    ]
  },
  {
    phaseId: 3,
    title: "Phase 3: Automation & Scripting",
    description: "Automating security checks, log parsing, and administrative tasks with modern shells.",
    topics: [
      { id: "p3-1", title: "Bash Scripting Basics & Loops", estimatedHours: 8, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p3-2", title: "Bash Log Parsing (grep, sed, awk)", estimatedHours: 10, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p3-3", title: "PowerShell Cmdlets & Pipelines", estimatedHours: 8, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p3-4", title: "PowerShell Automation & Incident Scripts", estimatedHours: 10, difficulty: "Advanced", completed: false, notes: "" }
    ]
  },
  {
    phaseId: 4,
    title: "Phase 4: Cybersecurity Fundamentals",
    description: "Core security concepts, cryptographic principles, adversary tactics, and risk frameworks.",
    topics: [
      { id: "p4-1", title: "CIA Triad (Confidentiality, Integrity, Availability)", estimatedHours: 3, difficulty: "Beginner", completed: false, notes: "" },
      { id: "p4-2", title: "Authentication Protocols & MFA", estimatedHours: 5, difficulty: "Beginner", completed: false, notes: "" },
      { id: "p4-3", title: "Authorization Models (RBAC, ABAC)", estimatedHours: 4, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p4-4", title: "Symmetric & Asymmetric Encryption", estimatedHours: 7, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p4-5", title: "Hashing & Cryptographic Integrity", estimatedHours: 4, difficulty: "Beginner", completed: false, notes: "" },
      { id: "p4-6", title: "Malware Types & Infection Vectors", estimatedHours: 8, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p4-7", title: "Phishing & Social Engineering Tactics", estimatedHours: 5, difficulty: "Beginner", completed: false, notes: "" },
      { id: "p4-8", title: "OWASP Top 10 Web Vulnerabilities", estimatedHours: 12, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p4-9", title: "MITRE ATT&CK Framework Mapping", estimatedHours: 10, difficulty: "Advanced", completed: false, notes: "" },
      { id: "p4-10", title: "Enterprise Security Policies & Governance", estimatedHours: 5, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p4-11", title: "Risk Management & Threat Modeling", estimatedHours: 6, difficulty: "Intermediate", completed: false, notes: "" }
    ]
  },
  {
    phaseId: 5,
    title: "Phase 5: Security Tools & Threat Intelligence",
    description: "Hands-on mastery of industry-standard security tools, SIEMs, and threat intelligence feeds.",
    topics: [
      { id: "p5-1", title: "Wireshark Traffic Analysis", estimatedHours: 8, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p5-2", title: "Nmap Scanning & Scripting Engine (NSE)", estimatedHours: 8, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p5-3", title: "Burp Suite Proxy & Interception", estimatedHours: 10, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p5-4", title: "Metasploit Basics & Payload Execution", estimatedHours: 10, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p5-5", title: "Splunk Enterprise Security & SPL", estimatedHours: 15, difficulty: "Advanced", completed: false, notes: "" },
      { id: "p5-6", title: "Microsoft Sentinel KQL Queries", estimatedHours: 12, difficulty: "Advanced", completed: false, notes: "" },
      { id: "p5-7", title: "Wazuh Open Source SIEM & XDR", estimatedHours: 10, difficulty: "Advanced", completed: false, notes: "" },
      { id: "p5-8", title: "Microsoft Defender for Endpoint", estimatedHours: 10, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p5-9", title: "VirusTotal Malware Hash & IP Analysis", estimatedHours: 4, difficulty: "Beginner", completed: false, notes: "" },
      { id: "p5-10", title: "urlscan.io Web Triage", estimatedHours: 3, difficulty: "Beginner", completed: false, notes: "" },
      { id: "p5-11", title: "WHOIS & Domain Investigation", estimatedHours: 3, difficulty: "Beginner", completed: false, notes: "" },
      { id: "p5-12", title: "AbuseIPDB Threat Reputation", estimatedHours: 3, difficulty: "Beginner", completed: false, notes: "" },
      { id: "p5-13", title: "Zscaler Cloud Security Gateways", estimatedHours: 5, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p5-14", title: "IPVoid & OSINT Investigations", estimatedHours: 3, difficulty: "Beginner", completed: false, notes: "" }
    ]
  },
  {
    phaseId: 6,
    title: "Phase 6: SOC Analyst Operations",
    description: "Real-world incident response workflows, log analysis, threat hunting, and detection engineering.",
    topics: [
      { id: "p6-1", title: "Windows Event Logs (Sysmon, Security Events)", estimatedHours: 12, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p6-2", title: "Linux System & Authentication Logs", estimatedHours: 10, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p6-3", title: "Incident Response Lifecycle (NIST / PICERL)", estimatedHours: 12, difficulty: "Advanced", completed: false, notes: "" },
      { id: "p6-4", title: "Threat Hunting Methodologies", estimatedHours: 14, difficulty: "Advanced", completed: false, notes: "" },
      { id: "p6-5", title: "Suspicious Email & Header Analysis", estimatedHours: 8, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p6-6", title: "IOC (Indicator of Compromise) Extraction", estimatedHours: 8, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p6-7", title: "MITRE ATT&CK Mapping & Technique Triage", estimatedHours: 10, difficulty: "Advanced", completed: false, notes: "" },
      { id: "p6-8", title: "Detection Engineering & Rule Writing (Sigma, YARA)", estimatedHours: 15, difficulty: "Advanced", completed: false, notes: "" }
    ]
  }
];
