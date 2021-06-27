import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
// *redux
import { useDispatch } from "react-redux";
// *Locals
import { setSelectOrder } from "../../redux/actions/orderActions";
import  RenderOrder  from "./RenderOrderDetail/RenderOrder";
import { getOrderById } from "../../service/OrderService"



function OrderDetail () {
  const  { idOrder }  = useParams();
  const dispatch = useDispatch();
  
  const OrderDetail = async () => {
    const orderDetailResult = await getOrderById(idOrder);
    dispatch(setSelectOrder(orderDetailResult.data));
  };

  useEffect(() => {
    if (idOrder && idOrder != "")OrderDetail();
    return () => {
    }
}, [idOrder])

  return  ( <RenderOrder /> )
}

export default OrderDetail;
