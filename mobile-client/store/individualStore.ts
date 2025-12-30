import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Individual {
  id?: string
  firstName?: string
  lastName?: string
  email?: string
  token?: string
  [key: string]: any
}

interface IndividualState {
  individual: Individual | null
  setIndividual: (individual: Individual) => void
  clearIndividual: () => void
}

export const useIndividualStore = create<IndividualState>()(
  persist(
    (set) => ({
      individual: null,
      setIndividual: (individual) => set({ individual }),
      clearIndividual: () => set({ individual: null }),
    }),
    {
      name: 'individual-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

