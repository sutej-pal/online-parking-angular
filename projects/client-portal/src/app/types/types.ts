interface ParkingSpot {
  price: number
}

export interface ParkingLot {
  name: string;
  parkingSpot?: ParkingSpot;
  location: {
    coordinates: [number, number],
  },
  amenities: {
    cctv: boolean,
    secured: boolean,
    twentyFourHourService: boolean,
    wheelChairEntrance: boolean
  };
  minBookingDuration: number;
}
