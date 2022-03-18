import { createAction, props } from '@ngrx/store';

export const updateUser = createAction('updateUser', props<any>());
export const deleteUser = createAction('deleteUser');




