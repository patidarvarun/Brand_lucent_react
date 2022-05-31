import { ActionTypes } from "../constant/action-types";

const initialState = {
  OrderData: [],
};
export const OrderDataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_ORDERDATA:
      return { ...state, OrderData: payload };
    default:
      return state;
  }
};
