import { ActionTypes } from "../constants/action-types";

const initialState = {
  orders: [],
};

const modalInit = {
  action:"New",
  idItem: "",
  opened:false,
}

const modalEditInit = {
  name: "",
  quantity: "",
  unit_price: "",
}

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

export const modalManageOrderReducer=(state = modalInit, { type, payload } )=>{
  switch (type) {
    case ActionTypes.MODAL_MANAGE_ORDER:
      return { ...state, ...payload }
  
    default:
      return state
  }
}

export const handlerFormItemReducer=(state = modalEditInit, { type, payload } )=>{
  switch (type) {
    case ActionTypes.HANDLER_FORM_ITEM:
      return { ...state, ...payload }
  
    default:
      return state
  }
}