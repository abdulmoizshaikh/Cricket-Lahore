import { actionTypes } from "../common";
import { combineReducers } from "redux";
// reducers
import { tournamentReducer } from "./tournamentReducer";

const appReducer = combineReducers({
  tournament: tournamentReducer
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
