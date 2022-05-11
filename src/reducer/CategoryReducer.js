import { ActionTypes } from "../constant/action-types";

const initialState = {
  catdata: [],
};
export const CategoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_CATEGORYS:
      return { ...state, catdata: payload };
    default:
      return state;
  }
};
