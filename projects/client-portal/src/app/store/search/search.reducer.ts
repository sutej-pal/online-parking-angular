import {Action, createReducer, on} from '@ngrx/store';
import {updateSearch} from "./search.actions";

export const searchFeatureKey = 'search';

export interface searchData {
  searchData: {
    lat: number,
    lng: number,
    destination: string
  }
}

export const initialState: searchData = {
  searchData: {
    lat: 0,
    lng: 0,
    destination: ''
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
