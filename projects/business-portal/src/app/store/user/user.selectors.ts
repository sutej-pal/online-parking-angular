import {createFeatureSelector, createSelector} from '@ngrx/store';

// const getUsersSate = createFeatureSelector()

//const getIndividualsState = createFeatureSelector<IndividualsState>(
//   INDIVIDUALS_FEATURE_KEY
// );

// export interface FeatureState {
//   counter: number;
// }
//
// export interface AppState {
//   feature: FeatureState;
// }
//
// export const selectFeature = (state: AppState) => state.feature;
//
// export const selectFeatureCount = createSelector(
//   selectFeature,
//   (state: FeatureState) => state.counter
// );

export const user = (state: any) => state.user;

export const getUser = createSelector(user, state => state.user)

