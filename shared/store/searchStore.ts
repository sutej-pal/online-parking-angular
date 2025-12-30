import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SearchData {
  destination?: string
  lat?: number
  lng?: number
  arrivalDateTime?: string
  exitDateTime?: string
  vehicle?: string
}

interface SearchState {
  searchData: SearchData | null
  setSearchData: (data: SearchData) => void
  clearSearchData: () => void
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      searchData: null,
      setSearchData: (data) => set({ searchData: data }),
      clearSearchData: () => set({ searchData: null }),
    }),
    {
      name: 'search-storage',
    }
  )
)

