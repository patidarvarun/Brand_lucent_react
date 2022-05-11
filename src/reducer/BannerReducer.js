import { ActionTypes } from "../constant/action-types";

const initialState = {
  banData: [],
};
export const BannerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_BANNERS:
      return { ...state, banData: payload };
    default:
      return state;
  }
};
