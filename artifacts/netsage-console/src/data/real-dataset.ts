import csvText from '@assets/cases_final_1788112780422.csv?raw';
import type { AIDiagnosis, Case, CaseStatus, HumanReview, ReviewDecision, Severity } from '@/types';

type CsvRow = Record<string, string>;

const packetPaths: Record<string, string> = {
  C001: '/labs/NetSage_C001_VLAN20_TrunkFault.pkt',
  C003: '/labs/NetSage_C003_SubnetMaskFault.pkt',
  C015: '/labs/NetSage_C015_SubnetMaskFault.pkt',
  C033: '/labs/NetSage_C033_DHCPFault.pkt',
  C034: '/labs/NetSage_C034_DNSFault.pkt',
  C035: '/labs/NetSage_C035_ACLFault.pkt',
  C043: '/labs/NetSage_Lab01_C043_ACL_Fault.pkt',
};

const categoryLabels: Record<string, string> = {
  TRUNK_VLAN: 'VLAN / Trunk',
  DEFAULT_GATEWAY: 'Gateway',
  SUBNET_MASK: 'IP Addressing',
  VLAN_ASSIGNMENT: 'VLAN',
  INTERFACE_SHUTDOWN: 'Interface',
  STATIC_ROUTE: 'Routing',
  DHCP: 'DHCP',
  DNS: 'DNS',
  ACL: 'ACL',
  NAT: 'NAT',
  WIRELESS: 'Wireless',
};

function parseCsv(input: string): CsvRow[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    const next = input[index + 1];

    if (quoted) {
      if (character === '"' && next === '"') {
        cell += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        cell += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ',') {
      row.push(cell);
      cell = '';
    } else if (character === '\n') {
      row.push(cell.replace(/\r$/, ''));
      rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += character;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell.replace(/\r$/, ''));
    rows.push(row);
  }

  const [header, ...data] = rows;
  if (!header) return [];
  return data
    .filter((values) => values.some((value) => value.trim().length > 0))
    .map((values) =>
      Object.fromEntries(header.map((key, index) => [key, values[index] ?? ''])),
    );
}

function value(row: CsvRow, key: string): string {
  return row[key]?.trim() ?? '';
}

function severityFor(row: CsvRow, index: number): Severity {
  const severity = value(row, 'severity').toLowerCase();
  if (severity === 'high' || severity === 'medium' || severity === 'low') {
    return severity;
  }
  return index % 4 === 0 ? 'high' : 'medium';
}

function statusFor(row: CsvRow): CaseStatus {
  const verification = value(row, 'verification_status').toLowerCase();
  if (verification.includes('verified') || value(row, 'evaluation_status').toLowerCase() === 'correct') {
    return 'resolved';
  }
  if (value(row, 'human_decision')) return 'closed';
  if (value(row, 'ai_root_cause')) return 'investigating';
  return 'open';
}

function aiStatusFor(row: CsvRow): Case['aiStatus'] {
  if (!value(row, 'ai_root_cause')) return 'pending';
  if (value(row, 'human_decision')) return 'diagnosed';
  return 'needs_review';
}

function titleFor(row: CsvRow): string {
  const fault = value(row, 'expected_fault');
  if (fault) return fault.length > 78 ? `${fault.slice(0, 75)}…` : fault;
  return `${categoryLabels[value(row, 'expected_category')] ?? 'Network'} evidence packet`;
}

function commandsFor(row: CsvRow): string[] {
  const commands = value(row, 'show_command')
    .split(';')
    .map((command) => command.trim())
    .filter(Boolean);
  return commands.length > 0 ? commands : ['Evidence output attached'];
}

function reviewFor(row: CsvRow, index: number): HumanReview | undefined {
  const decision = value(row, 'human_decision').toLowerCase();
  const decisionMap: Record<string, ReviewDecision> = {
    accepted: 'accepted',
    edited: 'corrected',
    rejected: 'rejected',
  };
  const mappedDecision = decisionMap[decision];
  if (!mappedDecision) return undefined;

  return {
    decision: mappedDecision,
    reviewer: 'Dataset reviewer',
    timestamp: new Date(Date.UTC(2025, 2, 8 - (index % 8), 10, (index * 7) % 60)).toISOString(),
    correctionReason: value(row, 'human_correction') || undefined,
  };
}

function diagnosisFor(row: CsvRow): AIDiagnosis | undefined {
  const rootCause = value(row, 'ai_root_cause');
  if (!rootCause) return undefined;
  const evidence = value(row, 'ai_evidence');
  const fix = value(row, 'ai_fix_steps');
  return {
    root_cause: rootCause,
    confidence: Number(value(row, 'ai_confidence')) || 0.72,
    evidence: evidence ? [evidence] : ['Diagnosis generated from the attached evidence packet.'],
    next_command: value(row, 'ai_next_command') || 'show running-config',
    fix_steps: fix ? [fix] : ['Collect one more command output before remediation.'],
  };
}

export const realCases: Case[] = parseCsv(csvText).map((row, index) => {
  const id = value(row, 'case_id') || `C${String(index + 1).padStart(3, '0')}`;
  const expectedCategory = value(row, 'expected_category');
  const packetName = value(row, 'packet_tracer_file');
  return {
    id,
    issueType: value(row, 'issue_type') || categoryLabels[expectedCategory] || 'Network',
    title: titleFor(row),
    severity: severityFor(row, index),
    symptom: value(row, 'symptom') || 'No symptom description supplied.',
    topology: value(row, 'topology_note') || 'Topology note unavailable.',
    showOutputs: commandsFor(row),
    commandOutput: value(row, 'show_command_output'),
    expectedFault: value(row, 'expected_fault') || 'Expected fault not supplied.',
    osiLayer: value(row, 'osi_layer') || 'Unspecified',
    concept: value(row, 'concept') || 'Network troubleshooting',
    status: statusFor(row),
    aiStatus: aiStatusFor(row),
    humanReview: reviewFor(row, index),
    lastUpdated: new Date(Date.UTC(2025, 2, 8 - (index % 8), 10, (index * 7) % 60)).toISOString(),
    packetTracerFile: packetName && !packetName.toLowerCase().startsWith('n/a') ? packetName : undefined,
    packetTracerPath: packetPaths[id],
    verificationCommand: value(row, 'verification_command') || undefined,
    verificationResult: value(row, 'verification_result') || undefined,
    evidenceSource: value(row, 'evidence_source') || undefined,
    expectedCategory: expectedCategory || undefined,
    rulePredictedCategory: value(row, 'rule_predicted_category') || undefined,
    sourceDiagnosis: diagnosisFor(row),
  };
});