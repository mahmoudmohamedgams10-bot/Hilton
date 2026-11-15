import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Screen, Button, Input, Title } from '@/components/ui';
import { supabase } from '@/lib/supabase';
import { updateTask } from '@/services/api';
import type { Task, TaskStatus } from '@/lib/types';
import { spacing } from '@/lib/theme';
import { colors } from '../theme/theme';
import { StatusBadge, PriorityBadge } from '../components/Badges';
import { LoadingState } from '../components/States';
import { formatDateTime, formatDate } from '../utils/format';
import { statusLabels } from '../utils/labels';

const statuses: TaskStatus[] = ['New', 'In Progress', 'Pending', 'Completed'];

export function ReportDetailsScreen({ id }: { id: string }) {
  const [task, setTask] = useState<Task | null>(null);
  const [notes, setNotes] = useState('');

  const load = useCallback(async () => {
    const { data } = await supabase.from('tasks').select('*, assignee:profiles!tasks_assigned_to_fkey(username), creator:profiles!tasks_created_by_fkey(username)').eq('id', id).single();
    setTask(data as Task);
    if (data) setNotes((data as Task).completion_notes ?? '');
  }, [id]);

  useEffect(() => {
    load();
    const ch = supabase.channel(`task-${id}`).on('postgres_changes', { event: '*', schema: 'public', table: 'tasks', filter: `id=eq.${id}` }, load).subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [load]);

  if (!task) return <Screen><LoadingState /></Screen>;

  async function setStatus(s: TaskStatus) {
    if (s === 'Completed' && !notes.trim() && task?.priority === 'Critical') return Alert.alert('إغلاق حرج', 'يلزم ملاحظات إتمام قبل إغلاق بلاغ حرج');
    await updateTask(task!.id, { status: s, completion_notes: notes || task!.completion_notes });
    await load();
  }

  const location = [task.location, task.room_number ? `غرفة ${task.room_number}` : null, task.floor ? `طابق ${task.floor}` : null, task.equipment_type ? task.equipment_type : null].filter(Boolean).join(' • ');

  return (
    <Screen>
      <ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing(2) }}>
          <StatusBadge status={task.status} /><PriorityBadge priority={task.priority} />
        </View>
        <Title>{task.title}</Title>
        {task.description ? <Text style={{ color: colors.muted, marginBottom: spacing(2) }}>{task.description}</Text> : null}
        {location ? <Text style={{ color: colors.muted, marginBottom: spacing(1) }}>{location}</Text> : null}
        <Text style={{ color: colors.muted, marginBottom: spacing(2) }}>أنشأها: {task.creator?.username ?? 'غير معروف'} • المسؤول: {task.assignee?.username ?? 'غير مسند'}</Text>
        <Text style={{ color: colors.muted, marginBottom: spacing(2) }}>تاريخ الإنشاء: {formatDateTime(task.created_at)}</Text>
        {task.completion_notes ? (
          <View style={{ padding: spacing(3), borderRadius: 12, borderWidth: 1, borderColor: colors.border, marginBottom: spacing(3) }}>
            <Text style={{ color: colors.text, fontWeight: '800', marginBottom: spacing(1) }}>ملاحظات الإتمام</Text>
            <Text style={{ color: colors.muted }}>{task.completion_notes}</Text>
            {task.completed_at ? <Text style={{ color: colors.muted, fontSize: 12, marginTop: spacing(1) }}>اكتمل في: {formatDate(task.completed_at)}</Text> : null}
          </View>
        ) : null}
        <Text style={{ color: colors.text, fontWeight: '800', marginBottom: spacing(1.5) }}>تغيير الحالة</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing(1.5), marginBottom: spacing(3) }}>
          {statuses.map((s) => <Button key={s} title={statusLabels[s]} variant={task.status === s ? 'primary' : 'ghost'} onPress={() => setStatus(s)} />)}
        </View>
        <Input placeholder="ملاحظات الإتمام" multiline value={notes} onChangeText={setNotes} />
      </ScrollView>
    </Screen>
  );
}
