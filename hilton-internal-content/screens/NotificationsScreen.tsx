import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Screen, Button } from '@/components/ui';
import { listNotifications, markAllNotificationsRead } from '@/services/api';
import type { NotificationItem } from '@/lib/types';
import { spacing, radius } from '@/lib/theme';
import { colors } from '../theme/theme';
import { formatDateTime } from '../utils/format';
import { LoadingState } from '../components/States';

export function NotificationsScreen() {
  const [items, setItems] = useState<NotificationItem[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => { setRefreshing(true); try { setItems(await listNotifications()); } finally { setRefreshing(false); } }, []);
  useFocusEffect(useCallback(() => { load(); }, [load]));

  return (
    <Screen>
      <Button title="تحديد الكل كمقروء" onPress={() => markAllNotificationsRead().then(load)} />
      {items === null ? (<LoadingState />) : (
        <FlatList data={items} keyExtractor={(n) => n.id} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} />}
          ListEmptyComponent={<View style={{ padding: spacing(4) }}><Text style={{ color: colors.muted, textAlign: 'center' }}>لا توجد إشعارات</Text></View>}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: colors.card, borderRadius: radius.md, padding: spacing(3.5), marginBottom: spacing(3), borderWidth: 1, borderColor: item.read_at ? colors.border : colors.primary }}>
              <Text style={{ color: colors.text, fontWeight: '800' }}>{item.title}</Text>
              {item.body ? <Text style={{ color: colors.muted, marginTop: 2 }}>{item.body}</Text> : null}
              <Text style={{ color: colors.muted, fontSize: 12, marginTop: spacing(1.5) }}>{formatDateTime(item.created_at)}</Text>
            </View>
          )} />
      )}
    </Screen>
  );
}
