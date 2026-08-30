export type Severity = 'critical' | 'high' | 'medium' | 'low';
export type CaseStatus = 'open' | 'investigating' | 'resolved' | 'closed';
export type AIStatus = 'pending' | 'diagnosed' | 'needs_review';
export type ReviewDecision = 'accepted' | 'corrected' | 'rejected';

export interface Evidence {
  symptom: string;
  topology: string;
  showOutputs: string[];
  expectedFault: string;
  osiLayer: string;
  concept: string;
}

export interface Case extends Evidence {
  id: string;
  issueType: string;
  title: string;
  severity: Severity;
  status: CaseStatus;
  aiStatus: AIStatus;
  humanReview?: HumanReview;
  lastUpdated: string;
  commandOutput?: string;
  packetTracerFile?: string;
  packetTracerPath?: string;
  verificationCommand?: string;
  verificationResult?: string;
  evidenceSource?: string;
  expectedCategory?: string;
  rulePredictedCategory?: string;
  sourceDiagnosis?: AIDiagnosis;
}

export interface RuleCheck {
  name: string;
  status: 'passed' | 'failed' | 'warning' | 'pending';
  detail: string;
}

export interface AIDiagnosis {
  root_cause: string;
  confidence: number;
  evidence: string[];
  next_command: string;
  fix_steps: string[];
}

export interface HumanReview {
  decision: ReviewDecision;
  reviewer: string;
  timestamp: string;
  correctionReason?: string;
  editedDiagnosis?: string;
}

export interface DashboardStats {
  totalCases: number;
  aiDiagnosed: number;
  humanReviewed: number;
  agreement: number;
  criticalIssues: number;
  resolvedCases: number;
  passedRules: number;
  aiCorrections: number;
}

export interface TimelineEvent {
  label: string;
  detail: string;
  time: string;
  status: 'complete' | 'active' | 'queued';
}