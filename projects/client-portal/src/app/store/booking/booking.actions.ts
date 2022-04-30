import {createAction, props} from '@ngrx/store';

export const loadBookings = createAction(
  '[Booking] Load Booking'
);

export const updateBookingData = createAction(
  '[Booking] Update Booking',
  props<{ payload: any }>()
);




