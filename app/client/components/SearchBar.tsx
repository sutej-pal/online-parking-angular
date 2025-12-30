'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useForm } from 'react-hook-form'
import moment from 'moment'
import { useSearchStore } from '@/shared/store/searchStore'
import httpService from '@/shared/services/http.service'
import { NotificationService } from '@/shared/services/notification.service'
import { useGoogleMaps } from '@/shared/hooks/useGoogleMaps'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { MapPin, Car, Bike, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchForm {
  destination: string
  lat: number
  lng: number
  arrivalDateTime: string
  exitDateTime: string
  vehicleType: string
}

interface VehicleType {
  id: string
  name: string
}

export default function SearchBar() {
  const router = useRouter()
  const pathname = usePathname()
  const [vehicleTypesList, setVehicleTypesList] = useState<VehicleType[]>([])
  const [selectedVehicleType, setSelectedVehicleType] = useState<VehicleType | null>(null)
  const [isFormReady, setIsFormReady] = useState(false)
  const [isVehiclePopoverOpen, setIsVehiclePopoverOpen] = useState(false)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { google, isLoaded } = useGoogleMaps()
  const { setSearchData } = useSearchStore()

  const isVehicleSelectionVisible = pathname === '/client/search'

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SearchForm>({
    defaultValues: {
      destination: '',
      lat: 0,
      lng: 0,
      arrivalDateTime: moment().add(1, 'days').startOf('day').add(10, 'hours').format(),
      exitDateTime: moment().add(1, 'days').startOf('day').add(12, 'hours').format(),
      vehicleType: '',
    },
  })

  useEffect(() => {
    loadForm()
    getVehiclesTypes()
  }, [])

  useEffect(() => {
    if (isLoaded && google && inputRef.current && !autocompleteRef.current) {
      initializeAutoComplete()
    }
  }, [isLoaded, google])

  const loadForm = () => {
    const t = moment('10:00', 'hh:mm a')
    const minutes = t.hour() * 60 + t.minute()
    const date = moment().add(1, 'days').startOf('day')
    const arrivalDateTime = moment(date).add(minutes, 'minutes').format()
    const exitDateTime = moment(date).add(2, 'hours').add(minutes, 'minutes').format()

    setValue('arrivalDateTime', arrivalDateTime)
    setValue('exitDateTime', exitDateTime)
    setIsFormReady(true)
  }

  const initializeAutoComplete = () => {
    if (!google || !inputRef.current) return

    const options = {
      componentRestrictions: { country: ['in'] },
      fields: ['formatted_address', 'geometry', 'name'],
      strictBounds: false,
      types: ['address'],
    }

    autocompleteRef.current = new google.maps.places.Autocomplete(
      inputRef.current,
      options
    )

    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current?.getPlace()
      if (place?.geometry?.location) {
        updateForm(place)
      }
    })
  }

  const updateForm = (place: google.maps.places.PlaceResult) => {
    if (place.formatted_address && place.geometry?.location) {
      setValue('destination', place.formatted_address)
      setValue('lat', place.geometry.location.lat())
      setValue('lng', place.geometry.location.lng())
    }
  }

  const getCurrentLocation = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!navigator.geolocation) {
      NotificationService.showError('Geolocation is not supported by your browser')
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude

        if (google) {
          const geocoder = new google.maps.Geocoder()
          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === 'OK' && results?.[0]) {
              updateForm(results[0])
            }
          })
        }
      },
      (error) => {
        NotificationService.showError('Error getting location: ' + error.message)
      }
    )
  }

  const getVehiclesTypes = async () => {
    try {
      const response = await httpService.get('/vehicle')
      const vehicles = response.data.data || response.data
      setVehicleTypesList(vehicles)
      const car = vehicles.find((v: VehicleType) => v.name === 'Car')
      if (car) {
        setSelectedVehicleType(car)
        setValue('vehicleType', car.id)
      }
    } catch (error) {
      NotificationService.showError('Failed to load vehicles types.')
    }
  }

  const selectVehicleType = (vehicle: VehicleType) => {
    setValue('vehicleType', vehicle.id)
    setSelectedVehicleType(vehicle)
    setIsVehiclePopoverOpen(false)
  }

  const onSubmit = async (data: SearchForm) => {
    const searchData = {
      lat: data.lat,
      lng: data.lng,
      arrivalDateTime: data.arrivalDateTime,
      exitDateTime: data.exitDateTime,
      destination: data.destination,
      vehicle: data.vehicleType,
    }
    setSearchData(searchData)
    router.push('/client/search')
  }

  const arrivalDateTime = watch('arrivalDateTime')
  const exitDateTime = watch('exitDateTime')
  const isDateTimeValid = moment(exitDateTime).isAfter(moment(arrivalDateTime))

  return (
    <div className="w-full bg-muted/50 py-6">
      <div className="container mx-auto px-4">
        {isFormReady && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-wrap items-end justify-center gap-4"
          >
            <div className="relative w-full max-w-[350px]">
              <Label htmlFor="destination">Parking Destination</Label>
              <div className="relative">
                <Input
                  id="destination"
                  type="text"
                  placeholder="Enter destination"
                  className={cn(
                    "pr-10",
                    errors.destination && "border-destructive"
                  )}
                  {...register('destination', { required: 'Destination is required' })}
                  ref={inputRef}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={getCurrentLocation}
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
              {errors.destination && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.destination.message}
                </p>
              )}
            </div>

            <div className="w-full max-w-[200px]">
              <Label htmlFor="arrivalDateTime">Arrival</Label>
              <Input
                id="arrivalDateTime"
                type="datetime-local"
                className={cn(errors.arrivalDateTime && "border-destructive")}
                {...register('arrivalDateTime', { required: 'Arrival time is required' })}
              />
              {errors.arrivalDateTime && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.arrivalDateTime.message}
                </p>
              )}
            </div>

            <div className="w-full max-w-[200px]">
              <Label htmlFor="exitDateTime">Exit</Label>
              <Input
                id="exitDateTime"
                type="datetime-local"
                className={cn(
                  (errors.exitDateTime || !isDateTimeValid) && "border-destructive"
                )}
                {...register('exitDateTime', { required: 'Exit time is required' })}
              />
              {(errors.exitDateTime || !isDateTimeValid) && (
                <p className="mt-1 text-sm text-destructive">
                  {!isDateTimeValid
                    ? 'Exit time must be after arrival time'
                    : errors.exitDateTime?.message}
                </p>
              )}
            </div>

            {isVehicleSelectionVisible && (
              <Popover open={isVehiclePopoverOpen} onOpenChange={setIsVehiclePopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full max-w-[200px] justify-between"
                  >
                    <div className="flex items-center gap-2">
                      {selectedVehicleType?.name === 'Bike' ? (
                        <Bike className="h-4 w-4" />
                      ) : selectedVehicleType?.name === 'Car' ? (
                        <Car className="h-4 w-4" />
                      ) : null}
                      <span>{selectedVehicleType?.name || 'Select Vehicle'}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-4">
                  <div className="space-y-2">
                    <h4 className="text-center font-medium">Type of Vehicle</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {vehicleTypesList.map((vehicle) => (
                        <Button
                          key={vehicle.id}
                          type="button"
                          variant={selectedVehicleType?.id === vehicle.id ? 'default' : 'outline'}
                          className="flex items-center justify-center gap-2"
                          onClick={() => selectVehicleType(vehicle)}
                        >
                          {vehicle.name === 'Bike' ? (
                            <Bike className="h-5 w-5" />
                          ) : vehicle.name === 'Car' ? (
                            <Car className="h-5 w-5" />
                          ) : null}
                          <span>{vehicle.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}

            <Button type="submit" className="w-full max-w-[200px]">
              SEARCH
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
