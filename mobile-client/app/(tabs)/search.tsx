import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import { useSearchStore } from '@/store/searchStore'
import { httpService } from '@/services/http.service'
import { NotificationService } from '@/services/notification.service'
import { SearchBar } from '@/components/SearchBar'
import { ParkingLot } from '@/types/types'

export default function SearchScreen() {
  const [parkingLotList, setParkingLotList] = useState<ParkingLot[]>([])
  const searchData = useSearchStore((state) => state.searchData)

  useEffect(() => {
    if (searchData) {
      getParkingLots(searchData)
    }
  }, [searchData])

  const getParkingLots = async (data: any) => {
    try {
      const response = await httpService.post('search', data)
      const lots = response.data.data || response.data
      setParkingLotList(lots)
    } catch (error) {
      NotificationService.showError('Failed to load Parking Lots.')
    }
  }

  return (
    <View style={styles.container}>
      <SearchBar />
      <View style={styles.content}>
        <Text style={styles.title}>Available Parking Lots</Text>
        {parkingLotList.length === 0 ? (
          <Text style={styles.emptyText}>
            No parking lots found. Try adjusting your search criteria.
          </Text>
        ) : (
          <FlatList
            data={parkingLotList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardAddress}>{item.address}</Text>
                {item.pricePerHour && (
                  <Text style={styles.cardPrice}>${item.pricePerHour}/hour</Text>
                )}
              </View>
            )}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 32,
  },
  card: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardAddress: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3b82f6',
  },
})

