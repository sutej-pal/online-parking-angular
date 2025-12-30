// Google Maps type definitions
declare namespace google {
  namespace maps {
    class Geocoder {
      geocode(
        request: GeocoderRequest,
        callback: (results: GeocoderResult[] | null, status: GeocoderStatus) => void
      ): void
    }

    interface GeocoderRequest {
      address?: string
      location?: LatLng | LatLngLiteral
      placeId?: string
    }

    interface GeocoderResult {
      address_components: GeocoderAddressComponent[]
      formatted_address: string
      geometry: GeocoderGeometry
      place_id: string
      types: string[]
    }

    interface GeocoderAddressComponent {
      long_name: string
      short_name: string
      types: string[]
    }

    interface GeocoderGeometry {
      location: LatLng
      location_type: GeocoderLocationType
      viewport: LatLngBounds
      bounds?: LatLngBounds
    }

    type GeocoderLocationType =
      | 'ROOFTOP'
      | 'RANGE_INTERPOLATED'
      | 'GEOMETRIC_CENTER'
      | 'APPROXIMATE'

    type GeocoderStatus =
      | 'OK'
      | 'ZERO_RESULTS'
      | 'OVER_QUERY_LIMIT'
      | 'REQUEST_DENIED'
      | 'INVALID_REQUEST'
      | 'UNKNOWN_ERROR'

    class LatLng {
      constructor(lat: number, lng: number, noWrap?: boolean)
      lat(): number
      lng(): number
    }

    interface LatLngLiteral {
      lat: number
      lng: number
    }

    class LatLngBounds {
      constructor(sw?: LatLng | LatLngLiteral, ne?: LatLng | LatLngLiteral)
    }

    namespace places {
      class Autocomplete {
        constructor(
          inputField: HTMLInputElement,
          options?: AutocompleteOptions
        )
        addListener(event: string, callback: () => void): void
        getPlace(): PlaceResult
      }

      interface AutocompleteOptions {
        componentRestrictions?: ComponentRestrictions
        fields?: string[]
        strictBounds?: boolean
        types?: string[]
      }

      interface ComponentRestrictions {
        country?: string | string[]
      }

      interface PlaceResult {
        address_components?: AddressComponent[]
        formatted_address?: string
        geometry?: PlaceGeometry
        name?: string
        place_id?: string
        types?: string[]
      }

      interface AddressComponent {
        long_name: string
        short_name: string
        types: string[]
      }

      interface PlaceGeometry {
        location?: LatLng
        viewport?: LatLngBounds
      }
    }
  }
}

