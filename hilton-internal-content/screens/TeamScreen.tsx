import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Screen } from '@/components/ui';
import { listProfiles } from '@/services/api';
import type { Profile } from '@/lib/types';
import { spacing, radius } from '@/lib/theme';
import { colors } from '../theme/theme';
import { roleLabels } from '../utils/labels';
import { LoadingState } from '../components/States';

export function TeamScreen() {
  const [profiles, setProfiles] = useState<Profile[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => { setRefreshing(true); try { setProfiles(await listProfiles()); } finally { setRefreshing(false); } }, []);
  useFocusEffect(useCallback(() => { load(); }, [load]));

  return (
    <Screen>
      <Text style={{ color: colors.text, fontSize: 20, fontWeight: '800', marginBottom: spacing(2) }}>فريق الصيانة</Text>
      {profiles === null ? (<LoadingState />) : (
        <FlatList data={profiles} keyExtractor={(p) => p.id} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} />}
          ListEmptyComponent={<View style={{ padding: spacing(4) }}><Text style={{ color: colors.muted, textAlign: 'center' }}>لا يوجد أعضاء</Text></View>}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: colors.card, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, padding: spacing(4), marginBottom: spacing(3) }}>
              <Text style={{ color: colors.text, fontSize: 16, fontWeight: '800' }}>{item.username}</Text>
              <Text style={{ color: colors.muted, fontSize: 13, marginTop: 2 }}>{roleLabels[item.role]}</Text>
            </View>
          )} />
      )}
    </Screen>
  );
}
