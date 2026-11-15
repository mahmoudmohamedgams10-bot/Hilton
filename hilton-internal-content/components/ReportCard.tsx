import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { Task } from '@/lib/types';
import { spacing, radius } from '@/lib/theme';
import { colors } from '../theme/theme';
import { StatusBadge, PriorityBadge } from './Badges';
import { formatDate } from '../utils/format';

export function ReportCard({ task, onPress }: { task: Task; onPress?: () => void }) {
  const location = [task.location, task.room_number ? `غرفة ${task.room_number}` : null,
    task.floor ? `طابق ${task.floor}` : null].filter(Boolean).join(' • ');
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{
      backgroundColor: colors.card, borderRadius: radius.md, borderWidth: 1,
      borderColor: colors.border, padding: spacing(4), marginBottom: spacing(3), opacity: pressed ? 0.85 : 1,
    }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <StatusBadge status={task.status} />
        <PriorityBadge priority={task.priority} />
      </View>
      <Text style={{ color: colors.text, fontSize: 16, fontWeight: '800', marginTop: spacing(2) }}>{task.title}</Text>
      {location ? <Text style={{ color: colors.muted, fontSize: 13, marginTop: 2 }}>{location}</Text> : null}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing(2.5) }}>
        <Text style={{ color: colors.muted, fontSize: 12 }}>
          {task.assignee?.username ? `المسؤول: ${task.assignee.username}` : 'غير مسند'}
        </Text>
        <Text style={{ color: colors.muted, fontSize: 12 }}>{formatDate(task.created_at)}</Text>
      </View>
    </Pressable>
  );
}
