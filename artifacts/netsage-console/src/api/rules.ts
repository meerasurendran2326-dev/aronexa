import { mockService } from '@/data/mock-service';
import type { Case, RuleCheck } from '@/types';
import { apiRequest } from './client';

export async function runRuleChecks(caseItem: Case): Promise<RuleCheck[]> {
  try { return await apiRequest<RuleCheck[]>('/rules/check', { method: 'POST', body: JSON.stringify(caseItem) }); }
  catch { return mockService.rules(caseItem); }
}