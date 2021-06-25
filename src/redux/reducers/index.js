import { combineReducers} from "redux";
import { orderReducer } from "./orderReducer";

const reducers = combineReducers({
    allOrders: orderReducer,
});

export default reducers;