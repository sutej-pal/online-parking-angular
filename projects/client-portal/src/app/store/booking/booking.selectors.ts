import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getBookingData = (state: any) => {
  return state.bookingData.bookingData
}
