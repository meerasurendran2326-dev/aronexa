import { mockService } from '@/data/mock-service';
import type { Case, DashboardStats } from '@/types';
import { apiRequest } from './client';

export async function listCases(): Promise<Case[]> {
  try { return await apiRequest<Case[]>('/cases'); } catch { return mockService.listCases(); }
}
export async function getCase(id: string): Promise<Case | undefined> {
  try { return await apiRequest<Case>(`/cases/${id}`); } catch { return mockService.listCases().find((item) => item.id === id); }
}
export async function getDashboardStats(): Promise<DashboardStats> {
  try { return await apiRequest<DashboardStats>('/dashboard/stats'); } catch { return mockService.stats(); }
}