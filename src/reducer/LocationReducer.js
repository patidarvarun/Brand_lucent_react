import { ActionTypes } from "../constant/action-types";

const initialState = {
  locationDetail: [],
};
export const LocationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_LOCATION:
      return { ...state, locationDetail: payload };
    default:
      return state;
  }
};
