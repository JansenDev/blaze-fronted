import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
// *redux
import { useDispatch } from "react-redux";
// *Locals
import RenderOrder from "./RenderOrderDetail/RenderOrder";
import { setSelectOrder } from "../../redux/actions/orderActions";
import { setProduct } from "../../redux/actions/productActions";
import { getOrderById } from "../../service/OrderService";
import { getAllProducts } from "../../service/ProductService";

function OrderDetail() {
  const { idOrder } = useParams();
  const dispatch = useDispatch();

  const OrderDetail = async () => {
    const orderDetailResult = await getOrderById(idOrder);
    dispatch(setSelectOrder(orderDetailResult.data));
    const allProductsArray = await getAllProducts();
    dispatch(setProduct(allProductsArray));
  };

  useEffect(() => {
    if (idOrder && idOrder != "") OrderDetail();
    return () => {};
  }, [idOrder]);

  return <RenderOrder />;
}

export default OrderDetail;
