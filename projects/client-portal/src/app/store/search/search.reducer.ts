import {Action, createReducer, on} from '@ngrx/store';
import {updateSearch} from "./search.actions";

export const searchFeatureKey = 'search';

export interface searchData {
  lat: number,
  lng: number,
  vehicle: string
  destination: string,
  arrivalDateTime: Date,
  exitDateTime: Date,
}

export const initialState = {
  searchData: {
    lat: 0,
    lng: 0,
    vehicle: '',
    destination: '',
    arrivalDateTime: Date,
    exitDateTime: Date,
  }
};

export const searchReducer = createReducer(
  initialState,
  on(updateSearch, (state, action: any) => {
    console.log(action);
    return {
      ...state,
      searchData: action.payload
    }
  })
);
