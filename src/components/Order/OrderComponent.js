import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function formatDate(date){
    return date.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
  }

const OrderComponent = () => {
  const storeAllOrders = useSelector((state) => state.allOrders.orders);
  console.log(storeAllOrders);
  
  const renderOrderList = storeAllOrders.map((Order, index) => {
    const { order_number, status, date, customer, total_amount } = Order;

    const dateFormated = formatDate(date.substr(0,10));

    return (
      <tr key={ order_number } className="text-center">
        <td scope="row">{ index+1 }</td>
        <td>{ customer }</td>
        <td>{ status }</td>
        <td>{ dateFormated }</td>
        <td> $ { total_amount.toFixed(2) }</td>
        <td className="justify-content-center d-flex">
          <Link to={`/orders/${order_number}`} >
            Edit
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div className="h2">Orders</div>
      <div>
          <Link className="btn btn-primary float-end my-5" to="/createOrder" role="button">Create Order</Link>
      </div>
      <table className="table table-bordered ">
        <thead>
          <tr className="text-center" >
            <th>N°</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Date</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <>{renderOrderList}</>
        </tbody>
      </table>
    </div>
  );
};

export default OrderComponent;
