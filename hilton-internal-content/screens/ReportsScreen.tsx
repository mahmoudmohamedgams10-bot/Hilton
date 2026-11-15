import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl, View, Text } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Screen, Input, Button } from '@/components/ui';
import { listTasks } from '@/services/api';
import type { Task, TaskStatus, Category } from '@/lib/types';
import { spacing } from '@/lib/theme';
import { colors } from '../theme/theme';
import { categoryLabels, statusLabels, sectionTitles } from '../utils/labels';
import { isUrgentPriority, isNormalPriority } from '../utils/classify';
import { ReportCard } from '../components/ReportCard';
import { LoadingState } from '../components/States';

type Urgency = 'All' | 'Urgent' | 'Normal';
const urgencyOptions: Urgency[] = ['All', 'Urgent', 'Normal'];
const urgencyLabels: Record<Urgency, string> = { All: 'الكل', Urgent: 'عاجلة', Normal: 'عادية' };
const categories = Object.keys(categoryLabels) as Category[];
const statuses = ['All', 'New', 'In Progress', 'Pending', 'Completed'] as const;

export function ReportsScreen() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [urgency, setUrgency] = useState<Urgency>('All');
  const [status, setStatus] = useState<TaskStatus | 'All'>('All');
  const [category, setCategory] = useState<Category | 'All'>('All');

  const load = useCallback(async () => { setRefreshing(true); try { setTasks(await listTasks('', 'All')); } finally { setRefreshing(false); } }, []);
  useFocusEffect(useCallback(() => { load(); }, [load]));

  const all = tasks ?? [];
  const q = search.trim().toLowerCase();
  const filtered = all.filter((t) => {
    if (urgency === 'Urgent' && !isUrgentPriority(t.priority)) return false;
    if (urgency === 'Normal' && !isNormalPriority(t.priority)) return false;
    if (status !== 'All' && t.status !== status) return false;
    if (category !== 'All' && t.category !== category) return false;
    if (q) { const hay = `${t.title} ${t.location} ${t.room_number ?? ''} ${t.description}`.toLowerCase(); if (!hay.includes(q)) return false; }
    return true;
  });

  return (
    <Screen>
      <Input placeholder="بحث في البلاغات" value={search} onChangeText={setSearch} />
      <FilterRow label="الأولوية" options={urgencyOptions} selected={urgency} onSelect={setUrgency} renderLabel={(o) => urgencyLabels[o]} />
      <FilterRow label="الحالة" options={statuses} selected={status as string} onSelect={(o) => setStatus(o as TaskStatus | 'All')} renderLabel={(o) => o === 'All' ? 'الكل' : statusLabels[o as TaskStatus]} />
      <FilterRow label="القسم" options={['All', ...categories] as string[]} selected={category as string} onSelect={(o) => setCategory(o as Category | 'All')} renderLabel={(o) => o === 'All' ? 'الكل' : categoryLabels[o as Category]} />
      {tasks === null ? (<LoadingState />) : (
        <FlatList data={filtered} keyExtractor={(t) => t.id} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} />}
          ListEmptyComponent={<View style={{ padding: spacing(4) }}><Text style={{ color: colors.muted, textAlign: 'center' }}>{sectionTitles.emptyTasks}</Text></View>}
          renderItem={({ item }) => <ReportCard task={item} onPress={() => router.push(`/tasks/${item.id}`)} />} />
      )}
    </Screen>
  );
}

function FilterRow<T extends string>({ label, options, selected, onSelect, renderLabel }: { label: string; options: readonly T[]; selected: string; onSelect: (v: T) => void; renderLabel: (v: T) => string }) {
  return (
    <View style={{ marginBottom: spacing(2) }}>
      <Text style={{ color: colors.muted, fontSize: 13, marginBottom: spacing(1.5) }}>{label}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing(1.5) }}>
        {options.map((o) => <Button key={o} title={renderLabel(o)} variant={selected === o ? 'primary' : 'ghost'} onPress={() => onSelect(o)} />)}
      </View>
    </View>
  );
}
