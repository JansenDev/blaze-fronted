import { ActionTypes } from "../constants/action-types";

const initialState = {
  orders: [],
};

export const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_ORDER:
      return { ...state, orders: payload };

    default:
      return state;
  }
};

export const selectedOrderReducer = (state = {}, { type, payload })=>{

  switch (type) {
    case ActionTypes.SELECTED_ORDER:
      return { ...state, ...payload }
  
    default:
      return state
  }
} ;
