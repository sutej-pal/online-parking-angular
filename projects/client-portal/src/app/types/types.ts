export interface ParkingLot {
  name: string;
  parkingSpot?: {
    price: number
  };
  geometry: {
    lat: number,
    lng: number,
  },
  amenities: {
    cctv: boolean,
    secured: boolean,
    twentyFourHourService: boolean,
    wheelChairEntrance: boolean
  };
  minBookingDuration: number;
}
