import React, {useEffect} from 'react';
// !redux
import { useDispatch} from "react-redux";
// !locals
import { setOrder } from "../../redux/actions/orderActions";
import OrderComponent from "./OrderComponent";  
import { getAllOrders } from "../../service/OrderService";

function Order() {
    const dispatch = useDispatch();

    const fetchAllOrders = async () => {
        const response = await getAllOrders();
        dispatch(setOrder(response.data))
    };

    useEffect(() => {
        fetchAllOrders();
        return () => {
        }
    }, [])
    return (
        <OrderComponent />
    )
}

export default Order;
