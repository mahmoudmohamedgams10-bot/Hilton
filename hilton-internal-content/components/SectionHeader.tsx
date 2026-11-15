import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { spacing } from '@/lib/theme';
import { colors } from '../theme/theme';

type Props = {
  title: string;
  subtitle?: string;
  count?: number;
  accent?: string;
  style?: ViewStyle;
};

export function SectionHeader({ title, subtitle, count, accent, style }: Props) {
  return (
    <View style={[{ marginTop: spacing(2), marginBottom: spacing(3) }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ color: colors.text, fontSize: 20, fontWeight: '800' }}>{title}</Text>
        {typeof count === 'number' ? (
          <View style={{
            backgroundColor: accent ?? colors.primary, borderRadius: 999,
            paddingHorizontal: spacing(2.5), paddingVertical: spacing(0.5),
          }}>
            <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 13 }}>{count}</Text>
          </View>
        ) : null}
      </View>
      {subtitle ? (
        <Text style={{ color: colors.muted, fontSize: 13, marginTop: 2 }}>{subtitle}</Text>
      ) : null}
    </View>
  );
}
