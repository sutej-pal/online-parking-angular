'use client'

import { ParkingLot } from '@/shared/types/types'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ParkingLotCardProps {
  parkingLot: ParkingLot
  onClick: () => void
}

export default function ParkingLotCard({ parkingLot, onClick }: ParkingLotCardProps) {
  return (
    <Card onClick={onClick} className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-2">{parkingLot.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {parkingLot.address}
        </p>
        {parkingLot.pricePerHour && (
          <p className="text-base font-medium mb-4">
            ${parkingLot.pricePerHour}/hour
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  )
}
