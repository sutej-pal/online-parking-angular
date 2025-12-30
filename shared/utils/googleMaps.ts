import { Loader, LoaderOptions } from '@googlemaps/js-api-loader'

let googleInstance: typeof google | null = null
let loaderInstance: Loader | null = null
let isLoading = false
let loadPromise: Promise<typeof google> | null = null

export interface GoogleMapsConfig {
  apiKey: string
  libraries?: ('places' | 'marker' | 'drawing' | 'geometry' | 'visualization')[]
  region?: string
  version?: string
}

/**
 * Initialize Google Maps API
 * @param config Configuration object with API key and options
 * @returns Promise that resolves to the google.maps instance
 */
export async function initGoogleMaps(config: GoogleMapsConfig): Promise<typeof google> {
  // Return existing instance if already loaded
  if (googleInstance) {
    return googleInstance
  }

  // Return existing promise if already loading
  if (loadPromise) {
    return loadPromise
  }

  // Check if already loaded in window
  if (typeof window !== 'undefined' && window.google) {
    googleInstance = window.google
    return googleInstance
  }

  isLoading = true

  const options: LoaderOptions = {
    libraries: config.libraries || ['places', 'marker'],
    region: config.region || 'IN',
    version: config.version || 'beta',
  }

  loaderInstance = new Loader(config.apiKey, options)

  loadPromise = loaderInstance
    .load()
    .then((google) => {
      googleInstance = google as typeof google
      // Ensure it's also available on window for compatibility
      if (typeof window !== 'undefined') {
        ;(window as any).google = google
      }
      isLoading = false
      return googleInstance
    })
    .catch((error) => {
      isLoading = false
      loadPromise = null
      throw error
    })

  return loadPromise
}

/**
 * Get the current Google Maps instance
 * @returns The google.maps instance or null if not loaded
 */
export function getGoogleMapsInstance(): typeof google | null {
  if (typeof window !== 'undefined' && window.google) {
    return window.google
  }
  return googleInstance
}

/**
 * Check if Google Maps is loaded
 * @returns true if Google Maps is loaded
 */
export function isGoogleMapsLoaded(): boolean {
  return googleInstance !== null || (typeof window !== 'undefined' && !!window.google)
}

/**
 * Reset the Google Maps instance (useful for testing or re-initialization)
 */
export function resetGoogleMapsInstance(): void {
  googleInstance = null
  loaderInstance = null
  loadPromise = null
  isLoading = false
}

