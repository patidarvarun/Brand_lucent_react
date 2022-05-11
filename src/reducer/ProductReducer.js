import { ActionTypes } from "../constant/action-types";

const initialState = {
  ProdData: [],
};
export const ProductReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_PRODUCTBYID:
      return { ...state, ProdData: payload };
    default:
      return state;
  }
};
