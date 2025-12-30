import { useState, useEffect } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

const GOOGLE_MAPS_API_KEY = 
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) || ''

export function useGoogleMaps() {
  const [google, setGoogle] = useState<typeof globalThis.google | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check if Google Maps is already loaded
    if (typeof globalThis.google !== 'undefined' && globalThis.google) {
      setGoogle(globalThis.google)
      setIsLoaded(true)
      return
    }

    if (!GOOGLE_MAPS_API_KEY) {
      console.warn('Google Maps API key not configured')
      return
    }

    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places'],
    })

    loader
      .load()
      .then((loadedGoogle) => {
        setGoogle(loadedGoogle as typeof globalThis.google)
        setIsLoaded(true)
      })
      .catch((err) => {
        setError(err)
        console.error('Error loading Google Maps:', err)
      })
  }, [])

  return { google, isLoaded, error }
}

