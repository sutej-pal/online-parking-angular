import {createFeatureSelector, createSelector} from '@ngrx/store';
import {searchData} from "./search.reducer";

export const getSearchData = (state: any) => {
  return state.searchData.searchData
};
