import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl, View, Text } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Screen, Input } from '@/components/ui';
import { listTasks } from '@/services/api';
import type { Task } from '@/lib/types';
import { spacing } from '@/lib/theme';
import { colors } from '../theme/theme';
import { ReportCard } from '../components/ReportCard';
import { LoadingState } from '../components/States';

export function ArchiveScreen() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => { setRefreshing(true); try { setTasks(await listTasks('', 'Completed')); } finally { setRefreshing(false); } }, []);
  useFocusEffect(useCallback(() => { load(); }, [load]));

  const q = search.trim().toLowerCase();
  const filtered = (tasks ?? []).filter((t) => !q || `${t.title} ${t.location} ${t.room_number ?? ''}`.toLowerCase().includes(q));

  return (
    <Screen>
      <Text style={{ color: colors.text, fontSize: 20, fontWeight: '800', marginBottom: spacing(2) }}>أرشيف الصيانة</Text>
      <Input placeholder="بحث في الأرشيف" value={search} onChangeText={setSearch} />
      {tasks === null ? (<LoadingState />) : (
        <FlatList data={filtered} keyExtractor={(t) => t.id} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} />}
          ListEmptyComponent={<View style={{ padding: spacing(4) }}><Text style={{ color: colors.muted, textAlign: 'center' }}>لا توجد بلاغات مكتملة</Text></View>}
          renderItem={({ item }) => <ReportCard task={item} onPress={() => router.push(`/tasks/${item.id}`)} />} />
      )}
    </Screen>
  );
}
