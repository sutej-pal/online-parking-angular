import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getIndividual = (state: any) => {
  return state.individual.individual
};
