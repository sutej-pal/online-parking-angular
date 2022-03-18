import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import {environment} from '../../environments/environment';
import {UserReducer} from './user/user.reducer';

export interface State {
  user: {}
}

export const reducers: ActionReducerMap<State> = {
  user: UserReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
