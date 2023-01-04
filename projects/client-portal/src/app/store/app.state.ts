import {searchReducer} from "./search/search.reducer";
import {individualReducer} from "./individual/individual.reducer";
import {combineReducers} from "@ngrx/store";
import {bookingDataReducer} from "./booking/booking.reducer";

export const appReducer = {
  searchData: searchReducer,
  individual: individualReducer,
  bookingData: bookingDataReducer
}
