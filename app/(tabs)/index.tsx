import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useBottomSheet } from '@/components/ui/bottom-sheet';
import { globalStyles } from '@/styles/global-styles';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [showIncomeSheet, setShowIncomeSheet] = useState(false);

  const { isVisible, open, close } = useBottomSheet();

  const spending = 1234.56;
  const budget = 10734.56;

  const { percentSpent, percentRemaining, remainingColor, remainingAmount, spentLabel } = useMemo(() => {
    const spent = Math.max(0, spending);
    const bud = Math.max(1, budget); // avoid division by zero
    const spentRatio = Math.min(1, spent / bud);
    const remainingRatio = Math.max(0, 1 - spentRatio);
    const remainingAmt = bud - spent;

    let color = '#3B82F6'; // blue
    if (remainingRatio < 0.2) color = '#F44336'; // red
    else if (remainingRatio < 0.5) color = '#FFB300'; // yellow

    return {
      percentSpent: spentRatio,
      percentRemaining: remainingRatio,
      remainingColor: color,
      remainingAmount: remainingAmt,
      spentLabel: `${(spentRatio * 100).toFixed(0)}%`,
    };
  }, [spending, budget]);

  const formatCurrency = (v: number) =>
    v.toLocaleString(undefined, { style: 'currency', currency: 'NGN', minimumFractionDigits: 2 });
  
  return (
    <SafeAreaProvider style={{ backgroundColor: 'transparent', position: 'relative', paddingTop: Constants.statusBarHeight }}>
      <ScrollView style={globalStyles.container}>
        <View style={styles.titleContainer}>
          <ThemedText type="subtitle">October</ThemedText>
        </View>

        <ThemedView style={styles.cardContainer}>
          <ThemedText type="defaultSemiBold" style={{ textAlign: 'center'}}>Balance</ThemedText>
          <ThemedText type="title" style={{ textAlign: 'center'}}>$12,345.67</ThemedText>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <View>
              <ThemedText type="default">Spending</ThemedText>
              <ThemedText type="default">$1,234.56</ThemedText>
            </View>
            <View>
              <ThemedText type="default">Budget</ThemedText>
              <ThemedText type="default">$10,734.56</ThemedText>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressSection}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${percentSpent * 100}%` }]} />
            </View>
          </View>
        </ThemedView>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={[styles.ctaButton, styles.incomeButton]}
            onPress={() => router.push('/income')}
            activeOpacity={0.85}
            accessibilityLabel="Add Income"
          >
            <View style={styles.ctaIcon}>
              <ThemedText style={styles.ctaIconText}>+</ThemedText>
            </View>
            <ThemedText style={styles.ctaLabel}>Add Income</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.ctaButton, styles.expenseButton]}
            onPress={() => {router.push('/expense')}}
            activeOpacity={0.85}
            accessibilityLabel="Add Expense"
          >
            <View style={styles.ctaIcon}>
              <ThemedText style={styles.ctaIconText}>−</ThemedText>
            </View>
            <ThemedText style={styles.ctaLabel}>Add Expense</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <ThemedText type="subtitle" style={{ marginTop: 24, marginBottom: 8 }}>
          Recent Transactions
        </ThemedText>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  cardContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#eee',
    gap: 8,
    marginBottom: 8,
  },
  progressMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  remainingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
    progressSection: {
    marginTop: 12,
    gap: 8,
  },
  progressTrack: {
    height: 10,
    backgroundColor: '#222',
    borderRadius: 6,
    overflow: 'hidden',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1252A5',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 12,
  },
  ctaButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  incomeButton: {
    backgroundColor: '#1E8E3E',
    marginRight: 6,
  },
  expenseButton: {
    backgroundColor: '#C62828',
    marginLeft: 6,
  },
  ctaIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  ctaIconText: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 18,
    fontWeight: '600',
  },
  ctaLabel: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },

});
