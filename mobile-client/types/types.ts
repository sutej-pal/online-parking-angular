// Common types used across the mobile application

export interface User {
  id: string
  email: string
  name?: string
  role?: string
  token?: string
  [key: string]: any
}

export interface ParkingLot {
  id: string
  name: string
  address: string
  latitude?: number
  longitude?: number
  pricePerHour?: number
  images?: string[]
  amenities?: string[]
  [key: string]: any
}

export interface Booking {
  id: string
  parkingLotId: string
  userId: string
  startTime: Date
  endTime: Date
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  [key: string]: any
}

export interface Vehicle {
  id: string
  userId: string
  licensePlate: string
  make?: string
  model?: string
  color?: string
  [key: string]: any
}

