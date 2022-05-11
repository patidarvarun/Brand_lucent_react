import { ActionTypes } from "../constant/action-types";

const initialState = {
  ProductDetails: [],
};
export const ProductDetailReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.GET_PRODUCTDETAILS:
      return { ...state, ProductDetails: payload };
    default:
      return state;
  }
};
