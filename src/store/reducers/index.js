import { actionTypes } from "../common";
import { combineReducers } from "redux";
// reducers
import { productReducer } from "./productReducer";

const appReducer = combineReducers({
  product: productReducer,
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;