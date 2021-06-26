import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/utils";

import RenderModalInsertItem from "./RenderModalInsertItem";

function RenderOrder() {
  const orderById2 = useSelector((state) => state.orderById);
  console.log(orderById2);
  const {
    order_number="",
    date="",
    customer="",
    status="",
    listOrdersItems = [],
    taxes_amounts={},
    taxes_total=0,
    total_amount=0,
  } = orderById2;

  const { city_tax, country_tax, state_tax,federal_tax } = taxes_amounts

  const dateFormated = formatDate(date.substr(0,10));

  const arrrayItems = listOrdersItems

  let totalPriceOrderItems = 0;
  const renderOrderItemsList = arrrayItems.map((order, index) => {
    const { name, quantity, unit_price } = order;
    const priceOrderItem = quantity * unit_price;
    totalPriceOrderItems = totalPriceOrderItems + priceOrderItem;
    return (
      // <></>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{name}</td>
        <td>{quantity}</td>
        <td>$ {unit_price}</td>
        <td>$ {priceOrderItem.toFixed(2)}</td>
        <td className="justify-content-evenly d-flex">
          <a href="#" role="button">
            Edit
          </a>
          <a href="#" role="button">
            Delete
          </a>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div>
        <div className="float-left">
          <h2>Order N° {order_number}</h2>
        </div>
        <div className="float-end">
          <Link className="btn btn-secondary" to="/orders">
            Back
          </Link>
        </div>
      </div>

      <table className="table table-borderless">
        <tbody className="h5">
          <tr>
            <td>Customer</td>
            <td>{customer}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{status}</td>
          </tr>
          <tr>
            <td>Date</td>
            <td>{dateFormated}</td>
          </tr>
        </tbody>
      </table>

      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>N°</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderOrderItemsList}</tbody>
      </table>
      <a
        name=""
        id=""
        className="btn btn-primary float-lg-end"
        href="#"
        role="button"
      >
        Add Item+
      </a>

      <table className="table table-borderless table-sm">
        <tbody>
          <tr>
            <td>
              <h5>Subtotal</h5>
            </td>
            <td>
              <h5>$ {totalPriceOrderItems.toFixed(2)}</h5>
            </td>
          </tr>
          <tr>
            <td scope="row">
              <h5>Taxes</h5>
            </td>
            <td></td>
          </tr>
          <tr>
            <td scope="row">
              <h6>&nbsp;&nbsp;Total city_tax</h6>
            </td>
            <td>$ {(city_tax * totalPriceOrderItems).toFixed(2)}</td>
          </tr>
          <tr>
            <td scope="row">
              <h6>&nbsp;&nbsp;Total country_tax</h6>
            </td>
            <td>$ {(country_tax * totalPriceOrderItems).toFixed(2)}</td>
          </tr>
          <tr>
            <td scope="row">
              <h6>&nbsp;&nbsp;Total federal_tax</h6>
            </td>
            <td>$ {(federal_tax * totalPriceOrderItems).toFixed(2)}</td>
          </tr>
          <tr>
            <td scope="row">
              <h6>&nbsp;&nbsp;Total state_tax</h6>
            </td>
            <td>$ {(state_tax * totalPriceOrderItems).toFixed(2)}</td>
          </tr>
          <tr>
            <td scope="row">
              <h5>Total Taxes</h5>
            </td>
            <td>
              <h5>$ {taxes_total.toFixed(2)}</h5>
            </td>
          </tr>
          <tr>
            <td scope="row">
              <h5>Total</h5>
            </td>
            <td>
              <h5>$ {total_amount.toFixed(2)}</h5>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mb-5">
        <a className="btn btn-success" href="#" role="button">
          Complete Order
        </a>
        <a className="btn btn-danger" href="#" role="button">
          Reject Order
        </a>
      </div>

      <div>
        < RenderModalInsertItem />
      </div>
    </div>
    
  );
}

export default RenderOrder;
