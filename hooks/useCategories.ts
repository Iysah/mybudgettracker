import { useEffect, useState } from 'react'
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV({ id: 'mybudgettracker' })

export type Category = {
  id: string
  name: string
  subcategories: string[]
}

const STORAGE_KEY = '@mbt:categories'

const defaultCategories: Category[] = [
  { id: 'fixed', name: 'Fixed Expenses', subcategories: ['Rent/Mortgage', 'Electricity', 'Water', 'Gas', 'Internet', 'Airtime'] },
  { id: 'food', name: 'Food', subcategories: ['Groceries', 'Snacks', 'Yogurt/Coffee'] },
  { id: 'transport', name: 'Transport', subcategories: ['Fuel', 'Maintenance', 'Parking Fees', 'Insurance', 'Public Transport'] },
  { id: 'shopping', name: 'Shopping', subcategories: ['Clothing', 'Beauty', 'Home Goods', 'Electronics', 'Gifts'] },
  { id: 'fitness', name: 'Fitness', subcategories: ['Gym Membership', 'Supplements', 'Sport Equipment', 'Wellness Products', 'Vitamins'] },
]

export function useCategories() {
  const [categories, setCategories] = useState<Category[] | null>(null)

  useEffect(() => {
    try {
      const raw = storage.getString(STORAGE_KEY)
      if (raw) {
        setCategories(JSON.parse(raw))
      } else {
        setCategories(defaultCategories)
        storage.set(STORAGE_KEY, JSON.stringify(defaultCategories))
      }
    } catch (err) {
      // fallback to defaults
      setCategories(defaultCategories)
    }
  }, [])

  function persist(next: Category[]) {
    setCategories(next)
    try {
      storage.set(STORAGE_KEY, JSON.stringify(next))
    } catch (err) {
      // ignore
    }
  }

  function addCategory(name: string) {
    if (!categories) return
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const next = [...categories, { id, name, subcategories: [] }]
    persist(next)
  }

  function addSubcategory(categoryId: string, sub: string) {
    if (!categories) return
    const next = categories.map((c) => (c.id === categoryId ? { ...c, subcategories: [...c.subcategories, sub] } : c))
    persist(next)
  }

  function removeCategory(categoryId: string) {
    if (!categories) return
    const next = categories.filter((c) => c.id !== categoryId)
    persist(next)
  }

  function removeSubcategory(categoryId: string, sub: string) {
    if (!categories) return
    const next = categories.map((c) => (c.id === categoryId ? { ...c, subcategories: c.subcategories.filter((s) => s !== sub) } : c))
    persist(next)
  }

  return {
    categories,
    addCategory,
    addSubcategory,
    removeCategory,
    removeSubcategory,
  }
}
