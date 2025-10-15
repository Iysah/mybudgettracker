import { ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import Constants from 'expo-constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  return (
    <SafeAreaProvider style={{ backgroundColor: 'transparent', position: 'relative', paddingTop: Constants.statusBarHeight }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <ThemedText type="title">Summary</ThemedText>
        <ThemedText type="default" style={{ marginTop: 10 }}>
          View your spending habits and trends over time.
        </ThemedText>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
