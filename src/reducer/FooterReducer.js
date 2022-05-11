import { ActionTypes } from "../constant/action-types";

const initialState = {
  FootData: [],
};
export const FooterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_FOOTERS:
      return { ...state, FootData: payload };
    default:
      return state;
  }
};
