import {Action, createReducer, on} from '@ngrx/store';
import {updateIndividual} from "./individual.actions";


export const individualFeatureKey = 'individual';

export interface Individual {
  id: string,
  firstName: string,
  lastName: string,
  email: any;
  phone: any;
  city: any;
}

export const initialState = {
  individual: {}
};

export const individualReducer = createReducer(
  initialState,
  on(updateIndividual, (state, action: any) => {
    console.log(action);
    return {
      ...state,
      individual: action.payload
    }
  })
);
