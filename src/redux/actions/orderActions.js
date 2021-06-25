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