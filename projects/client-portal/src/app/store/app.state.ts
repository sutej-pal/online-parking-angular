import {searchReducer} from "./search/search.reducer";
import {individualReducer} from "./individual/individual.reducer";
import {combineReducers} from "@ngrx/store";

export const appReducer = {
  searchData: searchReducer,
  individual: individualReducer
}
