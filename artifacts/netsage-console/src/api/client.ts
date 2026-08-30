const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '');

export class ApiUnavailable extends Error {
  constructor(message = 'API unavailable') {
    super(message);
    this.name = 'ApiUnavailable';
  }
}

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_URL) throw new ApiUnavailable();
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 1800);
  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...init,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
      signal: controller.signal,
    });
    if (!response.ok) throw new ApiUnavailable(`Request failed with ${response.status}`);
    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiUnavailable) throw error;
    throw new ApiUnavailable();
  } finally {
    window.clearTimeout(timeout);
  }
}