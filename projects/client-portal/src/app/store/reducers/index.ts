import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {environment} from '../../../environments/environment';

export const searchFeatureKey = 'search';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  updateSearch() {

  }
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
