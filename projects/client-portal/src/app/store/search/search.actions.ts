import {createAction, props} from '@ngrx/store';

export const loadSearch = createAction(
  '[Search] Load Search'
);

export const updateSearch = createAction(
  '[Search] Update Search',
  props<{ payload: any }>()
);
