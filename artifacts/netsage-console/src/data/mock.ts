import type { AIDiagnosis, Case, DashboardStats, RuleCheck, TimelineEvent } from '@/types';

export const mockCases: Case[] = [
  {
    id: 'INC-4821', issueType: 'Latency', title: 'Intermittent latency on west aggregation ring',
    severity: 'critical', symptom: 'Users report 800–1200ms latency to west-region services every 7–10 minutes.',
    topology: 'SFO-AGG-02 → SFO-CORE-01 → SEA-EDGE-04', showOutputs: ['icmp: 2% packet loss', 'bgp: flap detected 3x', 'interface: Gi0/24 errors rising'],
    expectedFault: 'Layer 2 loop or degrading optic on the west aggregation ring', osiLayer: 'Layer 2 · Data Link',
    concept: 'Ethernet fault isolation', status: 'investigating', aiStatus: 'needs_review', lastUpdated: '2025-03-08T14:32:00Z',
  },
  {
    id: 'INC-4817', issueType: 'Routing', title: 'BGP session reset between edge peers',
    severity: 'high', symptom: 'External routes withdrawn from the Frankfurt edge for 42 seconds.',
    topology: 'FRA-EDGE-01 ↔ AS64512 / AS64496', showOutputs: ['bgp: hold timer expired', 'logs: keepalive missed', 'cpu: 91% peak'],
    expectedFault: 'Control-plane contention causing BGP keepalive starvation', osiLayer: 'Layer 3 · Network',
    concept: 'BGP convergence', status: 'open', aiStatus: 'diagnosed', lastUpdated: '2025-03-08T13:18:00Z',
  },
  {
    id: 'INC-4809', issueType: 'Availability', title: 'API gateway health checks failing',
    severity: 'high', symptom: 'Gateway pool marks two healthy upstreams as unavailable.',
    topology: 'IAD-GW-03 → payments-api → IAD-DB-02', showOutputs: ['http: 503 from probe', 'tls: handshake 1.8s', 'pool: 2/6 available'],
    expectedFault: 'TLS negotiation delay exceeds gateway health-check budget', osiLayer: 'Layer 7 · Application',
    concept: 'Health check behavior', status: 'resolved', aiStatus: 'diagnosed', lastUpdated: '2025-03-08T11:51:00Z',
  },
  {
    id: 'INC-4798', issueType: 'Security', title: 'Unexpected east-west traffic spike',
    severity: 'medium', symptom: 'Workload segment emits 3.4x normal traffic to an unclassified subnet.',
    topology: 'K8S-NODE-17 → 10.44.18.0/24', showOutputs: ['netflow: 3.4x baseline', 'dns: 18 new lookups', 'policy: implicit allow'],
    expectedFault: 'Unapproved service-to-service dependency or compromised workload', osiLayer: 'Layer 3 · Network',
    concept: 'East-west traffic analysis', status: 'investigating', aiStatus: 'needs_review', lastUpdated: '2025-03-08T10:26:00Z',
  },
  {
    id: 'INC-4786', issueType: 'Performance', title: 'Storage replication lag on core cluster',
    severity: 'medium', symptom: 'Replica lag crosses 90 seconds during the nightly backup window.',
    topology: 'CHI-CORE-02 → CHI-STOR-01 / CHI-STOR-02', showOutputs: ['replication: 94s lag', 'disk: 82% busy', 'iops: 14.2k sustained'],
    expectedFault: 'Backup workload saturating storage write queue', osiLayer: 'Layer 4 · Transport',
    concept: 'Queue and throughput analysis', status: 'resolved', aiStatus: 'diagnosed', lastUpdated: '2025-03-07T22:08:00Z',
  },
  {
    id: 'INC-4771', issueType: 'DNS', title: 'Resolver timeout from branch offices',
    severity: 'low', symptom: 'Branch clients see sporadic DNS timeouts for internal records.',
    topology: 'BR-12 → SD-WAN → DNS-02', showOutputs: ['dns: 4 timeouts/min', 'vpn: renegotiated', 'latency: 240ms p95'],
    expectedFault: 'SD-WAN tunnel instability between branch and resolver', osiLayer: 'Layer 3 · Network',
    concept: 'Name resolution path', status: 'closed', aiStatus: 'diagnosed', lastUpdated: '2025-03-07T18:40:00Z',
  },
];

export const mockDiagnosis: Record<string, AIDiagnosis> = {
  'INC-4821': {
    root_cause: 'Degrading optic or physical-layer fault on SFO-AGG-02 Gi0/24 is triggering BGP flaps upstream.',
    confidence: 0.87,
    evidence: ['Gi0/24 input errors rise before each latency burst', 'BGP flaps originate at the aggregation node', 'Packet loss is isolated to the west ring path'],
    next_command: 'show interfaces Gi0/24 counters errors | include CRC|input|output',
    fix_steps: ['Capture interface counters during the next event', 'Reseat or replace the optic on Gi0/24', 'Validate BGP stability for 15 minutes after remediation'],
  },
  'INC-4817': {
    root_cause: 'CPU contention on FRA-EDGE-01 is starving BGP keepalives and expiring the peer hold timer.',
    confidence: 0.92,
    evidence: ['CPU peaks at 91% during the reset window', 'No transport loss observed on the peer path', 'Reset reason is hold timer expiry'],
    next_command: 'show processes cpu sorted | ex 0.00',
    fix_steps: ['Identify the process causing the CPU spike', 'Move the scheduled workload off the edge node', 'Confirm the peer remains established across two keepalive intervals'],
  },
  'INC-4809': {
    root_cause: 'TLS negotiation on payments-api exceeds the gateway health-check timeout budget.',
    confidence: 0.81,
    evidence: ['TLS handshake p95 is 1.8 seconds', 'HTTP probes return 503 before application logs show errors', 'Pool availability recovers when handshake is warm'],
    next_command: 'curl -sk -o /dev/null -w "%{time_connect} %{time_appconnect}\\n" https://payments-api/health',
    fix_steps: ['Increase probe timeout by 500ms', 'Inspect certificate chain and handshake CPU', 'Roll the gateway pool after verifying warm connections'],
  },
};

export const defaultDiagnosis: AIDiagnosis = {
  root_cause: 'The observed path is showing a transport or control-plane degradation that requires one more live signal to isolate.',
  confidence: 0.64,
  evidence: ['Symptoms cluster around a single network path', 'The rule checks indicate a correlated fault domain', 'No evidence of a broad regional outage'],
  next_command: 'show logging last 50 | include error|drop|reset',
  fix_steps: ['Collect the next command output', 'Compare against the known-good peer path', 'Apply the lowest-risk remediation and monitor'],
};

export const mockRuleChecks: Record<string, RuleCheck[]> = {
  'INC-4821': [
    { name: 'Path continuity', status: 'passed', detail: 'All expected hops respond; loss is localized after SFO-AGG-02.' },
    { name: 'Interface error correlation', status: 'failed', detail: 'CRC and input errors rise in the same window as the symptom.' },
    { name: 'Routing stability', status: 'warning', detail: 'Three BGP flaps observed within the last 20 minutes.' },
    { name: 'Blast radius', status: 'passed', detail: 'No correlated degradation on the east aggregation ring.' },
  ],
  'INC-4817': [
    { name: 'Peer reachability', status: 'passed', detail: 'TCP transport remains available throughout the reset.' },
    { name: 'Hold timer health', status: 'failed', detail: 'Keepalive gap exceeds the configured 30 second hold timer.' },
    { name: 'Control-plane pressure', status: 'failed', detail: 'CPU exceeded 90% for 38 seconds around the event.' },
    { name: 'Route churn', status: 'passed', detail: 'Withdrawn routes reconverged within 44 seconds.' },
  ],
};

export const defaultRules: RuleCheck[] = [
  { name: 'Path continuity', status: 'passed', detail: 'Expected hops respond with stable reachability.' },
  { name: 'Signal correlation', status: 'warning', detail: 'Signals correlate, but one live command output is recommended.' },
  { name: 'Blast radius', status: 'passed', detail: 'No matching degradation detected outside the case topology.' },
  { name: 'Known failure signature', status: 'pending', detail: 'Awaiting deterministic signature match.' },
];

export const mockTimeline: TimelineEvent[] = [
  { label: 'Evidence ingested', detail: 'Operator attached symptom, topology and command outputs', time: '14:18:04', status: 'complete' },
  { label: 'Rule set evaluated', detail: '4 deterministic checks completed in 184ms', time: '14:18:05', status: 'complete' },
  { label: 'AI diagnosis generated', detail: 'Evidence-grounded hypothesis with 87% confidence', time: '14:18:07', status: 'complete' },
  { label: 'Human review', detail: 'Awaiting operator decision and audit note', time: '—', status: 'active' },
];

export const mockStats: DashboardStats = {
  totalCases: 148, aiDiagnosed: 119, humanReviewed: 84, agreement: 91.6,
  criticalIssues: 7, resolvedCases: 102, passedRules: 436, aiCorrections: 11,
};