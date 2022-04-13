import {ActionReducer, INIT, MetaReducer, UPDATE} from "@ngrx/store";
import { appReducer } from "./app.state";

export const hydrationMetaReducer = (
  reducer: ActionReducer<typeof appReducer>
): ActionReducer<typeof appReducer> => {
  return (state, action) => {
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localStorage.getItem("state");
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem("state");
        }
      }
    }
    const nextState = reducer(state, action);
    localStorage.setItem("state", JSON.stringify(nextState));
    return nextState;
  };
};

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
