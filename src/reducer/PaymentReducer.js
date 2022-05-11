import { ActionTypes } from "../constant/action-types";

const initialState = {
  paymentdata: [],
};
export const PaymentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_PAYMENT:
      return { ...state, paymentdata: payload };
    default:
      return state;
  }
};
