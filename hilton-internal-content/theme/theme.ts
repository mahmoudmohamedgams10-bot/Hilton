import { colors as base, spacing, radius } from '@/lib/theme';

// Semantic tokens layered on the existing palette. No backend impact.
export const colors = {
  ...base,
  urgent: base.red,
  urgentSoft: '#2A1620',
  normal: base.primary,
  normalSoft: '#17233A',
  success: base.green,
  wait: base.orange,
};

export { spacing, radius };
