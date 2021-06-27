import { combineReducers} from "redux";
import { orderReducer, selectedOrderReducer, modalManageOrder, handlerFormItem } from "./orderReducer";

const reducers = combineReducers({
    allOrders: orderReducer,
    orderById: selectedOrderReducer ,
    modalAction: modalManageOrder,
    modalHandler:handlerFormItem,
});

export default reducers;