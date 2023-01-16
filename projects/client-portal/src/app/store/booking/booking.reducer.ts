import {Action, createReducer, on} from '@ngrx/store';
import {updateBookingData} from "./booking.actions";
import {ParkingLot} from "../../types/types";


export const bookingFeatureKey = 'booking';

export interface BookingData {
  parkingLot: ParkingLot | any
  basePrice: number
  serviceFee: number
  totalPrice: number
}

export const initialState = {
  bookingData: {
    parkingLot: {},
    serviceFee: 10
  }
};

export const bookingDataReducer = createReducer(
  initialState,
  on(updateBookingData, (state, action) => {
    return {
      ...state,
      bookingData: action.payload
    }
  })
);
