import React, { useCallback, useState } from 'react';
import { ScrollView, RefreshControl, View, Text } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Screen, Button, Title, Subtitle } from '@/components/ui';
import { useAuth } from '@/state/AuthContext';
import { listTasks } from '@/services/api';
import type { Task } from '@/lib/types';
import { spacing } from '@/lib/theme';
import { colors } from '../theme/theme';
import { isUrgentPriority, isNormalPriority } from '../utils/classify';
import { sectionTitles } from '../utils/labels';
import { SectionHeader } from '../components/SectionHeader';
import { ReportCard } from '../components/ReportCard';
import { LoadingState } from '../components/States';

export function HomeScreen() {
  const router = useRouter();
  const { profile, signOut } = useAuth();
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    setRefreshing(true);
    try { setTasks(await listTasks('', 'All')); }
    finally { setRefreshing(false); }
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const all = tasks ?? [];
  const urgent = all.filter((t) => isUrgentPriority(t.priority));
  const normal = all.filter((t) => isNormalPriority(t.priority));
  const urgentTasks = urgent.filter((t) => t.status !== 'Completed');
  const normalTasks = normal.filter((t) => t.status !== 'Completed');

  return (
    <Screen>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} />}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View><Title>{profile?.username ?? 'فني'}</Title><Subtitle>فريق الصيانة</Subtitle></View>
          <Button title="خروج" variant="ghost" onPress={signOut} />
        </View>

        {tasks === null ? (
          <LoadingState />
        ) : (
          <>
            <SectionHeader title={sectionTitles.urgentReports} subtitle={sectionTitles.urgentSubtitle} count={urgent.length} accent={colors.urgent} />
            {urgent.length === 0 ? <EmptyNote text={sectionTitles.emptyUrgent} /> : urgent.map((t) => <ReportCard key={t.id} task={t} onPress={() => router.push(`/tasks/${t.id}`)} />)}

            <SectionHeader title={sectionTitles.normalReports} count={normal.length} accent={colors.normal} />
            {normal.length === 0 ? <EmptyNote text={sectionTitles.emptyNormal} /> : normal.map((t) => <ReportCard key={t.id} task={t} onPress={() => router.push(`/tasks/${t.id}`)} />)}

            <View style={{ height: spacing(4) }} />

            <SectionHeader title={sectionTitles.urgentTasks} count={urgentTasks.length} accent={colors.urgent} />
            {urgentTasks.length === 0 ? <EmptyNote text={sectionTitles.emptyTasks} /> : urgentTasks.map((t) => <ReportCard key={t.id} task={t} onPress={() => router.push(`/tasks/${t.id}`)} />)}

            <SectionHeader title={sectionTitles.normalTasks} count={normalTasks.length} accent={colors.normal} />
            {normalTasks.length === 0 ? <EmptyNote text={sectionTitles.emptyTasks} /> : normalTasks.map((t) => <ReportCard key={t.id} task={t} onPress={() => router.push(`/tasks/${t.id}`)} />)}
          </>
        )}
      </ScrollView>
    </Screen>
  );
}

function EmptyNote({ text }: { text: string }) {
  return (
    <View style={{ padding: spacing(4), borderRadius: 16, borderWidth: 1, borderColor: colors.border, marginBottom: spacing(3) }}>
      <Text style={{ color: colors.muted, textAlign: 'center' }}>{text}</Text>
    </View>
  );
}
