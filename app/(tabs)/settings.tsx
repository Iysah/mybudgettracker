import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import Constants from 'expo-constants'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Settings = () => {
  return (
    <SafeAreaProvider style={{ backgroundColor: 'transparent', position: 'relative', paddingTop: Constants.statusBarHeight }}>
      <ScrollView>
        <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <ThemedText type="title">Settings</ThemedText>
          <ThemedText type="default" style={{ textAlign: 'center', marginTop: 10 }}>
            This is the settings screen of the app.
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </SafeAreaProvider>
  )
}

export default Settings

const styles = StyleSheet.create({
    
})