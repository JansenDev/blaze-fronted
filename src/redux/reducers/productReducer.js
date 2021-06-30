import { ActionTypes } from "../constants/action-types"; 

const init ={
    products:[]
};

export const productReducer = (state=init, { type,payload })=>{

    switch (ActionTypes.SET_PRODUCT) {
        case type:
            return { ...state, products:payload };
    
        default:
            return state;
    }
}