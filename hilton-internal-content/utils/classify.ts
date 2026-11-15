import type { Priority } from '@/lib/types';

export function isUrgentPriority(p?: Priority | null): boolean {
  return p === 'Critical' || p === 'High';
}

export function isNormalPriority(p?: Priority | null): boolean {
  return p === 'Medium' || p === 'Low';
}
