import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { lightColors } from '@/theme/colors'
import Constants from 'expo-constants'
import { router } from 'expo-router'
import { ChevronRight } from 'lucide-react-native'
import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const settingsTabs = [
  { label: 'Configure Budget', action: () => {router.push('/budget')} },
  { label: 'Spending Limit', action: () => {router.push('/limits')} },
  { label: 'Manage Categories', action: () => {router.push('/add-categories')} },
  { label: 'Currency', action: () => {router.push('/currency')} },
]
const Settings = () => {

  return (
    <SafeAreaProvider style={{ backgroundColor: 'transparent', position: 'relative', paddingTop: Constants.statusBarHeight }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <ThemedText type="title">Settings</ThemedText>
        <ThemedText type="default" style={{ marginTop: 10 }}>
          Manage categories and subcategories used throughout the app.
        </ThemedText>

        <ThemedView style={styles.settingsContainer}>
          {settingsTabs.map((tab) => (
            <TouchableOpacity key={tab.label} style={styles.settingsItem} onPress={tab.action}>
              <ThemedText>{tab.label}</ThemedText>
              <ChevronRight color={lightColors.textMuted} size={20}/>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ScrollView>
    </SafeAreaProvider>
  )
}

export default Settings

const styles = StyleSheet.create({
  settingsContainer: {
    marginTop: 16,
    gap: 12,
  },
  settingsItem: { 
    paddingVertical: 12, 
    borderBottomWidth: .5, 
    borderBottomColor: '#eee' ,

    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  }
})