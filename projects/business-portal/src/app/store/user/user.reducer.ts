import { Action, createReducer, on } from '@ngrx/store';
import {deleteUser, updateUser} from "./user.actions";


export const userFeatureKey = 'user';

export interface State {

}

export const initialState: State = {

};

export const UserReducer = createReducer(
  initialState, on(updateUser, (state, payload) => {
    return {
      ...state,
      user: payload
    }
  }), on(deleteUser, state => {
    return {
      ...state,
      user: {}
    }
  })
);
