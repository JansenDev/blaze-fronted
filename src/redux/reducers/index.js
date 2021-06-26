import { combineReducers} from "redux";
import { orderReducer, selectedOrderReducer } from "./orderReducer";

const reducers = combineReducers({
    allOrders: orderReducer,
    orderById: selectedOrderReducer 
});

export default reducers;