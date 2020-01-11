import { actionTypes } from "../common/types";

const initialState = {
  allProducts: []
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_VENDORS_PRODUCTS:
      return {
        ...state,
        allProducts: payload.result
      };

    default:
      return state;
  }
};
