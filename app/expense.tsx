import React, { useState } from 'react'
import {
  Alert,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useToast } from '@/components/ui/toast'
import { useCategories } from '@/hooks/useCategories'
import { globalStyles } from '@/styles/global-styles'
import { lightColors } from '@/theme/colors'

export default function Expense() {
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(new Date())
  const [notes, setNotes] = useState('')
  const [isDatePickerVisible, setDatePickerVisible] = useState(false)
  const [formattedDate, setFormattedDate] = useState(() => new Date().toLocaleDateString())

  const { categories } = useCategories()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)

  const { toast } = useToast()

  const handleConfirmDate = (d: Date) => {
    setDate(d)
    setFormattedDate(d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }))
    setDatePickerVisible(false)
  }

  function onSubmit() {
    const numericAmount = parseFloat(amount.replace(/,/g, ''))
    if (!numericAmount || numericAmount <= 0) {
      Alert.alert('Invalid amount', 'Please enter an amount greater than 0')
      return
    }
    if (!selectedCategory) {
      Alert.alert('Category required', 'Please select a category')
      return
    }

    const payload = {
      category: selectedCategory,
      subcategory: selectedSubcategory,
      amount: numericAmount,
      date,
      notes,
    }

    // eslint-disable-next-line no-console
    console.log('Expense saved', payload)
    toast({ title: 'Saved', description: 'Expense entry saved.', variant: 'success' })
  }

  return (
    <ThemedView style={globalStyles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title">Add Expense</ThemedText>

        <ThemedText style={styles.label}>Category</ThemedText>
        {categories ? (
          <ScrollView horizontal style={styles.typesRow} showsHorizontalScrollIndicator={false}>
            {categories.map((c) => (
              <TouchableOpacity
                key={c.id}
                style={[styles.typeButton, selectedCategory === c.id ? styles.typeButtonActive : undefined]}
                onPress={() => {
                  setSelectedCategory(c.id)
                  setSelectedSubcategory(null)
                }}
              >
                <ThemedText type={selectedCategory === c.id ? 'defaultSemiBold' : 'default'}>{c.name}</ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <ThemedText>Loading categories...</ThemedText>
        )}

        {selectedCategory ? (
          <>
            <ThemedText style={styles.label}>Subcategory</ThemedText>
            <ScrollView horizontal style={styles.typesRow} showsHorizontalScrollIndicator={false}>
              {(categories?.find((c) => c.id === selectedCategory)?.subcategories || []).map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[styles.typeButton, selectedSubcategory === s ? styles.typeButtonActive : undefined]}
                  onPress={() => setSelectedSubcategory(s)}
                >
                  <ThemedText type={selectedSubcategory === s ? 'defaultSemiBold' : 'default'}>{s}</ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        ) : null}

        <ThemedText style={styles.label}>Amount</ThemedText>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="0.00"
          keyboardType={Platform.OS === 'ios' ? 'decimal-pad' : 'numeric'}
          style={styles.input}
        />

        <View style={styles.rowBetween}>
          <ThemedText style={styles.label}>Date</ThemedText>
          <TouchableOpacity style={styles.dateButton} onPress={() => setDatePickerVisible(true)}>
            <ThemedText>{formattedDate}</ThemedText>
          </TouchableOpacity>
        </View>

        <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirmDate} onCancel={() => setDatePickerVisible(false)} />

        <ThemedText style={styles.label}>Notes</ThemedText>
        <TextInput value={notes} onChangeText={setNotes} placeholder="Optional notes" multiline numberOfLines={4} style={[styles.input, styles.notes]} />

        <View style={styles.buttonRow}>
          <Button title="Save" onPress={onSubmit} />
        </View>
      </ScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  label: { marginTop: 12, marginBottom: 6 },
  typesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } as any,
  typeButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    backgroundColor: lightColors.secondary,
    marginRight: 8,
    marginBottom: 8,
  },
  typeButtonActive: { backgroundColor: '#ef4444' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, minHeight: 44 },
  notes: { minHeight: 100, textAlignVertical: 'top' },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  dateButton: { paddingVertical: 4, paddingHorizontal: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 },
  buttonRow: { marginTop: 20 },
})