import React, {useEffect} from 'react';
import { useDispatch} from "react-redux";
import axios from "axios";
import { setOrder } from "../../redux/actions/orderActions";

import OrderComponent from "./OrderComponent";  

function Order() {
    const dispatch = useDispatch();
    //!segment functionality
    const fetchAllOrders = async () => {
        const response = await axios.get("http://localhost:8080/orders/")
        .catch((err)=>{
            console.log("Err:",err)
        });

        dispatch(setOrder(response.data));
      
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
