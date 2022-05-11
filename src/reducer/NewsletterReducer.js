import { ActionTypes } from "../constant/action-types";

const initialState = {
  newData: [],
};
export const NewsletterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_NEWSLETTERS:
      return { ...state, newsData: payload };
    default:
      return state;
  }
};
