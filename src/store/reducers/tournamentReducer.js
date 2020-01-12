import { actionTypes } from "../common/types";

const initialState = {
  tournaments: []
};

export const tournamentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_TOURNAMENTS:
      // console.log("GET_TOURNAMENTS payload", payload);
      return {
        ...state,
        tournaments: payload.result.data
      };

    default:
      return state;
  }
};
