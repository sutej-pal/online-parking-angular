import {Action, createAction, props} from '@ngrx/store';

export const loadParkingLots = createAction(
  '[ParkingLot] Load ParkingLots',
  props<{ usernamae: string; password: string }>()
);

export const loadParkingLotsSuccess = createAction(
  '[ParkingLot] Load ParkingLots Success',
  props<{ data: any }>()
);

export const loadParkingLotsFailure = createAction(
  '[ParkingLot] Load ParkingLots Failure',
  props<{ message: string }>()
);
