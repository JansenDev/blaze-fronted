import { ActionTypes } from "../constants/action-types";

export const setProduct = (productsArray)=>{
    return { 
        type:ActionTypes.SET_PRODUCT,
        payload:productsArray
    }

}