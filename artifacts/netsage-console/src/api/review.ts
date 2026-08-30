import type { Case, HumanReview } from '@/types';
import { apiRequest } from './client';

const REVIEW_KEY = 'netsage-human-reviews';
export function getLocalReviews(): Record<string, HumanReview> {
  try { return JSON.parse(localStorage.getItem(REVIEW_KEY) ?? '{}') as Record<string, HumanReview>; }
  catch { return {}; }
}
export function saveLocalReview(caseId: string, review: HumanReview): void {
  const reviews = getLocalReviews();
  localStorage.setItem(REVIEW_KEY, JSON.stringify({ ...reviews, [caseId]: review }));
}
export async function submitReview(caseItem: Case, review: HumanReview): Promise<HumanReview> {
  try { return await apiRequest<HumanReview>(`/cases/${caseItem.id}/review`, { method: 'POST', body: JSON.stringify(review) }); }
  catch { saveLocalReview(caseItem.id, review); return review; }
}