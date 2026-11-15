import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { colors } from '../theme/theme';
import { spacing } from '@/lib/theme';

export function LoadingState({ label = 'جارٍ التحميل...' }: { label?: string }) {
  return (
    <View style={{ alignItems: 'center', paddingVertical: spacing(6) }}>
      <ActivityIndicator color={colors.primary} />
      <Text style={{ color: colors.muted, marginTop: spacing(2) }}>{label}</Text>
    </View>
  );
}
