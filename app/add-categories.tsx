import { ThemedText } from '@/components/themed-text'
import { useCategories } from '@/hooks/useCategories'
import Constants from 'expo-constants'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const AddCategories = () => {
    const { categories, addCategory, addSubcategory, removeCategory, removeSubcategory } = useCategories()
    const [newCategory, setNewCategory] = useState('')
    const [subInputs, setSubInputs] = useState<Record<string, string>>({})

  return (
    <SafeAreaProvider style={{ backgroundColor: 'transparent', position: 'relative', paddingTop: Constants.statusBarHeight }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <ThemedText type="title">Settings</ThemedText>
        <ThemedText type="default" style={{ marginTop: 10 }}>
          Manage categories and subcategories used throughout the app.
        </ThemedText>

        <ThemedText style={{ marginTop: 16 }}>Add category</ThemedText>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
          <TextInput value={newCategory} onChangeText={setNewCategory} placeholder="New category name" style={styles.input} />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              if (newCategory.trim()) {
                addCategory(newCategory.trim())
                setNewCategory('')
              }
            }}
          >
            <ThemedText type="defaultSemiBold">Add</ThemedText>
          </TouchableOpacity>
        </View>

        {categories ? (
          categories.map((c) => (
            <View key={c.id} style={styles.categoryCard}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <ThemedText type="defaultSemiBold">{c.name}</ThemedText>
                <TouchableOpacity onPress={() => removeCategory(c.id)}>
                  <ThemedText>Remove</ThemedText>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: 8 }}>
                {c.subcategories.map((s) => (
                  <View key={s} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <ThemedText>{s}</ThemedText>
                    <TouchableOpacity onPress={() => removeSubcategory(c.id, s)}>
                      <ThemedText>Remove</ThemedText>
                    </TouchableOpacity>
                  </View>
                ))}

                <View style={{ flexDirection: 'row', gap: 8, marginTop: 6 }}>
                  <TextInput
                    value={subInputs[c.id] || ''}
                    onChangeText={(text) => setSubInputs((p) => ({ ...p, [c.id]: text }))}
                    placeholder="New subcategory"
                    style={[styles.input, { flex: 1 }]}
                  />
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                      const val = (subInputs[c.id] || '').trim()
                      if (val) {
                        addSubcategory(c.id, val)
                        setSubInputs((p) => ({ ...p, [c.id]: '' }))
                      }
                    }}
                  >
                    <ThemedText type="defaultSemiBold">Add</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        ) : (
          <ThemedText style={{ marginTop: 12 }}>Loading categories...</ThemedText>
        )}
      </ScrollView>
    </SafeAreaProvider>
  )
}

export default AddCategories

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    minHeight: 44,
  },
  addButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
  },
  categoryCard: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: 'white',
  },
})