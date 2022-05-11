import { ActionTypes } from "../constant/action-types";

const initialState = {
  sellingData: [],
};
export const SellingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_SELLINGPRODUCTS:
      return { ...state, sellingData: payload };
    default:
      return state;
  }
};
