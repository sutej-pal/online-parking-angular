import { Action, createReducer, on } from '@ngrx/store';
import {loadParkingLots, loadParkingLotsFailure, loadParkingLotsSuccess} from "./parking-lot.actions";


export const parkingLotFeatureKey = 'parkingLot';

export interface ParkingLot {
  id: string;
  name: string;
  gallery: string[];
}

export interface State {

}

export const initialState: State = {

};

export const ParkingLotReducer = createReducer(
  initialState,
  on(loadParkingLots, (state) => ({
    ...state,
    list: [{t: 10}],
  })),
  on(loadParkingLotsSuccess, (state) => ({
    ...state,
    list: [{t: 1}],
  })),
  on(loadParkingLotsFailure, (state, { message }) => ({
    ...state,
    message: 'message',
  }))
);
