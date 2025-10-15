import React, { useState } from 'react';
import {
    Alert,
    Button,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useToast } from '@/components/ui/toast';
import { useCategories } from '@/hooks/useCategories';
import { globalStyles } from '@/styles/global-styles';
import { lightColors } from '@/theme/colors';

type IncomeType = 'Salary' | 'Freelance' | 'Gifts' | 'Other'

export default function Income() {
    const [type, setType] = useState<IncomeType>('Salary')
    const [otherLabel, setOtherLabel] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState(new Date())
    const [notes, setNotes] = useState('')
    const [recurring, setRecurring] = useState(false)
    const [isDateObject, setIsDateObject] = useState(false);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [formattedDate, setFormattedDate] = useState(() => {
      const now = new Date();
      return now.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });
    });

    const { toast } = useToast();
    const { categories } = useCategories();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)

    function onSelectType(t: IncomeType) {
    setType(t)
    if (t !== 'Other') setOtherLabel('')
    }

    const handleConfirmDate = (date: Date): void => {
        // Store the actual Date object
        setDate(date);
        setIsDateObject(true);
        
        // Format the date for display only
        const options: Intl.DateTimeFormatOptions = { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
        };
        
        const formattedDateString: string = new Intl.DateTimeFormat('en-US', options).format(date);
        
        // Update state with the formatted date string for display
        setFormattedDate(formattedDateString);
        
        // Close the date picker modal
        setDatePickerVisible(false);
    };

    function onSubmit() {
        const numericAmount = parseFloat(amount.replace(/,/g, ''))
        if (!numericAmount || numericAmount <= 0) {
        Alert.alert('Invalid amount', 'Please enter an amount greater than 0')
        return
        }

        const payload = {
        type: type === 'Other' ? otherLabel || 'Other' : type,
        amount: numericAmount,
        date,
        recurring: type === 'Salary' ? recurring : false,
        notes,
        }

        // For now just log / alert the payload. Integration with storage/api can be added later.
        // eslint-disable-next-line no-console
        console.log('Income saved', payload)
        toast({
        title: 'Success!',
        description: 'Income entry saved.',
        variant: 'success',
        });
    }

  return (
    <ThemedView style={globalStyles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Add Income
        </ThemedText>

        <ThemedText style={styles.label}>Type</ThemedText>
        <ScrollView horizontal style={styles.typesRow} showsHorizontalScrollIndicator={false}>
          {(['Salary', 'Freelance', 'Gifts', 'Other'] as IncomeType[]).map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.typeButton, type === t ? styles.typeButtonActive : undefined]}
              onPress={() => onSelectType(t)}
            >
              <ThemedText type={type === t ? 'defaultSemiBold' : 'default'}>{t}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {type === 'Other' ? (
          <>
            <ThemedText style={styles.label}>Other label</ThemedText>
            <TextInput
              value={otherLabel}
              onChangeText={setOtherLabel}
              placeholder="e.g. Bonus"
              style={styles.input}
            />
          </>
        ) : null}

        <ThemedText style={styles.label}>Amount</ThemedText>
        <TextInput
          value={amount}
          onChangeText={(t) => setAmount(t)}
          placeholder="0.00"
          keyboardType={Platform.OS === 'ios' ? 'decimal-pad' : 'numeric'}
          style={styles.input}
        />
        <View style={styles.rowBetween}>
            <ThemedText style={styles.label}>Date</ThemedText>
            <TouchableOpacity 
                style={styles.dateButton}
                onPress={() => setDatePickerVisible(true)}
            >
                <ThemedText>{formattedDate}</ThemedText>
            </TouchableOpacity>
        </View>

        <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirmDate}
            onCancel={() => setDatePickerVisible(false)}
        />

        {type === 'Salary' ? (
          <View style={styles.rowBetween}>
            <ThemedText style={styles.label}>Recurring</ThemedText>
            <Switch value={recurring} onValueChange={setRecurring} />
          </View>
        ) : null}

        <ThemedText style={styles.label}>Notes</ThemedText>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="Optional notes"
          multiline
          numberOfLines={4}
          style={[styles.input, styles.notes]}
        />

        <View style={styles.buttonRow}>
          <Button title="Save" onPress={onSubmit} />
        </View>
      </ScrollView>
    </ThemedView>
  )
}

function formatDateISO(d: Date) {
  return d.toISOString().slice(0, 10)
}

function formatDateHuman(d: Date) {
  return d.toLocaleDateString()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    marginBottom: 12,
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
  },
  typesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  } as any,
  typeButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    backgroundColor: lightColors.secondary,
    marginRight: 8,
    marginBottom: 8,
  },
  typeButtonActive: {
    backgroundColor: '#3B82F6',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    minHeight: 44,
  },
  notes: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  dateButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  buttonRow: {
    marginTop: 20,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    elevation: 4,
  },
  modalButtons: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})