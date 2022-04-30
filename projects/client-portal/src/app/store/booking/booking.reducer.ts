import {Action, createReducer, on} from '@ngrx/store';
import {updateBookingData} from "./booking.actions";


export const bookingFeatureKey = 'booking';

export interface BookingData {
  parkingLot: any
}

export const initialState = {
  bookingData: {
    parkingLot: {}
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
