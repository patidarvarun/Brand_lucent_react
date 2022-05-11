import { ActionTypes } from "../constant/action-types";

const initialState = {
  cartdata: [],
};
export const CartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_CART:
      return { ...state, cartdata: payload };
    default:
      return state;
  }
};
