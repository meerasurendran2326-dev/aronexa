import { defaultDiagnosis, defaultRules, mockCases, mockDiagnosis, mockRuleChecks, mockStats } from './mock';
import { realCases } from './real-dataset';
import type { AIDiagnosis, Case, DashboardStats, RuleCheck } from '@/types';

/** Local adapter used when the FastAPI boundary is not configured or reachable. */
export const mockService = {
  listCases(): Case[] { return realCases.length > 0 ? realCases : mockCases; },
  stats(): DashboardStats {
    const cases = this.listCases();
    if (cases === mockCases) return mockStats;
    const humanReviewed = cases.filter((item) => item.humanReview).length;
    const aligned = cases.filter((item) => item.rulePredictedCategory && item.rulePredictedCategory === item.expectedCategory).length;
    const agreement = cases.length > 0 ? Number(((aligned / cases.length) * 100).toFixed(1)) : 0;
    return {
      totalCases: cases.length,
      aiDiagnosed: cases.filter((item) => item.aiStatus !== 'pending').length,
      humanReviewed,
      agreement,
      criticalIssues: cases.filter((item) => item.severity === 'critical' && item.status !== 'resolved').length,
      resolvedCases: cases.filter((item) => item.status === 'resolved' || item.status === 'closed').length,
      passedRules: aligned,
      aiCorrections: cases.filter((item) => item.humanReview?.decision === 'corrected').length,
    };
  },
  rules(caseItem: Case): RuleCheck[] {
    if (!caseItem.expectedCategory) return mockRuleChecks[caseItem.id] ?? defaultRules;
    const categoryMatched = caseItem.rulePredictedCategory === caseItem.expectedCategory;
    return [
      { name: 'Evidence packet integrity', status: 'passed', detail: 'Required symptom, topology, and command evidence are present.' },
      { name: 'Fault signature', status: 'failed', detail: `${caseItem.expectedCategory} signature detected in the supplied evidence.` },
      { name: 'Rule category alignment', status: categoryMatched ? 'passed' : 'warning', detail: categoryMatched ? 'Deterministic category agrees with the expected fault family.' : 'Rule category differs from the expected label and needs human attention.' },
      { name: 'Verification path', status: caseItem.verificationCommand ? 'passed' : 'pending', detail: caseItem.verificationCommand ? `Verification command available: ${caseItem.verificationCommand}` : 'No verification command supplied in this case.' },
    ];
  },
  diagnosis(caseItem: Case): AIDiagnosis {
    return caseItem.sourceDiagnosis ?? mockDiagnosis[caseItem.id] ?? defaultDiagnosis;
  },
};