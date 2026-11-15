import React from 'react';
import { Text, View } from 'react-native';
import type { Priority, TaskStatus } from '@/lib/types';
import { statusColor, priorityColor } from '@/services/api';
import { statusLabels, priorityLabels } from '../utils/labels';
import { spacing } from '@/lib/theme';

function Chip({ label, color }: { label: string; color: string }) {
  return (
    <View style={{
      borderWidth: 1, borderColor: color, borderRadius: 999,
      paddingHorizontal: spacing(2.5), paddingVertical: spacing(0.75),
      alignSelf: 'flex-start', backgroundColor: `${color}22`,
    }}>
      <Text style={{ color, fontSize: 12, fontWeight: '700' }}>{label}</Text>
    </View>
  );
}

export function StatusBadge({ status }: { status: TaskStatus }) {
  return <Chip label={statusLabels[status]} color={statusColor(status)} />;
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return <Chip label={priorityLabels[priority]} color={priorityColor(priority)} />;
}
