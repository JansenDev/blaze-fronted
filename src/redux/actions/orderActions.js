import { ActionTypes } from "../constants/action-types"

export const setOrder = (order) =>{
    return{
        type:ActionTypes.SET_ORDER,
        payload:order,
    };
};

export const setSelectOrder = (orderItem) =>{
    return{
        type:ActionTypes.SELECTED_ORDER,
        payload:orderItem,
    };
};

export const setModalOrder = (orderItem) =>{
    return{
        type:ActionTypes.MODAL_MANAGE_ORDER,
        payload:orderItem,
    };
};

export const setHandlerFormItem = (itemFields) =>{
    return{
        type:ActionTypes.HANDLER_FORM_ITEM,
        payload:itemFields,
    };
};