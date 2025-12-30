import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useRouter, usePathname } from 'expo-router'
import { useForm, Controller } from 'react-hook-form'
import moment from 'moment'
import * as Location from 'expo-location'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { useSearchStore } from '@/store/searchStore'
import { httpService } from '@/services/http.service'
import { NotificationService } from '@/services/notification.service'
import { Ionicons } from '@expo/vector-icons'

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

export function SearchBar() {
  const router = useRouter()
  const pathname = usePathname()
  const [vehicleTypesList, setVehicleTypesList] = useState<VehicleType[]>([])
  const [selectedVehicleType, setSelectedVehicleType] = useState<VehicleType | null>(null)
  const { setSearchData } = useSearchStore()

  const isVehicleSelectionVisible = pathname === '/search'

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<SearchForm>({
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

  const loadForm = () => {
    const t = moment('10:00', 'hh:mm a')
    const minutes = t.hour() * 60 + t.minute()
    const date = moment().add(1, 'days').startOf('day')
    const arrivalDateTime = moment(date).add(minutes, 'minutes').format()
    const exitDateTime = moment(date).add(2, 'hours').add(minutes, 'minutes').format()

    setValue('arrivalDateTime', arrivalDateTime)
    setValue('exitDateTime', exitDateTime)
  }

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        NotificationService.showError('Permission to access location was denied')
        return
      }

      const location = await Location.getCurrentPositionAsync({})
      setValue('lat', location.coords.latitude)
      setValue('lng', location.coords.longitude)

      // Reverse geocode to get address
      const addresses = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })

      if (addresses.length > 0) {
        const address = addresses[0]
        const formattedAddress = `${address.street || ''} ${address.city || ''} ${address.region || ''}`.trim()
        setValue('destination', formattedAddress)
      }
    } catch (error) {
      NotificationService.showError('Error getting location')
    }
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
    router.push('/search')
  }

  const arrivalDateTime = watch('arrivalDateTime')
  const exitDateTime = watch('exitDateTime')
  const isDateTimeValid = moment(exitDateTime).isAfter(moment(arrivalDateTime))

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.form}>
          <Controller
            control={control}
            name="destination"
            rules={{ required: 'Destination is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputWrapper}>
                <Input
                  placeholder="Parking Destination"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.destination?.message}
                  style={styles.destinationInput}
                />
                <TouchableOpacity
                  onPress={getCurrentLocation}
                  style={styles.locationButton}
                >
                  <Ionicons name="location" size={20} color="#3b82f6" />
                </TouchableOpacity>
              </View>
            )}
          />

          <Controller
            control={control}
            name="arrivalDateTime"
            rules={{ required: 'Arrival time is required' }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Arrival"
                value={moment(value).format('YYYY-MM-DDTHH:mm')}
                onChangeText={onChange}
                error={errors.arrivalDateTime?.message}
                style={styles.dateInput}
              />
            )}
          />

          <Controller
            control={control}
            name="exitDateTime"
            rules={{ required: 'Exit time is required' }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Exit"
                value={moment(value).format('YYYY-MM-DDTHH:mm')}
                onChangeText={onChange}
                error={errors.exitDateTime?.message || (!isDateTimeValid ? 'Exit time must be after arrival time' : undefined)}
                style={styles.dateInput}
              />
            )}
          />

          {isVehicleSelectionVisible && selectedVehicleType && (
            <Text style={styles.vehicleText}>
              Vehicle: {selectedVehicleType.name}
            </Text>
          )}

          <Button
            title="SEARCH"
            onPress={handleSubmit(onSubmit)}
            variant="primary"
            style={styles.searchButton}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 16,
  },
  form: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    alignItems: 'flex-end',
  },
  inputWrapper: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  destinationInput: {
    width: 200,
  },
  locationButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3b82f6',
    borderRadius: 8,
  },
  dateInput: {
    width: 150,
  },
  vehicleText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  searchButton: {
    minWidth: 100,
  },
})

