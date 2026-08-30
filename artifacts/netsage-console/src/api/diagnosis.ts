import { mockService } from '@/data/mock-service';
import type { AIDiagnosis, Case, RuleCheck } from '@/types';
import { apiRequest } from './client';

export async function runDiagnosis(caseItem: Case, rules: RuleCheck[]): Promise<AIDiagnosis> {
  try {
    return await apiRequest<AIDiagnosis>('/diagnosis', { method: 'POST', body: JSON.stringify({ case: caseItem, rules }) });
  } catch {
    return mockService.diagnosis(caseItem);
  }
}