import { createAction, props } from '@ngrx/store';

export const loadIndividual = createAction(
  '[Individual] Load Individual'
);

export const updateIndividual = createAction(
  '[Individual] Update Individual',
  props<{ payload: any }>()
);




