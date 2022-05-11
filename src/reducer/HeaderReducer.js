import { ActionTypes } from "../constant/action-types";

const initialState = {
  headData: [],
};
export const HeaderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_HEADERS:
      return { ...state, headData: payload };
    default:
      return state;
  }
};
