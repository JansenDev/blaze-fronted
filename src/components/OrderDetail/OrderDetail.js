import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSelectOrder } from "../../redux/actions/orderActions";
import  RenderOrder  from "./RenderOrderDetail/RenderOrder";


function OrderDetail () {
  const  { idOrder }  = useParams();
  const dispatch = useDispatch();
  console.log(idOrder);

  // !get
  const getOrderById = async () => {
    const datos = await axios
      .get(`http://localhost:8080/orders/${idOrder}`)
      .catch((err) => {
        console.log(err);
      });
    dispatch(setSelectOrder(datos.data));
  };

  useEffect(() => {
    if (idOrder && idOrder != "")getOrderById();
    return () => {
    }
}, [idOrder])

  return  ( <RenderOrder /> )
}

export default OrderDetail;
