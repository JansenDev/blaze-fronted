import { combineReducers} from "redux";
import { orderReducer, selectedOrderReducer, modalManageOrderReducer, handlerFormItemReducer } from "./orderReducer";
import { productReducer } from "./productReducer";

const reducers = combineReducers({
    allOrders: orderReducer,
    orderById: selectedOrderReducer ,
    modalAction: modalManageOrderReducer,
    modalHandler:handlerFormItemReducer,
    allProducts: productReducer
});

export default reducers;