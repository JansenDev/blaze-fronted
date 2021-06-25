import { ActionTypes } from "../constants/action-types";

const initialState = {
  orders: [],
  selectOrder: [],
};

export const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_ORDER:
      return { ...state, orders: payload };

    case ActionTypes.SELECTED_ORDER:
      return { ...state, selectOrder: payload };

    default:
      return state;
  }
};
