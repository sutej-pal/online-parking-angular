export interface ParkingLot {
  name: string;
  amenities: {
    cctv: boolean,
    secured: boolean,
    twentyFourHourService: boolean,
    wheelChairEntrance: boolean
  };
  minBookingDuration: number;
}
