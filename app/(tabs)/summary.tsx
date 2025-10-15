import { ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Constants from 'expo-constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  return (
    <SafeAreaProvider style={{ backgroundColor: 'transparent', position: 'relative', paddingTop: Constants.statusBarHeight }}>
      <ScrollView>
        <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <ThemedText type="title">Summary</ThemedText>
          <ThemedText type="default" style={{ textAlign: 'center', marginTop: 10 }}>
            This is the summary screen of the app.
          </ThemedText>
        </ThemedView>
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
